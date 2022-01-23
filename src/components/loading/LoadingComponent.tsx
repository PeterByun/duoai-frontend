import React from 'react'

import { LoadingSpinner } from '@/components/svg/LoadingSpinner'

const Loading = (props: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {props.children}
    </React.Suspense>
  )
}

export default Loading
