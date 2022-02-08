import { ImgStyle, ImgStyleProps } from '@/components/img/StyledImg.style'

import { StyledText } from '@/components/text/Text'
import { StyledFlexBox } from '@/components/flexBox/StyledFlexBox.style'

type ImgWithLabelProps = {
  image: {
    name?: string
    src: string
  }

  color?: string

  width?: string
  height?: string

  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
  disabled?: boolean
  isNameHidden?: boolean
}

export const ImgWithLabel = (props: ImgStyleProps & ImgWithLabelProps) => {
  return (
    <StyledFlexBox
      aria-label="image-wrapper"
      flexDirection="column"
      align="center"
      disabled={props.disabled}
    >
      <ImgStyle
        onClick={props.onClick}
        src={props.image.src}
        width={props.width ? props.width : '3rem'}
        height={props.height ? props.height : '3rem'}
        aria-label={props.image.name}
        {...props}
      >
        {props.children}
      </ImgStyle>

      {!props.isNameHidden && (
        <StyledText
          textAlign="center"
          width="100%"
          color={props.color}
          whiteSpace="pre-line"
        >
          {props.image.name}
        </StyledText>
      )}
    </StyledFlexBox>
  )
}
