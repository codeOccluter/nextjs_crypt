export default function TeamShowcase({
    members,
}: {
    members: { 
        name: string
        role: string
        bio?: string
        avatar?: string 
}[]
}) {
    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">팀 소개</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {members.map((m) => (
                    <div
                        key={m.name}
                        className="flex items-center gap-4 rounded-2xl border border-black/10 dark:border-white/10 p-5"
                    >
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white grid place-items-center font-bold">
                            {m.avatar ? (
                                // 이미지 사용 시 <Image />로 교체
                                <span>IMG</span>
                            ) : (
                                <span>{m.name.slice(0, 1)}</span>
                            )}
                        </div>
                        <div>
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-sm text-gray-500">{m.role}</div>
                            {m.bio && <p className="text-sm text-gray-600 dark:text-gray-300">{m.bio}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
