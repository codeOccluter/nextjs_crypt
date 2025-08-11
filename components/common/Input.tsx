"use client"
// 공용 Input 컴포넌트

type Props = {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
    placeholder?: string
}

export default function Input({ 
    label, 
    value, 
    onChange, 
    type = "text", 
    placeholder 
}: Props) {

    return (
        <label className="block">
            <span className="block text-sm text-white/90">{label}</span>
            <input 
                className=" mt-1 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2
                            text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-sky-400"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type={type}
                placeholder={placeholder}
            />
        </label>
    )
}