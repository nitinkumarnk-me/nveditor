import { useEditor } from '@tiptap/react'
import type { AnyExtension, Editor } from '@tiptap/core'
import { ExtensionKit } from '@/extensions/extension-kit'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    editor: Editor | null
  }
}

interface EditorProps {
  data: string // Initial content in HTML format
  onDataChange: (content: string) => void // Function to update the content
  autocomplete?: 'on' | 'off'
  autocorrect?: 'on' | 'off'
  autocapitalize?: 'on' | 'off'
}

export const useBlockEditor = ({
  data,
  onDataChange,
  autocomplete = "off",
  autocorrect = "off",
  autocapitalize = "off"
}: EditorProps) => {
  const [initialContent, setInitialContent] = useState(data)

  const editor = useEditor(
    {
      content: initialContent,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ({ editor }) => {
        editor.commands.focus('start', { scrollIntoView: true })
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        if (onDataChange) {
          onDataChange(html)
        }
      },
      extensions: [
        ...ExtensionKit({
        }),
      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: autocomplete,
          autocorrect: autocorrect,
          autocapitalize: autocapitalize,
          class: 'min-h-full min-w-full',
        },
      },
    },
    []
  )

  useEffect(() => {
    if (editor && data !== editor.getHTML()) {
      editor.commands.setContent(data)
      setInitialContent(data)
    }
  }, [editor, data])

  window.editor = editor

  return editor
}