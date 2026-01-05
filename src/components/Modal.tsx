import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { type ModalProps } from '../libs/types'
import { EDITOR_DEF_CONFIG } from '../libs/config'
import { useEditorConfig } from './CanvasConfigProvider'

function ModalBootstrap({ show, setShow, applyModalChanges }: ModalProps) {
    const { gridSize, cellSize } = useEditorConfig()
    
    const [rowsLocal, setRowsLocal] = useState(gridSize.rows)
    const [colsLocal, setColsLocal] = useState(gridSize.cols)
    const [cellSizeLocal, setCellSizeLocal] = useState(cellSize)

    useEffect(() => {
        if (!show) return

        setRowsLocal(gridSize.rows)
        setColsLocal(gridSize.cols)
        setCellSizeLocal(cellSize)
    }, [show, gridSize, cellSize])

    const handleSubit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData: FormData = new FormData(e.currentTarget)
        const newGridRows: number = Number(formData.get('grid-rows'))
        const newGridCols: number = Number(formData.get('grid-cols'))
        const newCellSize: number = Number(formData.get('cell-size'))
        applyModalChanges({newGridRows, newGridCols, newCellSize})
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} className='font-sans'
        >
            <Modal.Header closeButton>
                <Modal.Title className='
                    text-darker! 
                    relative
                    after:content-[]
                    after:absolute
                    after:left-0
                    after:bottom-0
                    after:w-28
                    after:h-0.5
                    after:bg-primary/70!
                '>
                    Configuración de lienzo
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={(e) => handleSubit(e)}>
                <Modal.Body className='text-darker!'>
                    <div className='flex justify-center flex-col gap-3'>
                        <fieldset className='flex justify-between items-center gap-1'>
                            <legend className='text-lg! flex items-center gap-1.5'>Cuadrícula</legend>
                            <div className='flex justify-center items-center gap-1'>
                                <input 
                                    name='grid-rows' 
                                    type='number' 
                                    min='6'
                                    max='20'
                                    value={rowsLocal}
                                    onChange={e => setRowsLocal(Number(e.target.value))}
                                    className='pl-3 w-14 h-6 text-center text-primary! border rounded-md'
                                ></input>
                                <span className='pointer-events-none select-none'>x</span>
                                <input 
                                    name='grid-cols' 
                                    type='number' 
                                    min='6'
                                    max='20'
                                    value={colsLocal}
                                    onChange={e => setColsLocal(Number(e.target.value))}
                                    className='pl-3 w-14 h-6 text-center text-primary! border rounded-md'
                                ></input>
                            </div>
                        </fieldset>
                        <fieldset className='flex justify-between items-center'>
                            <legend className='text-lg! flex items-center gap-1.5'>Tamaño de celda</legend>
                            <div className='flex justify-between items-center gap-1'>
                                <input 
                                    name='cell-size' 
                                    type='number' 
                                    min='20'
                                    max='100'
                                    value={cellSizeLocal}
                                    onChange={e => setCellSizeLocal(Number(e.target.value))}
                                    className='pl-3 w-14 h-6 text-center text-primary! border rounded-md'
                                ></input>
                                <span className='pointer-events-none select-none'>px</span>
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer
                >
                    <p className='text-dark! text-sm font-medium text-left w-full m-0 mb-2'>Al aplicar los cambios se perderá el dibujo del lienzo actual</p>
                    <Button 
                        variant="primary" 
                        type='button' 
                        className='enabled:hover:brightness-[1.15] enabled:hover:bg-primary/15! enabled:active:brightness-[0.925] pointer-events-auto! enabled:cursor-pointer  disabled:cursor-not-allowed!
                            transition-all bg-transparent! text-primary! border-2 border-primary! relative mb-3 text-lg! flex! flex-col! justify-center! items-center!'
                        disabled={
                            gridSize.rows === EDITOR_DEF_CONFIG.ROWS && 
                            gridSize.cols === EDITOR_DEF_CONFIG.COLS && 
                            cellSize === EDITOR_DEF_CONFIG.CELL_SIZE
                        }
                        onClick={() => {
                            applyModalChanges({ 
                                newGridRows: EDITOR_DEF_CONFIG.ROWS, 
                                newGridCols: EDITOR_DEF_CONFIG.COLS,
                                newCellSize: EDITOR_DEF_CONFIG.CELL_SIZE
                            })
                        }}
                    >
                        Restablecer predeterminados
                    </Button>
                    <Button 
                        variant="primary" 
                        type='submit' 
                        className='enabled:hover:brightness-[1.15] enabled:active:brightness-[0.925] pointer-events-auto! enabled:cursor-pointer  disabled:cursor-not-allowed!
                            transition-all bg-primary! border-2 border-primary! relative mb-3 text-lg! flex! flex-col! justify-center! items-center!'
                        disabled={
                            gridSize.rows === rowsLocal && 
                            gridSize.cols === colsLocal && 
                            cellSize === cellSizeLocal
                        }
                    >
                        Aplicar cambios
                        <span 
                            className='font-normal text-base! text-primary/70! absolute flex -bottom-6 pointer-events-none'
                        >
                            (<span>{rowsLocal * cellSize}</span>px x&nbsp;<span>{colsLocal * cellSize}</span>px)
                        </span>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalBootstrap;