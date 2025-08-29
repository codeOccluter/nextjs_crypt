// client component - /[locale] 페이지
"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import { useState, useTransition, Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FaSpinner } from "react-icons/fa"
import { BsGlobe2 } from "react-icons/bs"
import Typewriter from "@/components/ui/common/typewriter/Typewriter"

export default function LandingPageClient({ locale }: { locale: string }) {

  	const [isLeaving, setIsLeaving] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isPending, startTransition] = useTransition()
  	
    const { t } = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleStart = () => {

        const target = `/${locale}/main`
        if(window.location.pathname === target) return

        setIsLeaving(true)
        setIsLoading(true)

        setTimeout(() => {
            router.push(target)
        }, 1500)
   }

   const toggleLocale = locale == "en" ? "ko" : "en"
   const langLabel = locale == "en" ? t("home.lang.toKo") : t("home.lang.toEn")

   const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { straggerChildren: 0.12 } }
   }

   const item = {
        hidden: { opacity: 0, y: 12 },
        show: { opactity: 1, y: 0, transition: { duration: 0.25 } }
   }

   const handleToggleLocale = () => {

        const base = pathname?.replace(/^\/(ko|en)/, `/${toggleLocale}`) ?? `/${toggleLocale}`
        const qs = searchParams?.toString()
        const nextUrl = qs ? `${base}?${qs}` : base

        router.replace(nextUrl)
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
                    <div className="absolute top-4 right-4 z-20">
                        <button
                            onClick={handleToggleLocale} 
                            className="
                                    inline-flex h-10 px-4
                                    items-center gap-2
                                    rounded-lg
                                    bg-white/95
                                    text-black font-semibold
                                    shadow-lg
                                    border border-gray-300
                                    text-base leading-none
                                    transition-transform transition-colors duration-200
                                    hover:bg-white hover:border-blue-500 hover:shadow-blue-300 hover:scale-110
                                    active:scale-95
                                    "
                            style={{ fontSize: "1rem" }}
                            disabled={isPending}
                        >
                            <motion.span
                                whileHover={{ rotate: 12 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="relative top-[1px]"
                            >
                                <BsGlobe2 
                                    className="text-blue-500 text-[1.125rem] relative top-[0.5px] shrink-0" 
                                />
                            </motion.span>
                            <div className="relative h-5 overflow-hidden min-w-[35px]">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={langLabel}
                                        initial={{ y:10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute inset-0 flex items-center"
                                    >{langLabel}</motion.span>
                                </AnimatePresence>
                            </div>
                            {/* {langLabel} */}
                            
                        </button>
                    </div>

					<motion.div
						initial={{ scale: 1.05 }}
						animate={{ scale: 1 }}
						transition={{ duration: 15, ease: "linear" }}
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
				
						<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="text-4xl md:text-6xl font-bold mb-6"
                            >
                                <Typewriter 
                                    words={t("home.title")}
                                    loop={false}
                                    cursor
                                    className="text-white"
                                />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.6, duration: 1 }}
                                className="text-lg md:text-2xl text-teal-400 max-w-xl mb-10"
                            >{t("home.subtitle")}</motion.p>

                            <motion.button
                                onClick={handleStart}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 1 }}
                                disabled={isLoading || isPending}
                                className="relative
                                            inline-flex h-10 px-4 items-center gap-2 rounded-lg bg-sky-500 text-white font-semibold
                                            shadow-lg border border-gray-200 transition-all duration-200
                                            hover:border-blue-500 hover:shadow-blue-300 hover:scale-110
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
                                        ">
                            <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-sky-300/0 hover:ring-sky-200/50" />
							{isLoading || isPending ? (
								<>
									<FaSpinner className="animate-spin" />
									{t("home.button.loading")}
								</>
							) : ( `${t("home.button.start")}` )}
							
						</motion.button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
)
}