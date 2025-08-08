// 서버 컴포넌트에서만 사용가능한 i18n
// 파일 시스템 접근
import fs from "fs"
import path from "path"

type locale = "ko" | "en"

export function getTranslations(locale: locale) {

    const filePath = path.join(process.cwd(), "public", "locales", `${locale}.json`)
    const fileContents = fs.readFileSync(filePath, "utf-8")
    const jsonData = JSON.parse(fileContents)

    function t(pathStr: string) {
        return pathStr.split(".").reduce((acc, key) => acc?.[key], jsonData) || pathStr
    }

    return { t }
}