"use client"

import NotFoundPage from "@/components/ui/common/not-found/NotFoundPage"
import "@/styles/glitch/glitch.css"

export default function NotFound() {

    return <NotFoundPage
                title = "Beta Zone"
                message = "여기는 아직 코드를 짜는 중입니다... 나중에 다시 와주세요 :)"
                showHomeButton = {true}
                href="/main"
                backPage="홈으로 돌아가기"
            />
}