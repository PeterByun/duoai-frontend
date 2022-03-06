import { useRef, useEffect } from 'react'

export type CanvasProps = {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => boolean
  rest?: any
}

const Canvas = ({ draw, rest }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let frameCount = 0
    let animationFrameId: number

    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement
      const context = canvas.getContext('2d')

      if (context) {
        const render = () => {
          frameCount++
          const continueAnimation = draw(context, frameCount)
          if (continueAnimation)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
      }
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas
