import React from 'react'

import { TableStyle, TableStyleProps } from '../components-styled/StyledTable.style'

type TableHeadItem = {
    name: string, key:string
}

type TableProps<TableItem> = {
    headItems: Array<TableHeadItem>,
    items: Array<TableItem>|null,
    rowClass?: (item: TableItem, idx: number) => string 
}

export default function Table<TableItem> ({headItems, items, rowClass}: TableProps<TableItem> & TableStyleProps) {
    return (
        <TableStyle>
            <thead>
                    <tr>
                        {headItems.map((headItem:TableHeadItem) => (<th key={headItem.key}>{headItem.name}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item, idx) => (
                        <tr 
                            key={idx}
                            className={rowClass ? rowClass(item, idx) : ''}
                        >
                            {Object.values(item).map((el, elIdx) => (
                                <td key={elIdx}>{el}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
        </TableStyle>        
    )
}