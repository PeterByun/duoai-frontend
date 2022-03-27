import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import Select, { SelectItem } from '../components-atoms/select/Select'

export default {
  title: 'Atoms/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const items = [
  {
    name: 'Iphone',
    value: '1,200$',
  },
  {
    name: 'MacBook',
    value: '2,000$',
  },
  {
    name: 'AirPods',
    value: '200$',
  },
  {
    name: 'AppleWatch',
    value: '500$',
  },
  {
    name: 'MacMini',
    value: '1,800$',
  },
  {
    name: 'MacStudio',
    value: '4,000$',
  },
]

const Template: ComponentStory<typeof Select> = (args) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem>(items[0])
  const [selectedItems, setSelectedItems] = useState<SelectItem[]>([])

  const handleItemChange = (item: SelectItem) => {
    setSelectedItem(item)
    console.log(item)
  }

  const handleItemsChange = (items: SelectItem[]) => {
    setSelectedItems(items)
  }

  return (
    <>
      <h1>Select the item you want to purchse.</h1>
      <Select
        {...args}
        id="1"
        items={items}
        onItemChange={handleItemChange}
        onItemsChange={handleItemsChange}
      ></Select>

      {selectedItems.map((item) => {
        return (
          <div key={item.name}>
            <strong>You have selected {item.name}!</strong> <br />
            <strong>Item Cose: {item.value} </strong>
          </div>
        )
      })}
      <div key={selectedItem.name}>
        <strong>You have selected {selectedItem.name}!</strong> <br />
        <strong>Item Cose: {selectedItem.value} </strong>
      </div>
    </>
  )
}

export const Base = Template.bind({})

Base.args = {}

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
}

export const Multiple = Template.bind({})

Multiple.args = {
  multiple: true,
}
