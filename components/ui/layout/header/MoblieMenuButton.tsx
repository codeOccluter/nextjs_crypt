"use client"

export function HeaderMoblieMenuButton({ open, onOpen }: { open: boolean, onOpen: () => void }) {
    return (
        <button
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded md:hidden hover:bg-white/10"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={onOpen}
        >
            <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-white"></span>
                <span className="block h-0.5 w-6 bg-white"></span>
                <span className="block h-0.5 w-6 bg-white"></span>
            </div>
        </button>
    )
}