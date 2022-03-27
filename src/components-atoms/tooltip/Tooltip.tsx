import { ReactNode, useCallback, useRef, useState } from 'react'
import { css, keyframes } from '@emotion/react'

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

type TooltipProps = {
    position: TooltipPosition
    target: ReactNode
    tooltipContent: ReactNode
    disabled?: boolean
}

const TOOLTIP_POSITION = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
}

const Tooltip = ({
    position,
    target,
    tooltipContent,
    disabled,
}: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    const timerIdToHideTooltip = useRef<ReturnType<typeof setTimeout> | null>()

    const showTooltipForOneSec = () => {
        setShowTooltip(true)
    }
    const handleMouseOver = () => {
        showTooltipForOneSec()
    }
    const handleFocus = () => {
        showTooltipForOneSec()
    }

    const handleMouseOut = () => {
        if (!timerIdToHideTooltip.current) {
            timerIdToHideTooltip.current = setTimeout(() => {
                setShowTooltip(false)
                timerIdToHideTooltip.current = null
            }, 500)
        }
    }

    const [tooltipSize, setTooltipSize] = useState<[number, number]>([100, 100])
    const [tooltipWidth, tooltipHeight] = tooltipSize

    const setTooltipRef: React.RefCallback<HTMLDivElement> = useCallback(
        (tooltipNode) => {
            if (!tooltipNode) return
            setTooltipSize([tooltipNode.offsetWidth, tooltipNode.offsetHeight])
        },
        []
    )
    const keyframeShowTooltip = (translate?: string) => {
        return keyframes`
        from {           
            transform: scale(0.8) ${translate};
        }
        to {
            transform: scale(1) ${translate};
        }
    `
    }

    const getTooltipPositionCss = (position: TooltipPosition) => {
        const animationDuration = '0.15s'

        const topPositionTranslate = `translateY(-${tooltipHeight}px)`
        const topPositionCss = css`
            transform: ${topPositionTranslate};
            animation: ${keyframeShowTooltip(topPositionTranslate)}
                ${animationDuration} ease-out;
        `

        const rightPositionTranslate = `translateX(${tooltipWidth}px)`
        const rightPositionCss = css`
            transform: ${rightPositionTranslate};
            animation: ${keyframeShowTooltip(rightPositionTranslate)}
                ${animationDuration} ease-out;
        `

        const bottomPositionCss = css`
            animation: ${keyframeShowTooltip()} ${animationDuration} ease-out;
        `

        const leftPositionTranslate = `translateX(-${tooltipWidth}px)`
        const leftPositionCss = css`
            transform: ${leftPositionTranslate};
            animation: ${keyframeShowTooltip(leftPositionTranslate)}
                ${animationDuration} ease-out;
        `
        switch (position) {
            case TOOLTIP_POSITION.TOP:
                return topPositionCss
            case TOOLTIP_POSITION.RIGHT:
                return rightPositionCss
            case TOOLTIP_POSITION.BOTTOM:
                return bottomPositionCss
            case TOOLTIP_POSITION.LEFT:
                return leftPositionCss
        }
    }

    const TooltipContent = () => {
        return (
            !disabled &&
            showTooltip && (
                <div
                    role="tooltip"
                    ref={setTooltipRef}
                    css={[
                        {
                            position: 'absolute',
                            background: '#80808057',
                            padding: '1rem',
                            borderRadius: '1rem',
                        },
                        getTooltipPositionCss(position),
                    ]}
                >
                    {tooltipContent}
                </div>
            )
        )
    }

    return (
        <div
            css={{
                position: 'relative',
            }}
        >
            {position !== TOOLTIP_POSITION.BOTTOM && TooltipContent()}
            <div
                onMouseOver={handleMouseOver}
                onFocus={handleFocus}
                onMouseOut={handleMouseOut}
            >
                {target}
            </div>
            {position === TOOLTIP_POSITION.BOTTOM && TooltipContent()}
        </div>
    )
}

export default Tooltip
