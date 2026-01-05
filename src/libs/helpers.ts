import { type Pixel, type GridSize, type PixelGrid } from "./types"
import { GRID_PROPERTIES } from "./config"

const grid_half_width = GRID_PROPERTIES.WIDTH / 2

export function createGrid(gridSize: GridSize) {
    return Array.from({ length: gridSize.rows }, () => Array(gridSize.cols).fill(null))
}

export function drawCell(ctx: CanvasRenderingContext2D, row: number, col: number, cellSize: number, color: string) {
    const x = col * cellSize
    const y = row * cellSize
    const size = cellSize
    ctx.fillStyle = color

    ctx.fillRect(x, y, size, size)
}

export function clearCell(ctx: CanvasRenderingContext2D, row: number, col: number, cellSize: number) {
    const x = col * cellSize
    const y = row * cellSize
    ctx.clearRect(x, y, cellSize, cellSize)
    ctx.lineWidth = grid_half_width
    ctx.strokeStyle = GRID_PROPERTIES.BORDER_COLOR
    ctx.strokeRect(x, y, cellSize, cellSize)
}

export function drawGrid(ctx: CanvasRenderingContext2D, gridSize: GridSize, cellSize: number) {
    ctx.strokeStyle = GRID_PROPERTIES.BORDER_COLOR
    ctx.lineWidth = GRID_PROPERTIES.WIDTH
    for (let y = 0; y < gridSize.rows; y++) {
        for (let x = 0; x < gridSize.cols; x++) {
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    }
}

export function cloneGrid(grid: PixelGrid): PixelGrid {
  return grid.map(row => [...row])
}


export function drawAllCells(grid: PixelGrid, ctx: CanvasRenderingContext2D, gridSize: GridSize, cellSize: number) {
    for (let y = 0; y < gridSize.rows; y++) {
        for (let x = 0; x < gridSize.cols; x++) {

            const pixel = grid[y][x]
            if (pixel === null) continue

            ctx.fillStyle = pixel
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    }
}

export function fill(grid: PixelGrid, fillColor: string, gridSize: GridSize, startRow: number, startCol: number) {
    const targetColor = grid[startRow][startCol]
    if (targetColor === fillColor) return
    const stack: [number, number][] = [[startRow, startCol]]

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ] as const
    
    while (stack.length > 0) {
        const [row, col] = stack.pop()!

        if (
            row < 0 ||
            row >= gridSize.rows ||
            col < 0 ||
            col >= gridSize.cols
        ) {
            continue
        }

        if (grid[row][col] !== targetColor) continue

        grid[row][col] = fillColor

        for (const [dy, dx] of directions) {
            stack.push([row + dy, col + dx])
        }
    }

}