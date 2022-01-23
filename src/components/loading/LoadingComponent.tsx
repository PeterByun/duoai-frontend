import React from 'react'

const Loading = (props: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<>Loading ...</>}>
      {props.children}
    </React.Suspense>
  )
}

export default Loading
