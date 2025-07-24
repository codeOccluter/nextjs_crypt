"use client"

import { useState } from "react"

import { registerPublicKey } from "@/lib/api/keys/registerKey"
import { generateRSAkeyPair } from "@/lib/crypto/generateKeys"
import { downloadFile } from "@/lib/utils/downloadFile"
import Input from "./Input"
import Button from "./Button"
import Modal from "./Modal"

export default function KeyGenForm() {

    const [username, setUsername] = useState("")
    const [publicKeyPem, setPublicKeyPem] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMsg, setModalMsg] = useState("")

    const handleGenerate = () => {

        if(!username) {
            setModalMsg(`사용자 이름을 입력해주세요.`)
            setModalOpen(true)
            return
        }

        const { publicKeyPem, privateKeyPem } = generateRSAkeyPair()
        setPublicKeyPem(publicKeyPem)
        downloadFile(`${username}_private.pem`, privateKeyPem)
        setModalMsg(`키 생성 완료! 비밀키 다운로드됨`)
        setModalOpen(true)
    }

    const handleRegister = async () => {

        try {
            const result = await registerPublicKey({ username, publicKey: publicKeyPem })
            setModalMsg(result.succes ? `공개키가 서버에 등록되었습니다.` : `등록 실패`)
        }catch(error) {
            setModalMsg(`등록 중 오류 발생: ${(error as Error).message}`)
        }
        setModalOpen(true)
    }

    return (
        <div>
            <h1></h1>
            <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용자 이름 (ex: kihoon)"
            />
            <Button onClick={handleGenerate}>키 생성</Button>

            {publicKeyPem && (
                <div className="flex flex-col itmes-center gap-4 mt-6 w-full">
                    <textarea
                        readOnly
                        value={publicKeyPem}
                        className="w-full max-w-2xl h-48 border rounded p-3 font-mono text-sm"
                    />
                    <Button
                        onClick={handleRegister}
                    >공개키 등록</Button>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="알림"
            >{modalMsg}</Modal>
        </div>
    )
}
