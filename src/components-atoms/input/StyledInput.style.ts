import styled from '@emotion/styled'

type InputWrapperStyleProps = {
  width?: string
  height?: string
}

export const InputWrapperStyle = styled.div<InputWrapperStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: ${({ width }) => (width ? width : '80%')};
  height: ${({ height }) => (height ? height : '60%')};

  p {
    color: var(--white);
    font-size: 0.8rem;
    margin: 0 0 5px 0;
  }
`

export const InputStyle = styled.input`
  display: inline-block;

  width: 100%;
  height: 100%;

  border: none;
  border-radius: 3px;

  outline: none;
  -webkit-appearance: none;
`
