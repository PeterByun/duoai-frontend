import {
  TableStyle,
  TableStyleProps,
} from '@/components-atoms/table/StyledTable.style'

import sortAscIcon from '../../assets/images/base/sort-asc.png'
import sortDescIcon from '../../assets/images/base/sort-desc.png'

type SortingOrder = 'ASC' | 'DESC'

const SORTING_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

const DEFAULT_SORTING_ORDER = SORTING_ORDER.ASC

export type TableHeadItem<K> = {
  name: string
  key: K
  sortingEnabled?: boolean
  initialSortingOrder?: SortingOrder
  orderedBy?: SortingOrder
}

export type GetRowClass<R> = (item: R, idx: number) => string

type TableProps<R> = {
  headItems: TableHeadItem<keyof R>[]
  rows: R[]
  setHeadItems: (headItems: TableHeadItem<keyof R>[]) => void
  setRows: (rows: TableProps<R>['rows']) => void
  rowKeyPropName?: string
  rowClass?: GetRowClass<R>
}

type TableRow = {
  [key: string]: string | number | React.ReactNode
}

export default function Table<R extends TableRow>({
  headItems,
  rows,
  setRows,
  setHeadItems,
  rowKeyPropName,
  rowClass,
}: TableProps<R> & TableStyleProps) {
  const sortRows = (sortBy: keyof R, sortingOrder: SortingOrder) => {
    if (sortingOrder === SORTING_ORDER.DESC) {
      setRows(
        [...rows].sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return 1
          } else if (a[sortBy] < b[sortBy]) {
            return -1
          } else {
            return 0
          }
        })
      )
    } else {
      setRows(
        [...rows].sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return -1
          } else if (a[sortBy] < b[sortBy]) {
            return 1
          } else {
            return 0
          }
        })
      )
    }
  }

  const setOrderedByOfHeadItem = (
    headItems: TableHeadItem<keyof R>[],
    key: keyof R,
    sortingOrderToSet: SortingOrder
  ) => {
    setHeadItems(
      headItems.map((headItem) => {
        if (headItem.key === key) {
          headItem.orderedBy = sortingOrderToSet
        }
        return headItem
      })
    )
  }

  const handleHeadCellClick = ({
    sortingEnabled,
    initialSortingOrder,
    key,
    orderedBy,
  }: TableHeadItem<keyof R>) => {
    if (!sortingEnabled) return

    if (orderedBy) {
      const sortingOrder =
        orderedBy === SORTING_ORDER.ASC ? SORTING_ORDER.DESC : SORTING_ORDER.ASC
      console.log(sortingOrder)
      sortRows(key, sortingOrder)
      setOrderedByOfHeadItem(headItems, key, sortingOrder)
    } else {
      sortRows(key, initialSortingOrder ?? DEFAULT_SORTING_ORDER)
      setOrderedByOfHeadItem(
        headItems,
        key,
        initialSortingOrder ?? DEFAULT_SORTING_ORDER
      )
    }
  }

  const SORTING_ORDER_ICON_URL = {
    ASC: sortAscIcon,
    DESC: sortDescIcon,
  } as const

  const getOppositeSortingOrder = (sortingOrder: SortingOrder) => {
    if (!sortingOrder) throw new Error('Invalid sorting order.')
    return sortingOrder === SORTING_ORDER.ASC
      ? SORTING_ORDER.DESC
      : SORTING_ORDER.ASC
  }

  const getSortingOrderIcon = (
    orderedBy?: SortingOrder,
    initialSortingOrder?: SortingOrder
  ) => {
    const oppositeSortingOrder = orderedBy
      ? getOppositeSortingOrder(orderedBy)
      : initialSortingOrder ?? DEFAULT_SORTING_ORDER

    return (
      <img
        width={'10px'}
        css={{
          width: '1rem',
        }}
        src={SORTING_ORDER_ICON_URL[oppositeSortingOrder]}
        alt={`sort-${oppositeSortingOrder}`}
      />
    )
  }

  return (
    <TableStyle>
      <thead>
        <tr>
          {headItems.map((headItem: TableHeadItem<keyof R>) => (
            <th
              onClick={() => {
                handleHeadCellClick(headItem)
              }}
              key={String(headItem.key)}
              css={{
                cursor: headItem.sortingEnabled ? 'pointer' : 'default',
              }}
            >
              {headItem.name}

              {headItem.sortingEnabled &&
                getSortingOrderIcon(
                  headItem.orderedBy,
                  headItem.initialSortingOrder
                )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row, idx) => (
            <tr
              key={rowKeyPropName ? String(row[rowKeyPropName]) : idx}
              className={rowClass ? rowClass(row, idx) : ''}
            >
              {Object.entries(row).map(([cellKey, cellValue]) => (
                <td key={cellKey}>{cellValue}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </TableStyle>
  )
}
