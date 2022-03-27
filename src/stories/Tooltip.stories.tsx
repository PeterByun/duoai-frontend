import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tooltip from '../components-atoms/tooltip/Tooltip'

export default {
    title: 'Atoms/Tooltip',
    component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => {
    const TooltipTarget = () => {
        return <button>Submit</button>
    }

    const TooltipContent = () => {
        return (
            <div>
                <h1>Warning!</h1>
                <p>
                    Clicking this button might cause irreversible, and possibly
                    catastrophic consequence.
                </p>
            </div>
        )
    }

    return (
        <>
            <article>
                <h1>Tooltip Example</h1>
                {new Array(5)
                    .fill(() => 1)
                    .map(() => {
                        return <br />
                    })}
                <Tooltip
                    {...args}
                    tooltipContent={TooltipContent()}
                    target={TooltipTarget()}
                ></Tooltip>
            </article>
        </>
    )
}

export const Base = Template.bind({})
Base.args = {
    position: 'top',
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
}
