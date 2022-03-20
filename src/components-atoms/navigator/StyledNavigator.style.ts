import styled from '@emotion/styled'

type NavContainerStyleProps = {
  depth: number
}

export const NavContainerStyle = styled.nav<NavContainerStyleProps>`
  background: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 100%;
  height: 3.5rem;

  border-radius: 0rem;
  padding: 0.5rem;
  text-align: center;

  box-shadow: 0px 1px 1px 0px var(--light-gray);
`

export const LinkWrapperStyle = styled.section`
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  max-width: 100%;
`

type LinkStyleProps = {
  disabled?: boolean
}

export const LinkStyle = styled.div<LinkStyleProps>`
  background: transparent;
  color: var(--black);
  text-align: center;

  display: flex;
  align-items: center;
  user-select: none;

  height: 2rem;
  margin: 0 10px;
  min-width: 80px;

  padding: 3px 5px;

  border-radius: 0rem;

  white-space: nowrap;

  :hover {
    cursor: pointer;
  }
  :hover a {
    opacity: 0.8;
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed !important' : '')};

  a {
    color: ${({ disabled }) => (disabled ? 'var(--disabled)' : 'var(--black)')};

    pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    text-decoration: none;
    white-space: pre-line;
  }
`
