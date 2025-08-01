export const truncateText = (text: string, maxLength = 20): string => {
    
    if(!text) return ""

    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}