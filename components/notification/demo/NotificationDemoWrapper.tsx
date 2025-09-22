"use client"

import { useDemoStore } from "@/stores/ui/demo.store"
import NotificationDemo from "./NotificationDemo"

export default function NotificationDemoWrapper() {
    const { isDemoVisible } = useDemoStore()
    
    return <NotificationDemo isVisible={isDemoVisible} />
}
