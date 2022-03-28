import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '@/components-atoms/button/Button'

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}> Button </Button>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}
export const Circle = Template.bind({})
Circle.args = {
  circle: true,
}
