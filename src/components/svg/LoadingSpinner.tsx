import styled from '@emotion/styled'

export const StyledLoadingSpinner = styled.svg``

export const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner width="100" height="100" viewBox="-5 -5 10 10">
      <circle cx="3" cy="3" r="0.5" fill="rgb(67, 67, 225)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.2s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="3" cy="3" r="0.5" fill="rgb(255, 57, 249)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.3s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="3" cy="3" r="0.5" fill="rgb(67, 67, 225)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.4s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="3" cy="3" r="0.5" fill="rgb(255, 57, 249)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.5s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="3" cy="3" r="0.5" fill="rgb(67, 67, 225)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.6s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>
    </StyledLoadingSpinner>
  )
}
