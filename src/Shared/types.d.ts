type ContextType<T> = {
    items: T[]
    addItem: (item: T) => void
    updateItem: (id: number) => void
    removeItem: (id: number) => void
}