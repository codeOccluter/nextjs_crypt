"use client"

import "@/styles/components/loaders/data-fill-loader.css"

type Props = {
    width?: number
    height?: number
    bars?: number
    gap?: number
    color?: string
    bgColor?: string
    duration?: number
    className?: string
    label?: string
}

export default function DataFillLoader({
    width = 160,
    height = 64,
    bars = 4,
    gap = 8,
    color = "rgb(59,130,246)",  // tailwind blue-500
    bgColor = "rgba(148,163,184,0.25)", // slate-400/25
    duration = 1.8,
    className,
    label = "Loading",
}: Props) {
    const barWidth = (width - gap * (bars - 1)) / bars
    const delays = ["", "delay-1", "delay-2", "delay-3", "delay-4"]

    return (
        <div
            className={`dfl-wrap ${className ?? ""}`}
            role="status"
            aria-label={label}
            aria-live="polite"
            style={{ ["--dfl-duration" as any]: `${duration}s` }}
        >
            <svg
                className="dfl-svg"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                aria-hidden
            >
                {/* 틀 배경 */}
                <rect x="0" y="0" width={width} height={height} rx="12" fill={bgColor} />

                {/* 각 바 영역 */}
                {Array.from({ length: bars }).map((_, i) => {
                    const x = i * (barWidth + gap)
                    // 각 바의 최대 높이를 살짝 랜덤/다양하게 주고 싶으면 아래 maxH 조절
                    const maxH = height - 12 // 패딩처럼 약간 여유
                    const baseH = maxH * 0.35 // 최소 높이
                    const peakH = maxH * 0.95 // 최대 높이

                    return (
                        <g key={i} transform={`translate(${x},0)`}>
                            {/* 바 컨테이너(마스크 역할) */}
                            <clipPath id={`clip-${i}`}>
                                <rect x="0" y="6" width={barWidth} height={height - 12} rx="8" />
                            </clipPath>

                            {/* 외곽선(바 틀) */}
                            <rect
                                x="0"
                                y="6"
                                width={barWidth}
                                height={height - 12}
                                rx="8"
                                fill="rgba(148,163,184,0.35)" /* slate-400/35 */
                            />

                            {/* 채워지는 바 (아래에서 위로 차오름) */}
                            <g clipPath={`url(#clip-${i})`}>
                                <rect
                                    className={`dfl-bar ${delays[i % delays.length]}`}
                                    x="0"
                                    /* 시작은 바닥에서 baseH, 왕복 애니메이션으로 peakH까지 차오르게 */
                                    y={height - 6 - baseH}
                                    width={barWidth}
                                    height={baseH}
                                    rx="6"
                                    fill={color}
                                    style={{
                                        animationDuration: `${duration + i * 0.15}s`,
                                    }}
                                />
                                {/* 글로스가 위에서 아래로 지나가는 느낌 */}
                                <rect
                                    className="dfl-gloss"
                                    x="0"
                                    y={6 - (height - 12)}
                                    width={barWidth}
                                    height={height - 12}
                                    fill="white"
                                    opacity={0.08}
                                />
                            </g>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
