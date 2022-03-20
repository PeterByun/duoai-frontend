import {
  StyledImg,
  StyledImgProps,
} from '@/components-atoms/img/StyledImg.style'

import { Text } from '@/components-atoms/text/Text'
import { FlexBox } from '@/components-atoms/flex-box/StyledFlexBox.style'
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

  css?: CSSProperties
}

export const Img = (props: StyledImgProps & ImgProps) => {
  return (
    <FlexBox
      aria-label="image-wrapper"
      flexDirection="column"
      align="center"
      disabled={props.disabled}
      css={{
        borderRadius: props.circle ? '50%' : 'initial',
        border: props.border ? '1px solid var(--white)' : 'initial',
        ...props.cssProps,
      }}
    >
      <StyledImg
        css={{
          borderRadius: props.circle ? '50%' : 'initial',
        }}
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
        <Text
          textAlign="center"
          width="100%"
          color={props.color}
          whiteSpace="pre-line"
        >
          {props.image.name}
        </Text>
      )}
    </FlexBox>
  )
}
