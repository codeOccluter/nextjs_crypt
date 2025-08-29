export function toGuestNickname(guestId: string | undefined, guestIdx: number | undefined): string {

    const uuid4 = guestId?.replace(/-/g,"").slice(0, 4).toUpperCase()
    const finalNickname = `Guest_${uuid4}${guestIdx}`

    return finalNickname
}

export function toGuestTempNickname(nickname: string | undefined): string {

    const tempNickname = nickname ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`

    return tempNickname
}