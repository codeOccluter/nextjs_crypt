export function downloadFile(filename: string, content: string) {

    const blob = new Blob([content], { type: "application/x-pem-file" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.download = filename
    a.href = url
    a.click()

    URL.revokeObjectURL(url)
}