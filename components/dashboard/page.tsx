import { truncateText } from "@/lib/utils/text"
import { ReactNode } from "react"

import Card from "../common/card/Card"
import subjects from "@/data/subject"

import { 
    CircleStackIcon, 
    ServerIcon, 
    ChartBarIcon,
} from "@heroicons/react/24/outline"


const iconMap: Record<string, ReactNode> = {
    ServerIcon: <ServerIcon className="w-12 h-12" />,
    ChartBarIcon: <ChartBarIcon className="w-12 h-12" />,
    DatabaseIcon: <CircleStackIcon className="w-12 h-12" />
}

export default function Dashboard() {

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject: any) => (
                <Card 
                    key={subject.id}
                    title={subject.name}
                    description={truncateText(subject.description, 20)}
                    href={`/subjects/${subject.id}`}
                    icon={iconMap[subject.icon]}
                    variant="dashboard"
                />
            ))}
        </div>
    )
}