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

  const handleItemChange = (item: SelectItem) => {
    setSelectedItem(item)
  }

  return (
    <>
      <h1>Select the item you want to purchse.</h1>
      <Select
        {...args}
        id="1"
        items={items}
        onItmeChange={handleItemChange}
      ></Select>
      <strong>You have selected {selectedItem.name} !</strong> <br />
      <strong>Item Cose: {selectedItem.value} </strong>
    </>
  )
}

export const Lager = Template.bind({})
Lager.args = {}
