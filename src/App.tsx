import { useState, useEffect } from 'react'
import { type Tool } from './libs/types'
import { COLORS, TOOLS } from './libs/config'
import EditorCanvas from './components/EditorCanvas'
import Controls from './components/Controls'

function App() {
    const [currentColor, setCurrentColor] = useState<string>(COLORS[0])
    const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS.BRUSH)
    const [showInfo, setShowInfo] = useState<boolean>(true)
    const [isInfoMounted, setIsInfoMounted] = useState<boolean>(true)

    useEffect(() => {
    if (showInfo) {
        setIsInfoMounted(true)
    } else {
        const timeout = setTimeout(() => {
        setIsInfoMounted(false)
        }, 300)

        return () => clearTimeout(timeout)
    }
    }, [showInfo])


    return (
        <div
            className='flex flex-col items-center gap-2 w-screen h-screen select-none font-sans!'
        >
            <h1 
                style={{backgroundColor: showInfo ? 'color-mix(in oklab, var(--color-darker) /* #31393c */ 5%, transparent)' : 'transparent'}}
                onClick={() => setShowInfo(prev => !prev)} 
                className='text-3xl! flex justify-center items-center gap-1 p-2 m-2  text-darker! font-normal! cursor-pointer rounded-md hover:bg-darker/5!'
            >
                <svg width="30" height="30" className=" text-primary! animate-rotate-360 animate-duration-400">
                    <use href="/assets/sprite.svg#icon"></use>
                </svg>
                Editor Pixelart
                { showInfo ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.775l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.15-.15.325-.213T12 8.4t.375.063t.325.212l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.95q-.2 0-.375-.062t-.325-.213l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213T12 14.95"/></svg>
                }
            </h1>
            { isInfoMounted && 
                <div 
                    style={{
                        opacity: showInfo ? 1 : 0,
                        transform: showInfo ? 'translateY(0px)' : 'translateY(8px)',
                        pointerEvents: showInfo ? 'auto' : 'none',
                    }}
                    className='transition-all duration-300 ease-out border-2 border-darker/75! rounded-md gap-3 flex flex-col items-center justify-center p-4 bg-darker/5'

                >
                    <h1 className='m-0 mb-1 text-darker! text-2xl!'>Hola! Bienvenido a Editor Pixelart, una página para hacer dibujos pixelart</h1>
                    <h2 className='m-0 text-darker/90! text-xl!'>Soy&nbsp;
                        <a className='text-primary! transition-all hover:no-underline!' href='https://github.com/damicym' target='_blank'>@damicym</a>
                        &nbsp;e hice este proyecto para aprender algunas tecnologías de programación, como:
                    </h2>
                    <section className='flex gap-8 justify-center items-center'>
                        <svg width="45" height="45">
                            <use href="/assets/sprite.svg#react"></use>
                        </svg>
                        <svg width="40" height="40">
                            <use href="/assets/sprite.svg#ts"></use>
                        </svg>
                        <svg width="40" height="40">
                            <use href="/assets/sprite.svg#tailwind"></use>
                        </svg>
                        <div className='flex items-center'>
                            <svg width="40" height="40">
                                <use href="/assets/sprite.svg#html"></use>
                            </svg>
                            <span className='text-lg! text-black font-mono font-bold'>CanvasAPI</span>
                        </div>
                    </section>
                </div>
            }
            <div
                className='grid grid-cols-[1fr_auto_1fr] gap-12 items-center relative'
            >
                <EditorCanvas
                    currentColor={currentColor}
                    selectedTool={selectedTool}
                />
                <Controls
                    currentColor={currentColor}
                    setCurrentColor={setCurrentColor}
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                />
            </div>
        </div>
    )
}

export default App
