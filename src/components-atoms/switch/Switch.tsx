import { css } from '@emotion/react'

type SwitchProps = {
  id: string
}

const switchInputCss = css`
  width: 0;
  height: 0;
  visibility: hidden;

  + label {
    width: 5rem;
    height: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: var(--gray);
    border-radius: 5rem;
    padding-left: 1rem;
    cursor: pointer;
  }

  :checked + label {
    background-color: #37e237;
  }

  + label > span {
    background-color: white;
    width: 2rem;
    height: 2rem;
    position: absolute;
    border-radius: 100%;
    transition: transform 0.3s ease-in-out;
  }

  :checked + label > span {
    transform: translateX(2.5rem);
  }
`

const Switch = ({ id }: SwitchProps) => {
  return (
    <>
      <input type="checkbox" id={id} css={switchInputCss} />
      <label htmlFor={id}>
        <span></span>
      </label>
    </>
  )
}

export default Switch
