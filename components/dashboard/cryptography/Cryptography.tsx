"use client"

import Card from "@/components/common/card/Card"
import { LockClosedIcon } from "@heroicons/react/24/outline"

export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <p className="text-gray-600 mb-8">
                다양한 암호화 알고리즘을 실험해보고 테스트할 수 있는 페이지
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card 
                    title="DES"
                    description="고전적인 대칭키 암호화 알고리즘"
                    href="/encrypt-/des"
                    icon={<LockClosedIcon className="w-12 h-12" />}
                    tag="Legacy"
                />
                <Card
                    title="AES"
                    description="현대 표준 대칭키 암호화 알고리즘"
                    href="/encrypt/aes"
                    icon={<LockClosedIcon className="w-12 h-12" />}
                    tag="recommended"
                />
                <Card
                    title="RSA"
                    description="대표적인 공개키 암호화 알고리즘"
                    href="/encrypt/rsa"
                    icon={<LockClosedIcon className="w-12 h-12" />}
                    tag="Present"
                />
            </div>
        </div>
    )
}