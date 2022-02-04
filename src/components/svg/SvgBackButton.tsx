import { StyledSvgBackButton } from './StyledSvgBackButton.style'

export const SvgBackButton = (props: { onClick: () => void }) => {
  return (
    <StyledSvgBackButton
      position="absolute"
      left="5rem"
      height="50"
      width="40"
      isButton
      onClick={props.onClick}
    >
      <polygon points="25,0 25,40 0,20" style={{ fill: 'black' }} />
      Sorry, your browser does not support inline SVG.
    </StyledSvgBackButton>
  )
}
