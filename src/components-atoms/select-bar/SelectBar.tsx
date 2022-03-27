import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Container from '../container/Container'

export const SelectBarCss = css`
    background-color: transparent;

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 5px;

    overflow-x: auto;
`

type StyledOptionProps = {
    active: boolean
}

export const Option = styled.button<StyledOptionProps>`
    background: transparent;
    color: var(--black);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-width: 80px;
    height: 40px;

    margin: 0 10px;
    padding: 3px 5px;

    font-size: 1.2rem;

    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    border: 1px solid transparent;
    border-bottom: ${({ active }) =>
        active ? '1px solid var(--black)' : 'none'};

    white-space: nowrap;
    user-select: none;
    transition: all 0.1s ease;

    outline: none;
    -webkit-appearance: none;

    :hover {
        cursor: pointer;
        opacity: 0.7;
    }
`

export type SelectBarItem = {
    name: string
    value: string
}

type SelectBarProps = {
    items: SelectBarItem[]
    onClick: (item: SelectBarItem) => void
}

const SelectBar = ({ items, onClick }: SelectBarProps) => {
    const [selectedItem, setSelectedItem] = useState<SelectBarItem>(items[0])
    const handleItemClick = (item: SelectBarItem) => {
        onClick(item)
        setSelectedItem(item)
    }

    return (
        <Container>
            <div css={SelectBarCss}>
                {Object.values(items).map((item) => (
                    <Option
                        value={item.value}
                        key={item.name}
                        active={selectedItem.value === item.value}
                        onClick={(e: React.MouseEvent) => {
                            return handleItemClick(item)
                        }}
                    >
                        {item.name}
                    </Option>
                ))}
            </div>
        </Container>
    )
}

export default SelectBar
