import { create } from "zustand"

type UIState = {
    UserQuickPanelOpen: boolean
    openUserQuickPanel: () => void
    closeUserQuickPanel: () => void
    toggleUserQuickPanel: () => void
}

export const useUserPanelStore = create<UIState>((set) => ({
    UserQuickPanelOpen: false,
    openUserQuickPanel: () => set({ UserQuickPanelOpen: true }),
    closeUserQuickPanel: () => set({ UserQuickPanelOpen: false }),
    toggleUserQuickPanel: () => set((s) => ({ UserQuickPanelOpen: !s.UserQuickPanelOpen }))
}))