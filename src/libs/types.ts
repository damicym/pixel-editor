import { TOOLS } from "./config"

export type Pixel = string | null

export type  PixelGrid = Pixel[][]

export type GridSize = { rows: number, cols: number }

export type CanvasProps = {
    currentColor: string
    selectedTool: Tool
}

export type ColorPickerProps = {
    currentColor: string
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>
    selectedTool: Tool
    setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>
}

export type ToolPickerProps = {
    selectedTool: Tool
    setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>
}

export type Tool = (typeof TOOLS)[keyof typeof TOOLS] | null

export type ModalProps = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    applyModalChanges: ({}: ApplyModalChangesProps) => void
}

export type ApplyModalChangesProps = {
    newGridRows: number
    newGridCols: number
    newCellSize: number
}