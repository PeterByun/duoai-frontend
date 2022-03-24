import { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Radio, { RadioItem } from '@/components-atoms/radio/Radio'

export default {
  title: 'Atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

const items = [
  {
    name: 'dash',
    value: '-',
  },
  {
    name: 'underscore',
    value: '_',
  },
  {
    name: 'dot',
    value: '.',
  },
]

const Template: ComponentStory<typeof Radio> = (args) => {
  const [checkedItem, setCheckedItem] = useState<RadioItem>(items[0])

  const handleRadioChange = (item: RadioItem) => {
    setCheckedItem(item)
  }

  return (
    <>
      <Radio
        {...args}
        id="1"
        items={items}
        onChange={handleRadioChange}
      ></Radio>
      <h1>
        You have checekd: {checkedItem.name}. <br />
        The value of the item is
        {` ${checkedItem.value}`}
      </h1>
    </>
  )
}

export const Base = Template.bind({})
Base.args = {}
