import React, { useEffect } from 'react'

import { FlexBox } from '../flex-box/StyledFlexBox.style'
import { StyledModal } from '../modal/StyledModal.style'
import { Text } from '../text/Text'

import Heading from '../heading/Heading'
import Button from '../button/Button'
import ReactDOM from 'react-dom'

export type AlertData = {
  isAlertOpen: boolean
  title?: string
  message?: string
}

type AlertProps = {
  alertData: AlertData
  setIsAlertOpen: (value: boolean) => void
}

const Alert = (props: AlertProps) => {
  const handleCloseClick = () => {
    props.setIsAlertOpen(false)
  }

  const handleConfirmClick = () => {
    handleCloseClick()
  }

  const handleAlertClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  useEffect(() => {
    const handleWindowKeyup = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      handleCloseClick()
    }

    window.addEventListener<'keyup'>('keyup', handleWindowKeyup)

    return () => {
      window.removeEventListener('keyup', handleWindowKeyup)
    }
  }, [])

  const modal = (
    <StyledModal
      isOpen={props.alertData.isAlertOpen}
      onClick={handleCloseClick}
    >
      <FlexBox
        backgroundColor="white"
        width="fit-content"
        height="20vh"
        flexDirection="column"
        css={{
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          left: '50%',
          top: '50%',
          borderRadius: '5px',
        }}
        onClick={handleAlertClick}
      >
        <Heading level={3}>{props.alertData.title}</Heading>

        <Text padding="1rem">{props.alertData.message}</Text>

        <FlexBox width="80%" flexDirection="row" justify="space-evenly">
          <Button onClick={handleConfirmClick} width="5rem" height="2rem">
            확인
          </Button>
          <Button
            onClick={handleCloseClick}
            backgroundColor="dark-gray"
            width="5rem"
            height="2rem"
          >
            닫기
          </Button>
        </FlexBox>
      </FlexBox>
    </StyledModal>
  )

  return ReactDOM.createPortal(
    modal,
    document.getElementById('root') as HTMLLIElement
  )
}

export default Alert
