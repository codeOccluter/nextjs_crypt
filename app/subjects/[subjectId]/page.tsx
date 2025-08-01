"use client"

import { ReactNode } from "react"
import NotFoundPage from "@/components/common/not-found/NotFoundPage"
import DatabaseContent from "@/components/subjects/DatabaseContent"
import OsContent from "@/components/subjects/OsContent"
import AlgorithmContent from "@/components/subjects/AlgorithmContent"
import Cryptography from "@/components/subjects/CryptographyContent"

interface PageProps {
    params: { subjectId: string }
}

const componentMap: Record<string, ReactNode> = {
    db: <DatabaseContent />,
    os: <OsContent />,
    algorithm: <AlgorithmContent />,
    cryptography: <Cryptography />
}

interface PageProps {
    params: { subjectId: string }
}

export default function SubjectDetail({ params }: PageProps) {
    
    const Component = componentMap[params.subjectId]

    return Component ?? 
            <NotFoundPage
                title="Coming Soon"
                message="아직 만들고 있습니다....조금만 기다려주세요 !!"
                showHomeButton={true}
                href="/"
                backPage="과목 선택 페이지"
            />
}