import React from 'react'

const Loading = (props: { resultComponent: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<></>}>{props.resultComponent}</React.Suspense>
  )
}

export default Loading
