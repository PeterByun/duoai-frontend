import { ComponentStory, ComponentMeta } from '@storybook/react'

import Switch from '../components-atoms/switch/Switch'

export default {
  title: 'Atoms/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => (
  <Switch {...args} id="1"></Switch>
)

export const Primary = Template.bind({})
Primary.args = {
  //   primary: true,
}
