import React, { useState, createContext, useContext, useEffect } from "react"
import { type GridSize } from "../libs/types"
import { EDITOR_DEF_CONFIG } from "../libs/config"

export type EditorConfig = {
    gridSize: GridSize
    cellSize: number
    setGridSize: React.Dispatch<React.SetStateAction<GridSize>>
    setCellSize: React.Dispatch<React.SetStateAction<number>>
}

export const EditorConfigContext = createContext<EditorConfig | null>(null)

export function useEditorConfig() {
    const ctx = useContext(EditorConfigContext)
    if (!ctx) {
        throw new Error(
            'useEditorConfig must be used inside EditorConfigProvider'
        )
    }
    return ctx
}

export function CanvasConfigProvider({ children }: { children: React.ReactNode }) {
    const [gridSize, setGridSize] = useState<GridSize>(() => {
        const stored = localStorage.getItem('gridSize')
        if (!stored) {
            return {
                rows: EDITOR_DEF_CONFIG.ROWS,
                cols: EDITOR_DEF_CONFIG.COLS
            }
        }

        try {
            return JSON.parse(stored) as GridSize
        } catch {
            return {
                rows: EDITOR_DEF_CONFIG.ROWS,
                cols: EDITOR_DEF_CONFIG.COLS
            }
        }
    })

    const [cellSize, setCellSize] = useState<number>(() => {
        const stored = localStorage.getItem('cellSize')
        return stored ? Number(stored) : EDITOR_DEF_CONFIG.CELL_SIZE
    })

    useEffect(() => {
        localStorage.setItem('gridSize', JSON.stringify(gridSize))
    }, [gridSize])

    useEffect(() => {
        localStorage.setItem('cellSize', String(cellSize))
    }, [cellSize])
    
    return (
        <EditorConfigContext.Provider 
            value={{
                gridSize,
                cellSize,
                setGridSize,
                setCellSize
            }}
        >
            {children}
        </EditorConfigContext.Provider>
    )
}