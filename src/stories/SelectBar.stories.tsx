import { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SelectBar, {
    SelectBarItem,
} from '../components-atoms/select-bar/SelectBar'

export default {
    title: 'Atoms/SelectBar',
    component: SelectBar,
} as ComponentMeta<typeof SelectBar>

const Template: ComponentStory<typeof SelectBar> = (args) => {
    const items = [
        {
            name: 'giraffe',
            value: 'spotted',
        },
        {
            name: 'monky',
            value: 'brown',
        },
    ]

    const [selectedItem, setSelectedItem] = useState<SelectBarItem>(items[0])

    const handleItemClick = (item: SelectBarItem) => {
        setSelectedItem(item)
    }

    return (
        <>
            <SelectBar {...args} onClick={handleItemClick} items={items} />
            {selectedItem.value}
        </>
    )
}

export const Base = Template.bind({})
Base.args = {}

// export const Disabled = Template.bind({})
// Disabled.args = {
//   disabled: true,
// }
