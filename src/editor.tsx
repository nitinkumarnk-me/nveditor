'use client'
import './globals.css';

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { BlockEditor } from './components/BlockEditor'
import { Surface } from './components/ui/Surface'
import { Toolbar } from './components/ui/Toolbar'
import { Icon } from './components/ui/Icon'

import 'cal-sans'
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import 'iframe-resizer/js/iframeResizer.contentWindow'

const useDarkmode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => setIsDarkMode(mediaQuery.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    const toggleDarkMode = useCallback(() => setIsDarkMode(isDark => !isDark), [])
    const lightMode = useCallback(() => setIsDarkMode(false), [])
    const darkMode = useCallback(() => setIsDarkMode(true), [])

    return {
        isDarkMode,
        toggleDarkMode,
        lightMode,
        darkMode,
    }
}

declare global {
    interface document {
        body: HTMLElement
    }
}

interface NVEditorProps {
    data: string; // Initial content in HTML format
    onDataChange: (content: string) => void; // Function to update the content
    onDataInfo?: (words: number, characters: number) => void
    isDarkModeSwitcherEnable?: boolean;
    autocomplete?: 'on' | 'off';
    autocorrect?: 'on' | 'off';
    autocapitalize?: 'on' | 'off';
}

export default function NVEditor({ data, onDataChange, onDataInfo, autocomplete = "off", autocorrect = "off", autocapitalize = "off", isDarkModeSwitcherEnable = false }: NVEditorProps) {
    const { isDarkMode, darkMode, lightMode } = useDarkmode()

    const DarkModeSwitcher = createPortal(
        <Surface className="flex items-center gap-1 fixed bottom-6 right-6 z-[99999] p-1">
            <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
                <Icon name="Sun" />
            </Toolbar.Button>
            <Toolbar.Button onClick={darkMode} active={isDarkMode}>
                <Icon name="Moon" />
            </Toolbar.Button>
        </Surface>,
        document?.body
    )

    return (
        <>
            {isDarkModeSwitcherEnable == true && DarkModeSwitcher}
            <BlockEditor data={data} onDataChange={onDataChange} onDataInfo={onDataInfo} autocomplete={autocomplete} autocorrect={autocorrect} autocapitalize={autocapitalize} />
        </>
    )
}