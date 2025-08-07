"use client"

import { useTranslation } from "@/i18n"
import { useParams } from "next/navigation"
import { useState, useTransition, Suspense } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaSpinner } from "react-icons/fa"
import Typewriter from "@/components/common/typewriter/Typewriter"

export default function LandingPage() {

	console.log("렌더링 됨============================================")
    const { t } = useTranslation('common')
    const params = useParams()

  	const [isLeaving, setIsLeaving] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isPending, startTransition] = useTransition()
  	const router = useRouter()


  const handleStart = () => {
    	setIsLeaving(true)
		setIsLoading(true)

        const locale = (params?.locale as string) || 'ko'

    	setTimeout(() => {
      		router.push(`/ko/main`)
    	}, 1500)
  }

  	return (
		<AnimatePresence>
			{!isLeaving && (
				<motion.div
					className="fixed inset-0 overflow-hidden"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8 }}
				>
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
					<div className="absolute w-full h-full bg-black/50"/>
						<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, duration: 1 }}
							className="text-4xl md:text-6xl font-bold mb-4"
						>
							<Typewriter 
								words={["NextJS Crypt", "Moder Cryptography", "Secure Your Future"]}
								loop={false}
								cursor
								className="text-white"
							/>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.6, duration: 1 }}
							className="text-lg md:text-2xl text-teal-700 max-w-xl"
						>{t("title")}</motion.p>

						<motion.button
							onClick={handleStart}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2, duration: 1 }}
							disabled={isLoading || isPending}
							className="mt-8 px-6 py-3 bg-blue-500 rounded-lg hover:bg-sky-400 transition disabled:opacity-50 flex items-center gap-2"
						>
							{isLoading || isPending ? (
								<>
									<FaSpinner className="animate-spin" />
									이동 중...
								</>
							) : (
								"시작하기"
							)}
							
						</motion.button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
)
}