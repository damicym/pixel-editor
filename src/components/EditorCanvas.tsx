import React, { useState, useEffect, useRef } from 'react'
import { type Pixel, type CanvasProps, type GridSize, type Tool, type ApplyModalChangesProps, type PixelGrid } from '../libs/types'
import { TOOLS, EDITOR_DEF_CONFIG } from '../libs/config'
import { createGrid, drawGrid, cloneGrid, drawAllCells, fill } from '../libs/helpers'
import ModalBootstrap from './Modal'
import { useEditorConfig } from './CanvasConfigProvider'

function EditorCanvas({ currentColor, selectedTool }: CanvasProps) {
    const { gridSize, cellSize, setGridSize, setCellSize } = useEditorConfig()

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D>(null)
    const [gridContent, setGridContent] = useState<PixelGrid>(createGrid(gridSize))
    const tempGridRef = useRef<PixelGrid | null>(null)
    const paintMode = useRef<Tool>(TOOLS.BRUSH)
    const isPainting = useRef(false)
    const [showModal, setShowModal] = useState(false)
    const hasUnsavedChangesRef = useRef(false)

    const historyGrid = useRef<PixelGrid[] | null>([])
    const futureGrid = useRef<PixelGrid[] | null>([])

    const handlePaint = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(!isPainting.current) return
        if(!paintMode.current) return
        const grid = tempGridRef.current
        if (!grid) return
        const canvas = canvasRef.current
        const ctx = ctxRef.current
        if (!canvas || !ctx) return

        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const row = Math.floor(mouseY / cellSize)
        const col = Math.floor(mouseX / cellSize)
        if (col < 0 || col >= gridSize.cols || row < 0 || row >= gridSize.rows) return
        
        const currentPixel: Pixel = grid[row][col]
        if (paintMode.current === TOOLS.BRUSH) {
            if (currentPixel === currentColor) return
            grid[row][col] = currentColor
        } else if (paintMode.current === TOOLS.ERASER) {
            if (currentPixel === null) return
            grid[row][col] = null
        } else if (paintMode.current === TOOLS.BUCKET) {
           fill(grid, currentColor, gridSize, row, col)
        }

        if(grid !== gridContent) redrawCanvas(grid, canvas, ctx, gridSize, cellSize)
    }

    useEffect(() => {
        setupCanvas()

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if(
                hasUnsavedChangesRef.current === false
                && historyGrid.current && historyGrid.current.length === 0
                && futureGrid.current && futureGrid.current.length === 0
            ) return
            e.preventDefault()
            e.returnValue = ''
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = ctxRef.current
        if (!canvas || !ctx) return
        canvas.width = gridSize.cols * cellSize
        canvas.height = gridSize.rows * cellSize
        ctxRef.current = ctx
        setGridContent(createGrid(gridSize))
        redrawCanvas(gridContent, canvas, ctx, gridSize, cellSize)
    }, [gridSize, cellSize])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = ctxRef.current
        if (!canvas || !ctx) return
        hasUnsavedChangesRef.current = !gridContent.every(row =>
            row.every(cell => cell === null)
        )
        redrawCanvas(gridContent, canvas, ctx, gridSize, cellSize)
    }, [gridContent])

    function redrawCanvas(gridContent: PixelGrid, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gridSize: GridSize, cellSize: number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid(ctx, gridSize, cellSize)
        drawAllCells(gridContent, ctx, gridSize, cellSize)
    }

    const resetGrid = () => {
        historyGrid.current = []
        futureGrid.current = []
        const newGrid = createGrid(gridSize)
        setGridContent(newGrid)

        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid(ctx, gridSize, cellSize)
    }

    function setupCanvas() {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return


        canvas.width = gridSize.cols * cellSize
        canvas.height = gridSize.rows * cellSize
        ctxRef.current = ctx
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if(e.button === 1) return
        isPainting.current = true

        if(selectedTool !== TOOLS.BRUSH) {
            paintMode.current = selectedTool
        } else {
            paintMode.current =
            e.button === 2 ? TOOLS.ERASER : TOOLS.BRUSH
        }
        tempGridRef.current = cloneGrid(gridContent)

        handlePaint(e)
    }

    const finishPainting = () => {
        isPainting.current = false
        paintMode.current = null
        if (tempGridRef.current && tempGridRef.current !== gridContent) {
            if(historyGrid.current) {
                historyGrid.current.push(cloneGrid(gridContent))
                if (historyGrid.current.length > 50) {
                   historyGrid.current.shift()
                }
            }
            if(futureGrid.current) futureGrid.current.length = 0
            setGridContent(tempGridRef.current)
            tempGridRef.current = null
        }
    }

    function undo() {
        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas) return
        if(!historyGrid.current || !futureGrid.current) return
        if (historyGrid.current.length === 0) return

        futureGrid.current.push(cloneGrid(gridContent))
        setGridContent(historyGrid.current.pop()!)
    }

    function redo() {
        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas) return
        if(!historyGrid.current || !futureGrid.current) return
        if (futureGrid.current.length === 0) return

        historyGrid.current.push(cloneGrid(gridContent))
        if (historyGrid.current.length > 50) {
           historyGrid.current.shift()
        }
        setGridContent(futureGrid.current.pop()!)
    }

    const applyModalChanges = ({newGridRows, newGridCols, newCellSize}: ApplyModalChangesProps) => {
        historyGrid.current = []
        futureGrid.current = []
        const newGridSize: GridSize = { rows: newGridRows, cols: newGridCols }
        setCellSize(newCellSize)
        setGridSize(newGridSize)
        setGridContent(createGrid(newGridSize))
        setShowModal(false)
    }

    const handleDownload = () => {
        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas) return
        
        const exportCanvas = document.createElement('canvas')
        exportCanvas.width = canvas.width
        exportCanvas.height = canvas.height

        const exportCtx = exportCanvas.getContext('2d')
        if (!exportCtx) return

        drawAllCells(gridContent, exportCtx, gridSize, cellSize)
        
        exportCanvas.toBlob(blob => {
            if (!blob) return

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'pixelart.png'
            link.click()

            URL.revokeObjectURL(url)
        }, 'image/png')

    }

    return (
        <div className='relative flex flex-col items-center col-start-2 mt-18'>

            <div className='absolute -top-8! flex gap-1! w-full px-1 items-center justify-between'>
                <div className='flex gap-1! items-center'>
                    <button className='cursor-pointer transition-all hover:brightness-150' onClick={handleDownload}>
                        <svg width="30" height="30" className='text-dark!'>
                            <use href="src/assets/sprite.svg#download"></use>
                        </svg>
                    </button>
                    <button className='cursor-pointer transition-all hover:brightness-150' onClick={() => setShowModal(true)}>
                        <svg width="27" height="27" className='text-dark!'>
                            <use href="src/assets/sprite.svg#settings"></use>
                        </svg>
                    </button>
                    <p className='text-dark! pointer-events-none m-0!'>
                        {gridSize.rows} x {gridSize.cols} ({gridSize.rows * cellSize}px x {gridSize.cols * cellSize}px)
                    </p>
                </div>
                <div className='flex gap-1! items-center'>
                    <button 
                        className='transition-all enabled:cursor-pointer disabled:cursor-not-allowed enabled:hover:brightness-125 disabled:opacity-60'
                        onClick={undo} 
                        disabled={!historyGrid.current || historyGrid.current.length === 0}
                    >
                        <svg className='text-dark!' width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 19v-2h7.1q1.575 0 2.738-1T18 13.5T16.838 11T14.1 10H7.8l2.6 2.6L9 14L4 9l5-5l1.4 1.4L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5t-1.737 3.925T14.1 19z"/></svg>
                    </button>
                    <button 
                        className='transition-all enabled:cursor-pointer disabled:cursor-not-allowed enabled:hover:brightness-125 disabled:opacity-60'
                        onClick={redo} 
                        disabled={!futureGrid.current || futureGrid.current.length === 0}
                    >
                        <svg className='text-dark!' width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9.9 19q-2.425 0-4.163-1.575T4 13.5t1.738-3.925T9.9 8h6.3l-2.6-2.6L15 4l5 5l-5 5l-1.4-1.4l2.6-2.6H9.9q-1.575 0-2.738 1T6 13.5T7.163 16T9.9 17H17v2z"/></svg>
                    </button> 
                    <button 
                        disabled={gridContent.every(row => row.every(cell => cell === null))}
                        className='transition-all enabled:cursor-pointer disabled:cursor-not-allowed enabled:hover:brightness-125 disabled:opacity-60'
                        onClick={() => { if (confirm("¿Estás seguro/a de que querés reiniciar el lienzo?")) { resetGrid() } }}
                    >
                        <svg width="25" height="25" className='text-dark!'>
                            <use href="src/assets/sprite.svg#reset"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                className='flex rounded-md bg-darker'
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseUp={finishPainting}
                onMouseMove={(e) => handlePaint(e)}
                onMouseLeave={finishPainting}
                onContextMenu={(e) => e.preventDefault()}
            >
            </canvas>

            <ModalBootstrap
                show={showModal}
                setShow={setShowModal}
                applyModalChanges={applyModalChanges}
            />
        </div>
    )
}

export default EditorCanvas