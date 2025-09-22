import { create } from "zustand"

type DemoState = {
    isDemoVisible: boolean
    toggleDemo: () => void
    hideDemo: () => void
    showDemo: () => void
}

export const useDemoStore = create<DemoState>((set) => ({
    isDemoVisible: false,
    toggleDemo: () => set((state) => ({ isDemoVisible: !state.isDemoVisible })),
    hideDemo: () => set({ isDemoVisible: false }),
    showDemo: () => set({ isDemoVisible: true })
}))
