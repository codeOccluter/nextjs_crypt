type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

    if(!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-content relative">
                <button
                    className="absolute top-2 right-3 text-xl"
                    onClick={onClose}
                >X</button>
                {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    )
}