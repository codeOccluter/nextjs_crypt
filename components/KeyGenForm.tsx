"use client"

import { useState, useEffect } from "react"
import { generateRSAKeys } from "@/lib/crypto/generateKeys"
import { encrpyt } from "@/lib/crypto/encrypto"
import { decrypt } from "@/lib/crypto/decrypto"
import { downloadFile } from "@/lib/utils/downloadFile"

import Input from "./Input"
import Button from "./Button"
import Modal from "./Modal"

export default function KeyGenForm() {

    const [message, setMessage] = useState(0n)
    const [result, setResult] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMsg, setModalMsg] = useState("")

    // useEffect(() => {
        
    //     const { publicKey, privateKey } = generateRSAKeys(1024)
        
    //     console.log(`공개키: ${publicKey}`)
    //     console.log(`비밀키: ${privateKey}`)

    //     const message = 41n
    //     const encrypted = encrpyt(message, publicKey)
    //     const decrypted = decrypt(encrypted, privateKey)

    //     setResult(`원본 메시지: ${message}\n \
    //         암호화: ${encrypted}\n 
    //         복호화: ${decrypted}\n 
    //         공개키: ${publicKey.e.toString()}\n 
    //         비밀키: ${privateKey.d.toString(16)}\n 
    //         모듈 진수: ${publicKey.n.toString(16)}`)
    // }, [])

    const handleGenerate = () => {

        const { publicKey, privateKey } = generateRSAKeys(1024)

        if(!message) {
            setModalMsg(`사용자 이름을 입력해주세요.`)
            setModalOpen(true)
            return
        }
        const encrypted = encrpyt(message, publicKey)

        setModalMsg(`키 생성 완료! 비밀키 다운로드됨`)
        setModalOpen(true)
    }

    const handleRegister = async () => {

        try {
            
            // setModalMsg(result.succes ? `공개키가 서버에 등록되었습니다.` : `등록 실패`)
        }catch(error) {
            setModalMsg(`등록 중 오류 발생: ${(error as Error).message}`)
        }
        setModalOpen(true)
    }

    return (
        <div>
            <h1></h1>
            
            <Button onClick={handleGenerate}>키 생성</Button>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="알림"
            >{modalMsg}</Modal>
            <div>
                <h1>RSA 공개키 알고리즘 테스트</h1>
                <pre>{result}</pre>
            </div>
        </div>
    )
}
