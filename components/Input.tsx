type InputProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export default function Input({ value, onChange, placeholder }: InputProps) {

    return (
        <input
            className="input"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}