"use client"

import "@/styles/components/layout/footer.css"
import { FaGithub, FaInstagram } from "react-icons/fa"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "@/lib/i18n/i18n-client"

export default function Footer() {

    const { t } = useTranslation()

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
            <div className="container mx-auto px-4 py-2 grid gap-8 md:grid-cols-3 items-center">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-xl font-bold text-white">{`${t("footer.logo")}`}</h2>
                    <p className="text-gray-400 text-xs">
                        {`${t("footer.title")}`}
                    </p>
                </div>

                <div className="flex-justify-center space-x-4 md:my-0">
                    <a href="/" className="hover:text-white transition">{`${t("footer.footer_nav.home")}`}</a>
                    <a href="/about" className="hover:text-white transition">{`${t("footer.footer_nav.introduce")}`}</a>
                    <a href="/docs" className="hover:text-white transition">{`${t("footer.footer_nav.document")}`}</a>
                    <a href="/contact" className="hover:text-white transition">{`${t("footer.footer_nav.contact")}`}</a>
                    <a href="/developer" className="hover:text-white transition">{`${t("footer.footer_nav.developer")}`}</a>
                </div>

                <div className="flex justify-center md:justify-end space-x-6">
                    <a
                        href="https://github.com/codeOccluter"
                        target="_blank"
                        className="text-gray-400 hover:text-white transition"
                        aria-label="Github"
                    ><FaGithub size={20} /></a>
                    <a
                        href="http://instagram.com/kihunism_"
                        target="_blank"
                        className="text-gray-400 hover:text-pink-500 transition"
                        aria-label="Instagram"
                    ><FaInstagram size={20} /></a>
                    <a
                        href="https://blog.naver.com/kihoonworks"
                        target="_blank"
                        className="text-gray-400 hover:text-green-500 transition"
                        aria-label="Naver"
                    ><GlobeAltIcon className="h-5 w-5" /></a>
                </div>

            </div>
            <div className="border-t border-gray-800 mt-1 py-4 text-center text-xs text-gray-500">
                {`${t("footer.copyrighter")}`}
            </div>
        </footer>
    )
}