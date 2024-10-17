import '../../styles/index.css';

import { EditorContent, useEditorState } from '@tiptap/react'
import { FC, useEffect, useRef } from 'react'
import { LinkMenu } from '@/components/menus'

import { useBlockEditor } from '@/hooks/useBlockEditor'

import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'

interface BlockEditorProps {
  data: string; // Initial content in HTML format
  onDataChange: (content: string) => void; // Function to update the content
  onDataInfo?: (words: number, characters: number) => void;
  autocomplete?: 'on' | 'off';
  autocorrect?: 'on' | 'off';
  autocapitalize?: 'on' | 'off';
}

export const BlockEditor: FC<BlockEditorProps> = ({ data, onDataChange, onDataInfo, autocomplete, autocorrect, autocapitalize }) => {
  const menuContainerRef = useRef(null)

  const editor = useBlockEditor({ data, onDataChange, autocomplete, autocorrect, autocapitalize })

  if (!editor) {
    return null
  }

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || { characters: () => 0, words: () => 0 }
      return { characters: characters(), words: words() }
    },
  })

  useEffect(() => {
    if (onDataInfo) {
      onDataInfo(words, characters)
    }
  }, [words, characters])

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
