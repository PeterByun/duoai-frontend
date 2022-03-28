import { Text } from '@/components-atoms/text/Text'
import { FlexBox } from '../flex-box/StyledFlexBox.style'

import esportsVideo from '../../assets/videos/eports.mp4'
import { css } from '@emotion/react'

export default function Slogan() {
  return (
    <article>
      <video
        src={esportsVideo}
        playsInline
        autoPlay
        muted
        loop
        css={css`
          width: 30vw;
          height: 80vh;
          margin-right: 25vw;
        `}
      ></video>
      <FlexBox
        flexDirection="column"
        align="flex-start"
        justify="center"
        css={css`
          position: fixed;
          top: 30vh;
          left: 30vw;
          z-index: 1;
        `}
      >
        <Text color="white" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          당신의 직감을
        </Text>
        <Text color="white" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          확신으로
        </Text>
        <Text
          color="white"
          fontSize="3.4rem"
          fontWeight="bold"
          margin="1.4rem 0"
        >
          DUOAI
        </Text>
      </FlexBox>

      <FlexBox
        flexDirection="column"
        align="flex-start"
        justify="center"
        css={css`
          position: fixed;
          top: 30vh;
          left: 50vw;
          z-index: 1;
        `}
      >
        <Text color="black" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          4대 리그 팀 순위,
        </Text>
        <Text color="black" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          경기 결과 통계,
        </Text>
        <Text color="black" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          AI 인기 프로팀 분석,
        </Text>
        <Text color="black" fontSize="3rem" fontWeight="bold" margin="1.4rem 0">
          승패 예측까지.
        </Text>
      </FlexBox>
    </article>
  )
}
