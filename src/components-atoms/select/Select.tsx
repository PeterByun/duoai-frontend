import React, { useState } from 'react'

export type SelectItem = {
  name: string
  value: string
}

export type SelectProps = {
  items: SelectItem[]
  onItemChange: (selectedValue: SelectItem) => void
  onItemsChange: (selectedValue: SelectItem[]) => void
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({
  id,
  items,
  onItemChange,
  onItemsChange,
  multiple,
  ...restProps
}: SelectProps) => {
  const [selectedItemValue, setSelectedItemValue] = useState<string>(
    items[0].value
  )
  const [selectedItemValues, setSelectedItemValues] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedItems = Array.from(e.target.selectedOptions).map(
        (option) => {
          return { name: option.text, value: option.value }
        }
      )

      onItemsChange(selectedItems)
      setSelectedItemValues(selectedItems.map((item) => item.value))
    } else {
      const selectedItem = {
        name: e.target.options[e.target.selectedIndex].text,
        value: e.target.value,
      }

      onItemChange(selectedItem)
      setSelectedItemValue(e.target.value)
    }
  }

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateAreas: 'select',
        alignItems: 'center',
      }}
    >
      <select
        name={id}
        id={id}
        onChange={handleChange}
        value={multiple ? selectedItemValues : selectedItemValue}
        multiple={multiple}
        {...restProps}
        css={{
          appearance: 'none',
          outline: 'none',
          gridArea: 'select',
          backgroundColor: 'transparent',
          width: '8rem',
          border: '1px solid black',
          borderRadius: '3px',
          padding: '0 1rem',
          margin: '0',
          textAlign: 'center',
          ':disabled': {
            cursor: 'not-allowed',
            backgroundColor: '#eee',
            backgroundImage: 'linear-gradient(to top, #ddd, #eee 33%)',
          },
          '::-ms-expand': {
            display: 'none',
          },
          '::after': {
            gridArea: 'select',
            justifySelf: 'end',
            content: `""`,
            width: '0.8em',
            height: '0.5em',
            backgroundColor: 'black',
            clipPath: 'polygon(100% 0%, 0 0%, 50% 100%)',
          },
        }}
      >
        {items.map((item) => (
          <option key={item.name} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
