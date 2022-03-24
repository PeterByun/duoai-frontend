import React, { useState } from 'react'

type RadioProps = {
  id: string
  items: RadioItemWithInputProps[]
  onChange: (selectedItem: RadioItem) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>

export type RadioItem = {
  name: string
  value: string
}

type RadioItemWithInputProps = RadioItem & {
  restProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const Radio = ({ id, items, onChange, ...restProps }: RadioProps) => {
  const [selectedItem, setSelectedItem] = useState<RadioItem>(items[0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = { name: e.target.name, value: e.target.value }
    onChange(item)
    setSelectedItem(item)
  }

  return (
    <div {...restProps}>
      {items.map((item) => (
        <span key={item.name}>
          <input
            onChange={handleChange}
            id={item.name}
            name={item.name}
            type="radio"
            value={item.value}
            checked={item.name === selectedItem.name}
            {...item.restProps}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </span>
      ))}
    </div>
  )
}

export default Radio
