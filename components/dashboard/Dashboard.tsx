"use client"

import Link from "next/link"
import Card from "./Card"

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* <div className="max-x-6xl mx-auto">
            ** 헤더 컴포넌트 **
            </div> */}
            <p className="text-gray-600 mb-8">
                다양한 암호화 알고리즘을 실험해보고 테스트할 수 있는 대시보드
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card 
                    title="DES"
                    description="고전적인 대칭키 암호화 알고리즘"
                    href="/encrypt-/des"
                />
                <Card
                    title="AES"
                    description="현대 표준 대칭키 암호화 알고리즘"
                    href="/encrypt/aes"
                />
                <Card
                    title="RSA"
                    description="대표적인 공개키 암호화 알고리즘"
                    href="/encrypt/rsa"
                />
            </div>
        </div>
    )
}