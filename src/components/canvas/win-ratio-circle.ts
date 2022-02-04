import { colors } from '@/constants/app-constants'

export const drawWinRatioCircle = (winRatio: number, teamColor: string) => {
  return (ctx: CanvasRenderingContext2D, frameCount: number): boolean => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.lineWidth = 23
    ctx.strokeStyle = '#e6e6e6'

    ctx.beginPath()
    ctx.arc(100, 100, 65, 0, 2 * Math.PI)
    ctx.stroke()

    const startAngle = Math.PI * 1.5

    ctx.beginPath()
    ctx.lineWidth = 15
    ctx.strokeStyle = colors[teamColor]
    const endAngle = startAngle + Math.PI * 2 * winRatio * (frameCount * 0.025)
    ctx.arc(100, 100, 65, startAngle, endAngle)
    ctx.stroke()

    if (endAngle >= startAngle + Math.PI * 2 * winRatio) return false

    return true
  }
}
