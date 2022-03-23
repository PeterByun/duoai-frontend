import { css } from '@emotion/react'
import React from 'react'

type Size = 'sm' | 'md' | 'lg'

type SwitchProps = {
  id: string
  onChange: (event: React.ChangeEvent) => void
  size: Size
}

const switchInputCss = css`
  width: 0;
  height: 0;
  visibility: hidden;

  + label {
    width: 3rem;
    height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: var(--light-gray);
    border-radius: 5rem;
    padding-left: 0.5rem;
    cursor: pointer;
  }

  :checked + label {
    background-color: #37e237;
  }

  :checked + label > span {
    transform: translateX(1rem);
  }
`

const circleCss = css`
  background-color: white;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  border-radius: 100%;
  transition: transform 0.2s ease-in-out;
`

const cssUnitToNumber = (cssUnit: string) => {
  return Number(cssUnit.replace(/px|rem|em|vw|vh/gi, ''))
}

const Switch = ({ id, onChange, size }: SwitchProps) => {
  const SWITCH_SIZE_MAP = {
    sm: ['3rem', '2rem', '1.5rem'],
    md: ['4rem', '3rem', '2rem'],
    lg: ['6rem', '4rem', '2.5rem'],
  }

  const [inputWidth, inputHeight, circleRadius] =
    SWITCH_SIZE_MAP[size] ?? SWITCH_SIZE_MAP['sm']
  const distanceToSlide =
    cssUnitToNumber(inputWidth) - cssUnitToNumber(circleRadius) - 0.5

  console.log(SWITCH_SIZE_MAP[size])

  return (
    <>
      <input
        type="checkbox"
        id={id}
        css={[
          switchInputCss,
          {
            '+ label': {
              width: inputWidth,
              height: inputHeight,
            },
            ':checked + label > span': {
              transform: `translateX(${distanceToSlide}rem)`,
            },
          },
        ]}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span
          css={[
            circleCss,
            {
              width: circleRadius,
              height: circleRadius,
            },
          ]}
        ></span>
      </label>
    </>
  )
}

export default Switch
