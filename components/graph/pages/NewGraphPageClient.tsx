"use client"

import { useGraphActivityNotification } from "@/features/notification/bar/bar.features"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

interface NewGraphPageClientProps {
    children: React.ReactNode
    createGraphAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>
}

export default function NewGraphPageClient({ 
    children, 
    createGraphAction 
}: NewGraphPageClientProps) {
    const { notifyGraphCreated } = useGraphActivityNotification()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                // Server Action 실행
                const result = await createGraphAction(formData)
                
                if (result.success) {
                    // 성공 시 알림 트리거
                    notifyGraphCreated()
                    
                    // 메인 페이지로 리다이렉션
                    router.push('/main')
                } else {
                    // 에러 처리
                    const errorMessages = {
                        required: "필수 항목을 입력해주세요.",
                        duplicate: "이미 존재하는 슬러그입니다.",
                        unknown: "알 수 없는 오류가 발생했습니다."
                    }
                    const errorMessage = errorMessages[result.error as keyof typeof errorMessages] || "오류가 발생했습니다."
                    alert(errorMessage) // 나중에 더 나은 에러 UI로 교체 가능
                }
            } catch (error) {
                console.error('Graph creation failed:', error)
                alert("그래프 생성 중 오류가 발생했습니다.")
            }
        })
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {children}
            
            <div className="flex items-center gap-3">
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "저장 중..." : "저장"}
                </button>
                <a href="/main" className="text-sm text-gray-600 hover:underline">취소</a>
            </div>
        </form>
    )
}
