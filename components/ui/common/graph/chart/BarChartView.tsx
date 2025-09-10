"use client"

import { scaleBand, scaleLinear } from "@visx/scale"
import { Bar } from "@visx/shape"
import { AxisBottom, AxisLeft } from "@visx/axis"

type Datum = {
    label: string
    value: number
}

interface BarChartViewProps {
    data: Datum[]
    width?: number
    height?: number
}

export default function BarChartView({
    data,
    width = 500,
    height = 300,
}: BarChartViewProps) {

    const margin = { top: 20, right: 20, bottom: 40, left: 40 }

    const xScale = scaleBand<string>({
        domain: data.map((d) => d.label),
        range: [margin.left, width - margin.right],
        padding: 0.3,
    })

    const yScale = scaleLinear<number>({
        domain: [0, Math.max(...data.map((d) => d.value))],
        range: [height - margin.bottom, margin.top]
    })

    return (
        <svg width={width} height={height}>
            {data.map((d) => {
                const barX = xScale(d.label)!
                const barY = yScale(d.value)
                const barWidth = xScale.bandwidth()
                const barHeight = height - margin.bottom - barY

                return (
                    <Bar
                        key={d.label}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill="steelblue"
                        rx={4}
                    />
                )
            })}

            <AxisBottom
                scale={xScale}
                top={height - margin.bottom}
                stroke="black"
                tickStroke="black"
                tickLabelProps={() => ({
                    fill: "black",
                    fontSize: 12,
                    textAnchor: "middle"
                })}
            />
            <AxisLeft 
                scale={yScale}
                left={margin.left}
                stroke="black"
                tickStroke="black"
                tickLabelProps={() => ({
                    fill: "black",
                    fontSize: 12,
                    textAnchor: "end",
                    dx: "-0.25em",
                    dy: "0.25em"
                })}
            />

        </svg>
    )
}