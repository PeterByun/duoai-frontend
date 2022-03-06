import React, { useEffect, useState } from 'react'

import { LoadingSpinner } from '@/components-atoms/svg/LoadingSpinner'

const Loading = (props: {
  task: Promise<void> | null
  children: React.ReactNode
}) => {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false)

  useEffect(() => {
    if (props.task) {
      setIsTaskDone(false)
      props.task.finally(() => {
        setIsTaskDone(true)
      })
    }
  }, [props.task])

  return (
    <>{props.task ? isTaskDone ? props.children : <LoadingSpinner /> : null}</>
  )
}

export default Loading
