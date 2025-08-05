"use client"

import "@/styles/components/layout/footer.css"
import { FaGithub, FaInstagram } from "react-icons/fa"
import { GlobeAltIcon } from "@heroicons/react/24/outline"

export default function Footer() {

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
            <div className="container mx-auto px-4 py-2 grid gap-8 md:grid-cols-3 items-center">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-xl font-bold text-white">NextJS Crypt</h2>
                    <p className="text-gray-400 text-xs">
                        현대 암호학과 보안기술 학습 프로젝트
                    </p>
                </div>

                <div className="flex-justify-center space-x-4 md:my-0">
                    <a href="/" className="hover:text-white transition">Home</a>
                    <a href="/about" className="hover:text-white transition">About</a>
                    <a href="/docs" className="hover:text-white transition">Docs</a>
                    <a href="/contact" className="hover:text-white transition">Contact</a>
                    <a href="/developer" className="hover:text-white transition">Developer</a>
                </div>

                <div className="flex justify-center md:justify-end space-x-6">
                    <a
                        href="http://github.com/"
                        target="_blank"
                        className="text-gray-400 hover:text-white transition"
                        aria-label="Github"
                    ><FaGithub size={20} /></a>
                    <a
                        href="http://instagram.com/kihunism"
                        target="_blank"
                        className="text-gray-400 hover:text-pink-500 transition"
                        aria-label="Instagram"
                    ><FaInstagram size={20} /></a>
                    <a
                        href="http://naver.com/"
                        target="_blank"
                        className="text-gray-400 hover:text-green-500 transition"
                        aria-label="Naver"
                    ><GlobeAltIcon className="h-5 w-5" /></a>
                </div>

            </div>
            <div className="border-t border-gray-800 mt-1 py-4 text-center text-xs text-gray-500">
                © 2025 NextJS Crypt — All rights reserved.
            </div>
        </footer>
    )
}