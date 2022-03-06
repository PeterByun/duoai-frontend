import { StyledSvgBackButton } from './StyledSvgBackButton.style'

export const SvgBackButton = (props: { onClick: () => void }) => {
  return (
    <StyledSvgBackButton
      height="25"
      width="20"
      isButton
      onClick={props.onClick}
      css={{
        position: 'absolute',
        left: '5rem',
      }}
    >
      <polygon points="10,0 10,16 0,8" style={{ fill: 'black' }} />
      Sorry, your browser does not support inline SVG.
    </StyledSvgBackButton>
  )
}
