"use client"

import { motion } from "framer-motion"

export default function Dashboard() {

    return (
        <div className="relative w-full h-screen overflow-hideen">
            <img 
                src="/images/CE.jpg"
                alt="Cryptography Background"
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute w-full h-ull bg-black/50" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >NextJS Crypt</motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-2xl text-teal-700 max-w-xl"
                >최신 암호화 기술과 보안 기법을 학습하는 프로젝트</motion.p>

                <motion.a
                    href="/dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8 px-6 py-3 bg-blue-500 rounded-lg hover:bg-sky-400 transition"
                >시작하기</motion.a>
            </div>
        </div>
    )
}