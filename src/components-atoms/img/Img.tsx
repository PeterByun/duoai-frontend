import {
  StyledImg,
  StyledImgProps,
} from '@/components-atoms/img/StyledImg.style'

import { StyledText } from '@/components-atoms/text/Text'
import { StyledFlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
import { CSSProperties } from 'react'

type ImgProps = {
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
  circle?: boolean
  border?: boolean
  cursor?: string

  cssProps?: CSSProperties
}

export const Img = (props: StyledImgProps & ImgProps) => {
  return (
    <StyledFlexBox
      aria-label="image-wrapper"
      flexDirection="column"
      align="center"
      disabled={props.disabled}
      css={{
        clipPath: props.circle ? 'circle()' : 'initial',
        border: props.border ? '1px solid var(--white)' : 'initial',
        ...props.cssProps,
      }}
    >
      <StyledImg
        onClick={props.onClick}
        src={props.image.src}
        width={props.width ? props.width : '3rem'}
        height={props.height ? props.height : '3rem'}
        aria-label={props.image.name}
        {...props}
      >
        {props.children}
      </StyledImg>

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
