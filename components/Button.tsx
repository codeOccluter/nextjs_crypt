
type ButtonProps = {
    children: React.ReactNode
    onClick: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
    return <button
        className="btn"
        onClick={onClick}
    >{children}</button>
}