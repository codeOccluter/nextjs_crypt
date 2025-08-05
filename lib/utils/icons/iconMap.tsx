import { CircleStackIcon, ServerIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import { Subject } from "@/types/entities/Subject"
import { SubjectUI } from "@/types/subject/subject-ui"
import type { ReactNode } from "react"

export function mapSubjectToUI(subject: Subject): SubjectUI {

    const iconMap: Record<string, ReactNode> = {
        db: <CircleStackIcon className="w-12 h-12 text-blue-600" />,
        os: <ServerIcon className="w-12 h-12 text-green-600" />,
        algorithm: <ChartBarIcon className="w-12 h-12 text-purple-600" />,
    }

    return {
        ...subject,
        icon: iconMap[subject.id] ?? <CircleStackIcon className="w-12 h-12 text-gray-600" />
    }
}