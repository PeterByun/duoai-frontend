import styled from '@emotion/styled'

type NavContainerStyleProps = {
  depth: number
}

export const NavContainerStyle = styled.nav<NavContainerStyleProps>`
  background: 'transparent';

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 5%;

  border-radius: 0rem;
  padding: 1rem;
  text-align: center;

  box-shadow: 0px 1px 1px 0px var(--light-gray);

  margin-bottom: ${({ depth }) => (depth ? '3rem' : null)};
`

export const LinkWrapperStyle = styled.section`
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  max-width: 100%;

  border-radius: 0rem;
  text-align: center;
`

type LinkStyleProps = {
  disabled?: boolean
}

export const LinkStyle = styled.div<LinkStyleProps>`
  background: 'transparent';
  color: var(--black);

  display: flex;
  align-items: center;
  user-select: none;

  height: 40px;
  margin: 0 10px;
  min-width: 80px;

  padding: 3px 5px;

  white-space: nowrap;

  :hover {
    cursor: pointer;
  }
  :hover a {
    opacity: 0.8;
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed !important' : null)};

  a {
    color: ${({ disabled }) => (disabled ? 'var(--disabled)' : 'var(--black)')};

    pointer-events: ${({ disabled }) => (disabled ? 'none' : null)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    text-decoration: none;

    ::after {
      position: absolute;
      margin-top: 2rem;
      content: '⚒';
      display: ${({ disabled }) => (disabled ? 'inline' : 'none')};
    }
  }
`