"use client"

export default function GuestPanel({
    onEnter
}: { onEnter: () => void }) {

    return (
        <div className="space-y-4">
            <p className="text-white/80 text-sm">
                게스트로 입장하면 일부 기능이 제한됩니다. 임시 아이디가 발급되고 24시간 후 자동 삭제됩니다.
            </p>
            <button
                onClick={onEnter}
                className=" inline-flex h-10 w-full items-center justify-center
                            roundeld-lg bg-indigo-500 px-4 font-semibold text-white
                            shadow-lg hover:bg-indigo-600 active:scale-95 transition" 
            >게스트로 입장</button>
        </div>
    )
}