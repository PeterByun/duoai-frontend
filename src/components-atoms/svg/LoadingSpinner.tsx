import styled from '@emotion/styled'

export const StyledLoadingSpinner = styled.svg``

export const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner width="100" height="100" viewBox="-5 -5 10 10">
      <circle cx="3" cy="3" r="0.5" fill="rgb(255, 133, 225)">
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

      <circle cx="3" cy="3" r="0.5" fill="rgb(255, 143, 255)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.22s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="3" cy="3" r="0.5" fill="rgb(178, 130, 255)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.23s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="3" cy="3" r="0.5" fill="rgb(148, 141, 253)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.24s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="3" cy="3" r="0.5" fill="rgb(89, 106, 255)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360"
          to="0"
          dur="1.25s"
          additive="sum"
          repeatCount="indefinite"
        />
      </circle>
    </StyledLoadingSpinner>
  )
}
