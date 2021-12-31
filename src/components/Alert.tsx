import React, { useEffect } from "react"

import { FlexBoxStyle } from "../components-styled/StyledFlexBox.style"
import { StyledModal } from "../components-styled/StyledModal.style"
import { StyledText } from '../components-styled/StyledText.style'

import Heading from '../components/Heading'
import Button from '../components/Button'
import ReactDOM from "react-dom"


export type AlertData = {
    isAlertOpen: boolean
    title?: string
    message?: string
}

type AlertProps = {
    alertData: AlertData,
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
            if(event.key !== 'Escape') return
            handleCloseClick()
        }

        window.addEventListener<'keyup'>('keyup', (handleWindowKeyup))

        return () => {
            window.removeEventListener('keyup', handleWindowKeyup)
        }
    }, [])

    const modal =(
        <StyledModal 
            isOpen={props.alertData.isAlertOpen} 
            onClick={handleCloseClick}
        >
            <FlexBoxStyle 
                backgroundColor="white"
                position="fixed"
                left="35vw"
                top="25vw"
                width="30vw" 
                height="20vh"
                flexDirection="column" 
                borderRadius="5px"
                onClick={handleAlertClick}
            >
                <Heading level={3}>
                    { props.alertData.title }
                </Heading>

                <StyledText>
                    { props.alertData.message }
                </StyledText>

                <FlexBoxStyle width="80%" flexDirection="row" justify="space-evenly">
                    <Button
                        onClick={handleConfirmClick}
                        width="5rem"
                        height="2rem"
                    >
                        확인
                    </Button>
                    <Button
                        onClick={handleCloseClick}
                        backgroundColor="gray"
                        width="5rem"
                        height="2rem"
                    >
                        닫기
                    </Button>
                </FlexBoxStyle>
            </FlexBoxStyle>
        </StyledModal>
    )

    return ReactDOM.createPortal(modal, document.getElementById('root') as HTMLLIElement)
}

export default Alert