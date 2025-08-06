export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="m-0 p-0">
            {children}
        </div>
    )
}