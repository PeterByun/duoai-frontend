import React, { useState } from 'react'

export type SelectItem = {
  name: string
  value: string
}

export type SelectProps = {
  items: SelectItem[]
  onItmeChange: (selectedValue: SelectItem) => void
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({ id, items, onItmeChange }: SelectProps) => {
  const [selectedItemValue, setSelectedItemValue] = useState<string>(
    items[0].value
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onItmeChange({
      name: e.target.options[e.target.selectedIndex].text,
      value: e.target.value,
    })
    setSelectedItemValue(e.target.value)
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
        value={selectedItemValue}
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
