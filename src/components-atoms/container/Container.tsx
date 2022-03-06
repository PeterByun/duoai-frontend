import {
  ContainerStyle,
  ContainerCoverStyle,
  ContainerCoverStyleProps,
} from '@/components-atoms/container/StyledContainer.style'

type ContainerProps = ContainerCoverStyleProps & {
  children: any
  zIndex?: string
}

// TODO: a container should take two props. One for the wrapper, and the other for the container.
export default function Container(props: ContainerProps) {
  return (
    <ContainerCoverStyle {...props}>
      <ContainerStyle>{props.children}</ContainerStyle>
    </ContainerCoverStyle>
  )
}
