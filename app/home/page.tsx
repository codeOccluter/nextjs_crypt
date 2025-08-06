"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        initial={{ scale: 1.2, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
            src="/images/CE.jpg"
            alt="Cryptography Background"
            fill
            style={{ objectFit: "cover" }}
            priority
        />
      </motion.div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-4xl md:text-6xl font-bold mb-4"
          >NextJS Crypt</motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="text-lg md:text-2xl text-teal-700 max-w-xl"
          >최신 암호화 기술과 보안 기법을 학습하는 프로젝트11231</motion.p>

          <motion.a
              href="/dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-8 px-6 py-3 bg-blue-500 rounded-lg hover:bg-sky-400 transition"
          >시작하기</motion.a>
      </div>
    </div>
)
}
