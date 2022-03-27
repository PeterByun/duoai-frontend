import { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Switch from '../components-atoms/switch/Switch'

export default {
  title: 'Atoms/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false)

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked)
  }

  return (
    <>
      <Switch {...args} id="1" onChange={handleSwitchChange}></Switch>
      <h1>Switch is turned {isSwitchChecked ? 'on' : 'off'}!</h1>
    </>
  )
}

export const Lager = Template.bind({})
Lager.args = {
  size: 'lg',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
