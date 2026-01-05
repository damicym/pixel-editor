import { type ToolPickerProps } from '../libs/types'
import { TOOLS } from '../libs/config'

function ToolPicker({ selectedTool, setSelectedTool }: ToolPickerProps) {

  return (
    <div
      className='w-max h-max absolute col-start-1 bg-dark/50 flex flex-col justify-center items-center gap-4'
    >
      <button
        onClick={() => setSelectedTool(TOOLS.BRUSH)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>
      </button>
      <button
        onClick={() => setSelectedTool(TOOLS.ERASER)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.121 17.85a3 3 0 0 1 0-4.243l7.071-7.072l8.486 8.486l-3.243 3.242H20a1 1 0 1 1 0 2H6.778a3 3 0 0 1-2.121-.878L3.12 17.849zm16.97-4.243l1.415-1.415a3 3 0 0 0 0-4.242l-4.243-4.243a3 3 0 0 0-4.242 0l-1.414 1.414z" clip-rule="evenodd"/></svg>
      </button>
      <button
        onClick={() => setSelectedTool(TOOLS.BUCKET)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16"><path fill="currentColor" d="M8 1.5a.5.5 0 0 0-1 0v.838c-.252.064-.49.195-.687.392L1.337 7.706a1.5 1.5 0 0 0-.026 2.096l3.62 3.8a1.5 1.5 0 0 0 2.147.027l5.068-5.068a1.5 1.5 0 0 0 0-2.122L8.434 2.73Q8.237 2.537 8 2.429zM11.293 8H2.457L7 3.457V4.5a.5.5 0 1 0 1 0v-.79l3.439 3.437a.5.5 0 0 1 0 .707zm1.628 2.222a.56.56 0 0 0-.842 0l-1.15 1.315C9.747 12.887 10.705 15 12.5 15s2.753-2.113 1.572-3.463z"/></svg>
      </button>
    </div>
  )
}

export default ToolPicker
