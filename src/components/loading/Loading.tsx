import React, { useEffect, useState } from 'react'

const Loading = (props: {
  task: Promise<void> | null
  children: React.ReactNode
}) => {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false)

  useEffect(() => {
    if (props.task) {
      props.task.finally(() => {
        setIsTaskDone(true)
      })
    }
  }, [props.task])

  return (
    <>
      {props.task ? (
        isTaskDone ? (
          props.children
        ) : (
          <div> loading ...</div>
        )
      ) : null}
    </>
  )
}

export default Loading
