// import React, { useState, useEffect, useRef } from 'react'
import { type ColorPickerProps } from '../libs/types'
import { COLORS, TOOLS } from '../libs/config'
import clsx from "clsx"

function Controls({ currentColor, setCurrentColor, selectedTool, setSelectedTool }: ColorPickerProps) {

  return (
    <div
      className='w-max h-max absolute col-start-3 bg-dark/50 rounded-[40px] p-5! flex flex-col justify-center items-center gap-4!'
    >
      <div
        className='grid grid-cols-3 grid-rows-6 items-center justify-center place-items-center gap-4! mb-2'
      >
        {COLORS.map(color => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            type="button"
            onClick={() => setCurrentColor(color)}
            className='size-12 rounded-full! border-2 border-dark! cursor-pointer transition-all shadow-darker! shadow-xs hover:shadow-none'
          />
        ))}
      </div>
      <input
        type="color"
        value={currentColor}
        className='w-full h-18 cursor-pointer'
        style={{filter: `drop-shadow(0px 0px 5px ${currentColor})`}}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <div className='flex gap-4!'>
        <button
          className={clsx('cursor-pointer flex justify-center items-center transition-all', 
            selectedTool !== TOOLS.BRUSH ? ' hover:brightness-120' : 'drop-shadow-md drop-shadow-primary')}
          style={{color: selectedTool === TOOLS.BRUSH ? 'var(--color-primary)' : 'var(--color-darker)'}}
          onClick={() => setSelectedTool(TOOLS.BRUSH)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" /></svg>
        </button>
        <button
          className={clsx('cursor-pointer flex justify-center items-center transition-all', 
            selectedTool !== TOOLS.ERASER ? ' hover:brightness-120' : 'drop-shadow-md drop-shadow-primary')}
          style={{color: selectedTool === TOOLS.ERASER ? 'var(--color-primary)' : 'var(--color-darker)'}}
          onClick={() => setSelectedTool(TOOLS.ERASER)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.121 17.85a3 3 0 0 1 0-4.243l7.071-7.072l8.486 8.486l-3.243 3.242H20a1 1 0 1 1 0 2H6.778a3 3 0 0 1-2.121-.878L3.12 17.849zm16.97-4.243l1.415-1.415a3 3 0 0 0 0-4.242l-4.243-4.243a3 3 0 0 0-4.242 0l-1.414 1.414z" clip-rule="evenodd" /></svg>
        </button>
        <button
          className={clsx('cursor-pointer flex justify-center items-center transition-all', 
            selectedTool !== TOOLS.BUCKET ? ' hover:brightness-120' : 'drop-shadow-md drop-shadow-primary')}
          style={{color: selectedTool === TOOLS.BUCKET ? 'var(--color-primary)' : 'var(--color-darker)'}}
          onClick={() => setSelectedTool(TOOLS.BUCKET)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1.5a.5.5 0 0 0-1 0v.838c-.252.064-.49.195-.687.392L1.337 7.706a1.5 1.5 0 0 0-.026 2.096l3.62 3.8a1.5 1.5 0 0 0 2.147.027l5.068-5.068a1.5 1.5 0 0 0 0-2.122L8.434 2.73Q8.237 2.537 8 2.429zM11.293 8H2.457L7 3.457V4.5a.5.5 0 1 0 1 0v-.79l3.439 3.437a.5.5 0 0 1 0 .707zm1.628 2.222a.56.56 0 0 0-.842 0l-1.15 1.315C9.747 12.887 10.705 15 12.5 15s2.753-2.113 1.572-3.463z" /></svg>
        </button>
      </div>
    </div>
  )
}

export default Controls
