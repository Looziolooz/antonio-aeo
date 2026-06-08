'use client'

import { useState, useEffect, useRef, type DragEvent, type ChangeEvent } from 'react'
import type { Block, BoardCard, ColumnType, TableColumn, TableRow, Page, Workspace } from '@/data/types'
import { defaultPages } from '@/data/pagine'

const STORAGE_KEY = 'antonio-aeo-workspace'


function genId() {
  return Math.random().toString(36).substring(2, 10)
}

const blockIcons: Record<string, string> = {
  heading: '#',
  subheading: '›',
  text: '·',
  todo: '○',
  file: '📎',
  divider: '—',
  'query-group': '?',
  'task-group': '◻',
  sticky: '📌',
}

const defaultAuthors = ['Antonio', 'Team', 'AI']

// --- Rich text rendering for `text` blocks -------------------------------
// A markdown table separator row is made only of pipes, dashes, colons and
// spaces and contains at least one dash, e.g. |------------|--------------|
function isTableSeparator(line: string): boolean {
  const t = line.trim()
  return t.includes('-') && /^[|\s:-]+$/.test(t)
}

function splitRow(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
}

function renderMarkdownTable(lines: string[], key: string): React.ReactNode {
  const hasHeader = lines.length > 1 && isTableSeparator(lines[1])
  const headerCells = hasHeader ? splitRow(lines[0]) : null
  const rows = lines
    .filter((l, i) => !isTableSeparator(l) && !(hasHeader && i === 0))
    .map(splitRow)
  return (
    <div key={key} className="overflow-x-auto my-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <table className="w-full text-xs sm:text-sm border-collapse">
        {headerCells && (
          <thead>
            <tr>
              {headerCells.map((c, i) => (
                <th key={i} className="bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 text-left font-semibold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700 whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="even:bg-zinc-50 dark:even:bg-zinc-800/40 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              {r.map((c, ci) => (
                <td key={ci} className="px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Renders a text block's content: markdown tables become real tables, blank
// lines become spacing, every other line keeps its own line break.
function renderRichText(content: string): React.ReactNode {
  const lines = content.split('\n')
  const out: React.ReactNode[] = []
  let i = 0
  let k = 0
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|')) {
      const tbl: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) { tbl.push(lines[i]); i++ }
      if (tbl.some(isTableSeparator)) {
        out.push(renderMarkdownTable(tbl, `tbl-${k++}`))
      } else {
        tbl.forEach(t => out.push(<div key={`row-${k++}`}>{t}</div>))
      }
    } else {
      const line = lines[i]
      out.push(line.trim() === '' ? <div key={`gap-${k++}`} className="h-2" /> : <div key={`ln-${k++}`}>{line}</div>)
      i++
    }
  }
  return <>{out}</>
}

export default function Workspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [addingBlock, setAddingBlock] = useState<string | null>(null)
  const [commentingBlock, setCommentingBlock] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [editBlockContent, setEditBlockContent] = useState('')
  const [renamingPage, setRenamingPage] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [editingCardTitle, setEditingCardTitle] = useState<string | null>(null)
  const [editCardTitleValue, setEditCardTitleValue] = useState('')
  const [editingCardDesc, setEditingCardDesc] = useState<string | null>(null)
  const [editCardDescValue, setEditCardDescValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [targetBlockForFile, setTargetBlockForFile] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('aeo-dark') === 'true'
      document.documentElement.classList.toggle('dark', isDark)
      return isDark
    }
    return false
  })
  const [slashMenu, setSlashMenu] = useState<string | null>(null)
  const [slashValue, setSlashValue] = useState('')
  const [iconPicker, setIconPicker] = useState<string | null>(null)

  const pageIcons = ['◻', '📋', '🔄', '🤖', '⚡', '◆', '🧰', '📎', '▦', '📝', '🎯', '📊', '🗂️', '📌', '⭐', '🔧', '💡', '🎨', '📈', '🗓️', '📁', '🔍', '📚', '✍️', '🎬', '📸', '🌍', '🏖️', '💍', '🎀']

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('aeo-dark', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setWorkspace({ pages: defaultPages, activePage: 'page-overview' })
    } catch {
      setWorkspace({ pages: defaultPages, activePage: 'page-overview' })
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded && workspace) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace))
    }
  }, [workspace, loaded])

  function save(fn: (w: Workspace) => Workspace) {
    setWorkspace(prev => prev ? fn(prev) : prev)
  }

  const activePage = workspace?.pages.find(p => p.id === workspace.activePage) ?? null

  function updateBlock(pageId: string, blockId: string, fn: (b: Block) => Block) {
    save(w => {
      const oldBlock = findBlock(w.pages.find(p => p.id === pageId)?.blocks || [], blockId)
      const newBlock = fn(oldBlock || { id: blockId, type: 'todo', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] })
      const cardId = oldBlock?.cardId || newBlock.cardId
      return {
        ...w,
        pages: w.pages.map(p => ({
          ...p,
          blocks: p.id === pageId ? mapBlocks(p.blocks, blockId, fn) : p.blocks,
          boardData: cardId && p.boardData ? p.boardData.map(col => ({
            ...col,
            cards: col.cards.map(c => c.id === cardId ? { ...c, done: newBlock.done } : c),
          })) : p.boardData,
        })),
      }
    })
  }

  function mapBlocks(blocks: Block[], id: string, fn: (b: Block) => Block): Block[] {
    return blocks.map(b => {
      if (b.id === id) return fn(b)
      if (b.children.length) return { ...b, children: mapBlocks(b.children, id, fn) }
      return b
    })
  }

  function findBlock(blocks: Block[], id: string): Block | null {
    for (const b of blocks) {
      if (b.id === id) return b
      if (b.children.length) {
        const found = findBlock(b.children, id)
        if (found) return found
      }
    }
    return null
  }

  function addPage() {
    const id = 'page-' + genId()
    save(w => ({
      ...w,
      pages: [...w.pages, { id, title: 'Nuova pagina', icon: '📄', section: 'spazio-libero', view: 'blocks', blocks: [{ id: 'b-' + genId(), type: 'heading', content: 'Nuova pagina', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] }] }],
      activePage: id,
    }))
    setEditingPage(id)
    setEditTitle('Nuova pagina')
  }

  function deletePage(id: string) {
    save(w => {
      const filtered = w.pages.filter(p => p.id !== id)
      return {
        ...w,
        pages: filtered,
        activePage: w.activePage === id ? (filtered[0]?.id ?? '') : w.activePage,
      }
    })
  }

  function duplicatePage(id: string) {
    const page = workspace?.pages.find(p => p.id === id)
    if (!page) return
    const newId = 'page-' + genId()
    save(w => ({
      ...w,
      pages: [...w.pages, { ...JSON.parse(JSON.stringify(page)), id: newId, title: page.title + ' (copia)' }],
      activePage: newId,
    }))
  }

  function addBlockToPage(pageId: string, type: Block['type'], afterId?: string) {
    const newBlock: Block = {
      id: 'b-' + genId(),
      type,
      content: type === 'heading' ? 'Nuovo heading' : type === 'subheading' ? 'Nuovo subheading' : type === 'divider' ? '' : type === 'todo' ? 'Nuovo task' : type === 'task-group' ? 'Nuovo gruppo task' : type === 'query-group' ? 'Nuovo gruppo query' : '',
      done: false,
      comments: [],
      fileName: '', fileData: '', fileType: '',
      collapsed: false,
      children: [],
    }
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        if (!afterId) return { ...p, blocks: [...p.blocks, newBlock] }
        const idx = p.blocks.findIndex(b => b.id === afterId)
        const blocks = [...p.blocks]
        blocks.splice(idx + 1, 0, newBlock)
        return { ...p, blocks }
      }),
    }))
    setAddingBlock(null)
  }

  function removeBlock(pageId: string, blockId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? { ...p, blocks: removeInBlocks(p.blocks, blockId) } : p),
    }))
  }

  function removeInBlocks(blocks: Block[], id: string): Block[] {
    return blocks.filter(b => {
      if (b.id === id) return false
      if (b.children.length) b.children = removeInBlocks(b.children, id)
      return true
    })
  }

  function moveBlock(pageId: string, blockId: string, direction: 'up' | 'down') {
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        const idx = p.blocks.findIndex(b => b.id === blockId)
        if (idx === -1) return p
        const blocks = [...p.blocks]
        const target = direction === 'up' ? idx - 1 : idx + 1
        if (target < 0 || target >= blocks.length) return p
        ;[blocks[idx], blocks[target]] = [blocks[target], blocks[idx]]
        return { ...p, blocks }
      }),
    }))
  }

  function handleFileUpload(pageId: string, blockId: string | null, file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      const newBlock: Block = {
        id: 'b-' + genId(),
        type: 'file',
        content: file.name,
        done: false,
        comments: [],
        fileName: file.name,
        fileData: data,
        fileType: file.type,
        collapsed: false,
        children: [],
      }
      save(w => ({
        ...w,
        pages: w.pages.map(p => {
          if (p.id !== pageId) return p
          if (blockId) {
            const idx = p.blocks.findIndex(b => b.id === blockId)
            const blocks = [...p.blocks]
            blocks.splice(idx + 1, 0, newBlock)
            return { ...p, blocks }
          }
          return { ...p, blocks: [...p.blocks, newBlock] }
        }),
      }))
    }
    reader.readAsDataURL(file)
  }

  function handleDrop(e: DragEvent, pageId: string) {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer?.files
    if (files?.length) {
      for (const file of Array.from(files)) {
        handleFileUpload(pageId, null, file)
      }
    }
  }

  function addComment(pageId: string, blockId: string) {
    if (!commentText.trim()) return
    updateBlock(pageId, blockId, b => ({
      ...b,
      comments: [...b.comments, { id: 'c-' + genId(), text: commentText, author: defaultAuthors[0], createdAt: Date.now() }],
    }))
    setCommentText('')
    setCommentingBlock(null)
  }

  function removeComment(pageId: string, blockId: string, commentId: string) {
    updateBlock(pageId, blockId, b => ({
      ...b,
      comments: b.comments.filter(c => c.id !== commentId),
    }))
  }

  function updateBoardCard(pageId: string, colId: string, cardId: string, fn: (c: BoardCard) => BoardCard) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? fn(c) : c),
        } : col),
      } : p),
    }))
  }

  function toggleCard(pageId: string, colId: string, cardId: string) {
    save(w => {
      const col = w.pages.find(p => p.id === pageId)?.boardData?.find(c => c.id === colId)
      const card = col?.cards.find(c => c.id === cardId)
      const newDone = !card?.done
      return {
        ...w,
        pages: w.pages.map(p => {
          if (p.id === pageId) {
            return {
              ...p,
              boardData: p.boardData?.map(col => col.id === colId ? {
                ...col,
                cards: col.cards.map(c => c.id === cardId ? { ...c, done: newDone } : c),
              } : col),
              blocks: syncBlocksDone(p.blocks, cardId, newDone),
            }
          }
          return {
            ...p,
            blocks: syncBlocksDone(p.blocks, cardId, newDone),
          }
        }),
      }
    })
  }

  function syncBlocksDone(blocks: Block[], cardId: string, done: boolean): Block[] {
    return blocks.map(b => {
      if (b.cardId === cardId) return { ...b, done }
      if (b.children.length) return { ...b, children: syncBlocksDone(b.children, cardId, done) }
      return b
    })
  }

  function addCard(pageId: string, colId: string) {
    const title = prompt('Titolo della card:')
    if (!title?.trim()) return
    const desc = prompt('Descrizione (opzionale):') || ''
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: [...col.cards, {
            id: 'bc-' + genId(),
            title: title.trim(),
            description: desc,
            done: false,
            comments: [],
            fileName: '', fileData: '', fileType: '',
            labels: [],
          }],
        } : col),
      } : p),
    }))
  }

  function removeCard(pageId: string, colId: string, cardId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.filter(c => c.id !== cardId),
        } : col),
      } : p),
    }))
  }

  function addColumn(pageId: string) {
    const title = prompt('Titolo colonna:')
    if (!title?.trim()) return
    const period = prompt('Periodo (es. "Settimane X-Y"):') || ''
    const colors = ['border-l-blue-500', 'border-l-emerald-500', 'border-l-amber-500', 'border-l-violet-500', 'border-l-rose-500', 'border-l-cyan-500']
    const color = colors[Math.floor(Math.random() * colors.length)]
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: [...(p.boardData || []), {
          id: 'col-' + genId(),
          title: title.trim(),
          period,
          color,
          cards: [],
        }],
      } : p),
    }))
  }

  function removeColumn(pageId: string, colId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.filter(col => col.id !== colId),
      } : p),
    }))
  }

  function moveCard(pageId: string, fromColId: string, toColId: string, cardId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        const fromCol = p.boardData?.find(c => c.id === fromColId)
        const card = fromCol?.cards.find(c => c.id === cardId)
        if (!card) return p
        return {
          ...p,
          boardData: p.boardData?.map(col => {
            if (col.id === fromColId) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
            if (col.id === toColId) return { ...col, cards: [...col.cards, { ...card, done: false }] }
            return col
          }),
        }
      }),
    }))
  }

  function addBoardComment(pageId: string, colId: string, cardId: string) {
    if (!commentText.trim()) return
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? {
            ...c,
            comments: [...c.comments, { id: 'c-' + genId(), text: commentText, author: defaultAuthors[0], createdAt: Date.now() }],
          } : c),
        } : col),
      } : p),
    }))
    setCommentText('')
    setCommentingBlock(null)
  }

  function removeBoardComment(pageId: string, colId: string, cardId: string, commentId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? {
            ...c,
            comments: c.comments.filter(cm => cm.id !== commentId),
          } : c),
        } : col),
      } : p),
    }))
  }

  const [draggedCard, setDraggedCard] = useState<{colId: string; cardId: string} | null>(null)
  const [addingCardCol, setAddingCardCol] = useState<string | null>(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardDesc, setNewCardDesc] = useState('')
  const cardInputRef = useRef<HTMLInputElement>(null)

  function confirmAddCard(pageId: string, colId: string) {
    if (!newCardTitle.trim()) return
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: [...col.cards, {
            id: 'bc-' + genId(),
            title: newCardTitle.trim(),
            description: newCardDesc.trim(),
            done: false,
            comments: [],
            fileName: '', fileData: '', fileType: '',
            labels: [],
          }],
        } : col),
      } : p),
    }))
    setNewCardTitle('')
    setNewCardDesc('')
    setAddingCardCol(null)
  }

  const slashCommandItems = [
    { type: 'heading' as const, label: 'Heading', icon: '#' },
    { type: 'subheading' as const, label: 'Subheading', icon: '›' },
    { type: 'text' as const, label: 'Testo', icon: '·' },
    { type: 'todo' as const, label: 'Todo', icon: '○' },
    { type: 'divider' as const, label: 'Divisore', icon: '—' },
    { type: 'task-group' as const, label: 'Gruppo task', icon: '◻' },
    { type: 'query-group' as const, label: 'Gruppo query', icon: '?' },
    { type: 'sticky' as const, label: 'Post-it', icon: '📌' },
  ] as const

  const renderSlashMenu = (blockId: string, pageId: string) => {
    const filtered = slashCommandItems.filter(item =>
      item.label.toLowerCase().includes(slashValue.toLowerCase())
    )
    if (slashMenu !== blockId || filtered.length === 0) return null
    return (
      <div className="absolute left-0 top-full z-50 mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-1.5 w-56">
        <p className="text-xs text-zinc-400 px-2 py-1">Comando rapido</p>
        {filtered.map(item => (
          <button
            key={item.type}
            onClick={() => {
              addBlockToPage(pageId, item.type, blockId)
              setSlashMenu(null)
              setSlashValue('')
            }}
            className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
          >
            <span className="text-xs w-4 text-zinc-400">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    )
  }

  const handleSlashInput = (value: string, blockId: string) => {
    const slashIdx = value.lastIndexOf('/')
    if (slashIdx >= 0 && (slashIdx === 0 || value[slashIdx - 1] === ' ')) {
      setSlashMenu(blockId)
      setSlashValue(value.slice(slashIdx + 1))
    } else {
      if (slashMenu === blockId) {
        setSlashMenu(null)
        setSlashValue('')
      }
    }
  }

  const renderBlock = (block: Block, pageId: string, depth = 0): React.ReactNode => {
    const isActivePage = activePage?.id === pageId
    const hasComments = block.comments.length > 0

    const blockControls = (
      <div className={`absolute right-0 top-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${depth > 0 ? '-top-5' : ''}`}>
        <button onClick={() => moveBlock(pageId, block.id, 'up')} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Sposta su">↑</button>
        <button onClick={() => moveBlock(pageId, block.id, 'down')} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Sposta giù">↓</button>
        <button onClick={() => setAddingBlock(block.id)} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Aggiungi dopo">+</button>
        <button
          onClick={() => setTargetBlockForFile(block.id)}
          className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400"
          title="Allega file"
        >
          📎
        </button>
        {block.id !== 'b-header' && (
          <button onClick={() => removeBlock(pageId, block.id)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-zinc-400 hover:text-red-500" title="Rimuovi">✕</button>
        )}
      </div>
    )

    const commentBubble = hasComments && (
      <button
        onClick={() => setCommentingBlock(commentingBlock === block.id ? null : block.id)}
        className="ml-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        title={`${block.comments.length} comment${block.comments.length > 1 ? 'i' : 'o'}`}
      >
        💬 {block.comments.length}
      </button>
    )

    const addBlockMenu = addingBlock === block.id && (
      <div className="relative z-20 my-1">
        <div className="absolute left-0 top-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 w-64">
          <p className="text-xs text-zinc-400 px-2 py-1">Aggiungi blocco</p>
          {([['heading', 'Heading'], ['subheading', 'Subheading'], ['text', 'Testo'], ['todo', 'Todo'], ['task-group', 'Gruppo task'], ['query-group', 'Gruppo query'], ['divider', 'Divisore'], ['sticky', 'Post-it']] as const).map(([type, label]) => (
            <button
              key={type}
              onClick={() => addBlockToPage(pageId, type, block.id)}
              className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mr-2 text-xs">{blockIcons[type]}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    )

    const commentSection = commentingBlock === block.id && (
      <div className="ml-6 mt-2 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4 space-y-2">
        {block.comments.map(c => (
          <div key={c.id} className="text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">{c.author}</span>
              <button onClick={() => removeComment(pageId, block.id, c.id)} className="text-xs text-zinc-400 hover:text-red-500">✕</button>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">{c.text}</p>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Scrivi un commento..."
            className="flex-1 text-sm border-0 bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-500 py-1 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
            onKeyDown={e => { if (e.key === 'Enter') addComment(pageId, block.id) }}
          />
          <button onClick={() => addComment(pageId, block.id)} className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Invia</button>
        </div>
      </div>
    )

    switch (block.type) {
      case 'heading':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => { 
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSlashMenu(null); setSlashValue(''); setEditingBlock(null) }
                      if (e.key === 'Enter' && !slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Enter' && slashMenu) { e.preventDefault(); setSlashMenu(null); setSlashValue('') }
                    }}
                    placeholder="Scrivi / per comandi..."
                    className="w-full text-2xl font-bold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-900 dark:text-zinc-100"
                  />
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'subheading':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => { 
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSlashMenu(null); setSlashValue(''); setEditingBlock(null) }
                      if (e.key === 'Enter' && !slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Enter' && slashMenu) { e.preventDefault(); setSlashMenu(null); setSlashValue('') }
                    }}
                    placeholder="Scrivi / per comandi..."
                    className="w-full text-base font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-800 dark:text-zinc-200"
                  />
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-base font-semibold text-zinc-800 dark:text-zinc-200 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'text':
        return (
          <div key={block.id} className="relative group py-0.5">
            <div className="flex items-start gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <div className="mb-1 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onMouseDown={e => {
                        e.preventDefault()
                        setEditBlockContent(c => (c.trim() ? c.replace(/\s*$/, '') + '\n\n' : '') + '| Colonna 1 | Colonna 2 | Colonna 3 |\n| --- | --- | --- |\n| | | |')
                      }}
                      className="text-[11px] px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >+ Tabella</button>
                    <button
                      type="button"
                      onMouseDown={e => {
                        e.preventDefault()
                        setEditBlockContent(c => {
                          const rowLine = [...c.split('\n')].reverse().find(l => l.trim().startsWith('|'))
                          const cols = rowLine ? rowLine.split('|').filter(s => s.trim() !== '').length : 3
                          return c.replace(/\s*$/, '') + '\n|' + ' |'.repeat(Math.max(1, cols))
                        })
                      }}
                      className="text-[11px] px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    >+ Riga tabella</button>
                  </div>
                  <textarea
                    autoFocus
                    value={editBlockContent}
                    rows={Math.min(24, Math.max(3, editBlockContent.split('\n').length + 1))}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => {
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') {
                        e.preventDefault()
                        if (slashMenu) { setSlashMenu(null); setSlashValue('') }
                        else { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      } else if (e.key === 'Enter' && slashMenu) {
                        e.preventDefault(); setSlashMenu(null); setSlashValue('')
                      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault()
                        updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null)
                      }
                    }}
                    placeholder="Scrivi testo, elenchi o tabelle…  ( / per i comandi )"
                    className={`w-full ${/(^|\n)\s*\|.*\|/.test(editBlockContent) ? 'font-mono text-xs' : 'text-sm'} bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400/40 text-zinc-700 dark:text-zinc-300 leading-relaxed resize-y`}
                  />
                  <div className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                    ⌘/Ctrl+Invio o Esc per salvare · Invio = a capo · tabelle: separa le colonne con |
                  </div>
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <div
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  title="Clicca per modificare"
                  className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed cursor-text rounded px-1 -mx-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  {block.content ? renderRichText(block.content) : <span className="text-zinc-300 dark:text-zinc-600 italic">Scrivi / per comandi...</span>}
                </div>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'todo':
        return (
          <div key={block.id} className="relative group py-0.5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={block.done}
                onChange={() => updateBlock(pageId, block.id, b => ({ ...b, done: !b.done }))}
                className="h-3.5 w-3.5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600"
              />
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className={`flex-1 text-sm bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none ${block.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className={`text-sm cursor-text ${block.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'file':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-sm">📎</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1 truncate">{block.fileName || block.content}</span>
              {block.fileData && block.fileType?.startsWith('image/') && (
                <button
                  onClick={() => window.open(block.fileData, '_blank')}
                  className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  👁
                </button>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'sticky': {
        const stickColors: Record<string, string> = {
          yellow: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-200 dark:border-yellow-700 text-yellow-900 dark:text-yellow-200',
          pink: 'bg-pink-100 dark:bg-pink-900/40 border-pink-200 dark:border-pink-700 text-pink-900 dark:text-pink-200',
          blue: 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200',
          green: 'bg-green-100 dark:bg-green-900/40 border-green-200 dark:border-green-700 text-green-900 dark:text-green-200',
          purple: 'bg-purple-100 dark:bg-purple-900/40 border-purple-200 dark:border-purple-700 text-purple-900 dark:text-purple-200',
          orange: 'bg-orange-100 dark:bg-orange-900/40 border-orange-200 dark:border-orange-700 text-orange-900 dark:text-orange-200',
        }
        const c = block.color || 'yellow'
        const colorClass = stickColors[c] || stickColors.yellow
        return (
          <div key={block.id} className="relative group py-2">
            <div className={`rounded-xl border p-3 ${colorClass} shadow-sm`}>
              <div className="flex items-start gap-2">
                <span className="text-base shrink-0 mt-0.5">
                  {c === 'yellow' ? '💛' : c === 'pink' ? '🩷' : c === 'blue' ? '💙' : c === 'green' ? '💚' : c === 'purple' ? '💜' : '🧡'}
                </span>
                {editingBlock === block.id ? (
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => setEditBlockContent(e.target.value)}
                    onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Escape') setEditingBlock(null)
                    }}
                    className="flex-1 text-sm bg-transparent border-b border-current border-opacity-30 focus:outline-none"
                  />
                ) : (
                  <span
                    onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                    className="text-sm leading-relaxed cursor-text flex-1"
                  >
                    {block.content || <span className="opacity-50 italic">Scrivi...</span>}
                  </span>
                )}
                {commentBubble}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {['yellow', 'pink', 'blue', 'green', 'purple', 'orange'].map(col => (
                  <button
                    key={col}
                    onClick={() => updateBlock(pageId, block.id, b => ({ ...b, color: col }))}
                    className={`w-3.5 h-3.5 rounded-full border border-zinc-300 dark:border-zinc-600 ${
                      c === col ? 'ring-1 ring-zinc-500 dark:ring-zinc-300 scale-110' : ''
                    } ${
                      col === 'yellow' ? 'bg-yellow-200 dark:bg-yellow-600' :
                      col === 'pink' ? 'bg-pink-200 dark:bg-pink-600' :
                      col === 'blue' ? 'bg-blue-200 dark:bg-blue-600' :
                      col === 'green' ? 'bg-green-200 dark:bg-green-600' :
                      col === 'purple' ? 'bg-purple-200 dark:bg-purple-600' : 'bg-orange-200 dark:bg-orange-600'
                    }`}
                    title={col}
                  />
                ))}
              </div>
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )
      }

      case 'task-group':
        return (
          <div key={block.id} className="relative group">
            <div className="flex items-center gap-2 py-1">
              <button onClick={() => updateBlock(pageId, block.id, b => ({ ...b, collapsed: !b.collapsed }))} className="text-xs text-zinc-400 hover:text-zinc-600 w-4">
                {block.collapsed ? '▶' : '▼'}
              </button>
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className="flex-1 text-sm font-medium bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-700 dark:text-zinc-300"
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {!block.collapsed && (
              <div className="ml-4 border-l-2 border-zinc-100 dark:border-zinc-800 pl-3 space-y-0.5">
                {block.children.map(child => renderBlock(child, pageId, depth + 1))}
              </div>
            )}
            {commentSection}
          </div>
        )

      case 'query-group':
        return (
          <div key={block.id} className="relative group">
            <div className="flex items-center gap-2 py-1">
              <button onClick={() => updateBlock(pageId, block.id, b => ({ ...b, collapsed: !b.collapsed }))} className="text-xs text-zinc-400 hover:text-zinc-600 w-4">
                {block.collapsed ? '▶' : '▼'}
              </button>
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className="flex-1 text-sm font-medium bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-700 dark:text-zinc-300"
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {!block.collapsed && (
              <div className="ml-4 border-l-2 border-zinc-100 dark:border-zinc-800 pl-3 space-y-0.5">
                {block.children.map(child => renderBlock(child, pageId, depth + 1))}
              </div>
            )}
            {commentSection}
          </div>
        )

      default:
        return null
    }
  }

  const renderBoard = (page: Page): React.ReactNode => {
    const bd = page.boardData || []
    const totalCards = bd.reduce((s, col) => s + col.cards.length, 0)
    const doneCards = bd.reduce((s, col) => s + col.cards.filter(c => c.done).length, 0)

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-4 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">📋 Kanban — Cronoprogramma</h2>
            <p className="text-xs text-zinc-400">{doneCards}/{totalCards} card completate</p>
          </div>
          <button onClick={() => addColumn(page.id)} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
            + Colonna
          </button>
        </div>
        <div className="flex-1 overflow-x-auto px-4 pb-4">
          <div className="flex gap-4 h-full items-start min-h-0">
            {bd.map(col => {
              const doneCol = col.cards.filter(c => c.done).length
              return (
                <div key={col.id} className="w-72 shrink-0 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl flex flex-col max-h-full">
                  {/* Column header */}
                  <div className={`shrink-0 p-3 border-b border-zinc-200 dark:border-zinc-700 border-l-2 ${col.color} rounded-t-xl`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{col.title}</h3>
                      <button onClick={() => removeColumn(page.id, col.id)} className="text-xs text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100">✕</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{col.period}</span>
                      <span className="text-xs text-zinc-400">{doneCol}/{col.cards.length}</span>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
                    {col.cards.map(card => {
                      const commenting = commentingBlock === card.id
                      return (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={() => setDraggedCard({ colId: col.id, cardId: card.id })}
                          onDragOver={e => { e.preventDefault(); if (draggedCard && draggedCard.cardId !== card.id) setDraggedCard(draggedCard) }}
                          onDrop={e => {
                            e.preventDefault()
                            if (draggedCard && draggedCard.cardId !== card.id) {
                              moveCard(page.id, draggedCard.colId, col.id, draggedCard.cardId)
                            }
                            setDraggedCard(null)
                          }}
                          className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow group/card"
                        >
                          <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={card.done}
                                  onChange={() => toggleCard(page.id, col.id, card.id)}
                                  className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600 shrink-0"
                                />
                                <div className="min-w-0">
                                  {editingCardTitle === card.id ? (
                                    <input
                                      autoFocus
                                      value={editCardTitleValue}
                                      onChange={e => setEditCardTitleValue(e.target.value)}
                                      onBlur={() => { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, title: editCardTitleValue })); setEditingCardTitle(null) }}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, title: editCardTitleValue })); setEditingCardTitle(null) }
                                        if (e.key === 'Escape') setEditingCardTitle(null)
                                      }}
                                      className="text-sm font-medium leading-snug w-full bg-transparent border-b border-zinc-400 focus:outline-none text-zinc-800 dark:text-zinc-200"
                                    />
                                  ) : (
                                    <p
                                      onClick={() => { setEditingCardTitle(card.id); setEditCardTitleValue(card.title) }}
                                      className={`text-sm font-medium leading-snug cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded px-0.5 -ml-0.5 ${card.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}
                                    >
                                      {card.title}
                                    </p>
                                  )}
                                  {editingCardDesc === card.id ? (
                                    <input
                                      autoFocus
                                      value={editCardDescValue}
                                      onChange={e => setEditCardDescValue(e.target.value)}
                                      onBlur={() => { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, description: editCardDescValue })); setEditingCardDesc(null) }}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, description: editCardDescValue })); setEditingCardDesc(null) }
                                        if (e.key === 'Escape') setEditingCardDesc(null)
                                      }}
                                      className="text-xs w-full bg-transparent border-b border-zinc-400 focus:outline-none text-zinc-400 mt-1"
                                    />
                                  ) : (
                                    (card.description || card.title) && (
                                      <p
                                        onClick={() => { setEditingCardDesc(card.id); setEditCardDescValue(card.description || '') }}
                                        className="text-xs text-zinc-400 mt-1 leading-relaxed cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded px-0.5 -ml-0.5"
                                      >
                                        {card.description || 'Aggiungi descrizione...'}
                                      </p>
                                    )
                                  )}
                                  {card.labels.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {card.labels.map((label, li) => (
                                        <span key={li} className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                                          {label}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                {card.comments.length > 0 && (
                                  <button
                                    onClick={() => setCommentingBlock(commenting ? null : card.id)}
                                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                  >
                                    💬 {card.comments.length}
                                  </button>
                                )}
                                <button onClick={() => removeCard(page.id, col.id, card.id)} className="text-xs text-zinc-300 hover:text-red-500 opacity-0 group-hover/card:opacity-100 transition-opacity">✕</button>
                              </div>
                            </div>

                            {/* Comments */}
                            {commenting && (
                              <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-700 space-y-1.5">
                                {card.comments.map(c => (
                                  <div key={c.id} className="text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-zinc-500">{c.author}</span>
                                      <button onClick={() => removeBoardComment(page.id, col.id, card.id, c.id)} className="text-zinc-400 hover:text-red-500">✕</button>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400">{c.text}</p>
                                  </div>
                                ))}
                                <div className="flex gap-1.5">
                                  <input
                                    value={commentingBlock === card.id ? commentText : ''}
                                    onChange={e => setCommentText(e.target.value)}
                                    placeholder="Commento..."
                                    className="flex-1 text-xs border-0 bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-500 py-0.5 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
                                    onKeyDown={e => { if (e.key === 'Enter') { addBoardComment(page.id, col.id, card.id); setCommentingBlock(null) } }}
                                  />
                                  <button onClick={() => { addBoardComment(page.id, col.id, card.id); setCommentingBlock(null) }} className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Invia</button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {/* Add card inline */}
                    {addingCardCol === col.id ? (
                      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
                        <input
                          ref={cardInputRef}
                          autoFocus
                          value={newCardTitle}
                          onChange={e => setNewCardTitle(e.target.value)}
                          placeholder="Titolo card..."
                          className="w-full text-sm border-0 bg-transparent focus:outline-none text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmAddCard(page.id, col.id); if (e.key === 'Escape') { setAddingCardCol(null); setNewCardTitle('') } }}
                        />
                        <input
                          value={newCardDesc}
                          onChange={e => setNewCardDesc(e.target.value)}
                          placeholder="Descrizione (opzionale)..."
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-500 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmAddCard(page.id, col.id) }}
                        />
                        <div className="flex gap-1.5">
                          <button onClick={() => confirmAddCard(page.id, col.id)} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">Aggiungi</button>
                          <button onClick={() => { setAddingCardCol(null); setNewCardTitle(''); setNewCardDesc('') }} className="text-xs px-2.5 py-1 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Annulla</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingCardCol(col.id); setNewCardTitle(''); setNewCardDesc(''); setTimeout(() => cardInputRef.current?.focus(), 50) }}
                        className="w-full text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
                      >
                        + Aggiungi card
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const [editCell, setEditCell] = useState<{rowId: string; colId: string} | null>(null)
  const [editValue, setEditValue] = useState<string | number | boolean>('')
  const [dbFilter, setDbFilter] = useState<string>('')
  const [dbSortCol, setDbSortCol] = useState<string | null>(null)
  const [dbSortAsc, setDbSortAsc] = useState(true)
  const [addingRow, setAddingRow] = useState(false)
  const [newRow, setNewRow] = useState<Record<string, string | number | boolean>>({})
  const [addingColumn, setAddingColumn] = useState(false)
  const [newColName, setNewColName] = useState('')
  const [newColType, setNewColType] = useState<ColumnType>('text')
  const [newColOptions, setNewColOptions] = useState('')
  const [contextMenu, setContextMenu] = useState<{colId: string; x: number; y: number} | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  const renderDatabase = (page: Page): React.ReactNode => {
    const db = page.databaseData || { columns: [], rows: [] }
    let filteredRows = [...db.rows]
    if (dbFilter.trim()) {
      const q = dbFilter.toLowerCase()
      filteredRows = filteredRows.filter(row =>
        db.columns.some(col => {
          const val = row.cells[col.id]
          return String(val ?? '').toLowerCase().includes(q)
        })
      )
    }
    if (dbSortCol) {
      filteredRows.sort((a, b) => {
        const va = a.cells[dbSortCol]
        const vb = b.cells[dbSortCol]
        if (va === undefined || va === null) return 1
        if (vb === undefined || vb === null) return -1
        const cmp = typeof va === 'string' ? va.localeCompare(String(vb)) : Number(va) > Number(vb) ? 1 : -1
        return dbSortAsc ? cmp : -cmp
      })
    }

    function updateCell(rowId: string, colId: string, val: string | number | boolean) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns,
            rows: db.rows.map(r => r.id === rowId ? { ...r, cells: { ...r.cells, [colId]: val } } : r),
          },
        } : p),
      }))
    }

    function deleteRow(rowId: string) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: { columns: db.columns, rows: db.rows.filter(r => r.id !== rowId) },
        } : p),
      }))
    }

    function duplicateRow(rowId: string) {
      const row = db.rows.find(r => r.id === rowId)
      if (!row) return
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: { columns: db.columns, rows: [...db.rows, { ...row, id: 'dr-' + genId(), cells: { ...row.cells } }] },
        } : p),
      }))
    }

    function confirmNewRow() {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns,
            rows: [...db.rows, { id: 'dr-' + genId(), cells: { ...newRow } }],
          },
        } : p),
      }))
      setNewRow({})
      setAddingRow(false)
    }

    function confirmNewColumn() {
      if (!newColName.trim()) return
      const colId = 'dc-' + genId()
      const col: TableColumn = { id: colId, name: newColName.trim(), type: newColType, options: newColOptions ? newColOptions.split(',').map(s => s.trim()) : [], width: 150 }
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: [...db.columns, col],
            rows: db.rows.map(r => ({ ...r, cells: { ...r.cells, [colId]: newColType === 'checkbox' ? false : '' } })),
          },
        } : p),
      }))
      setNewColName('')
      setNewColOptions('')
      setAddingColumn(false)
    }

    function deleteColumn(colId: string) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns.filter(c => c.id !== colId),
            rows: db.rows.map(r => {
              const cells = { ...r.cells }
              delete cells[colId]
              return { ...r, cells }
            }),
          },
        } : p),
      }))
      setContextMenu(null)
    }

    function renderCellValue(row: TableRow, col: TableColumn) {
      const val = row.cells[col.id]
      const isEditing = editCell?.rowId === row.id && editCell?.colId === col.id

      if (isEditing) {
        if (col.type === 'select') {
          return (
            <select
              autoFocus
              value={String(editValue ?? '')}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => { updateCell(row.id, col.id, editValue); setEditCell(null) }}
              className="w-full text-xs border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            >
              <option value="">—</option>
              {col.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )
        }
        if (col.type === 'checkbox') {
          return (
            <input
              type="checkbox"
              checked={!!editValue}
              onChange={e => { updateCell(row.id, col.id, e.target.checked); setEditCell(null) }}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 mx-auto block"
            />
          )
        }
        return (
          <input
            ref={editInputRef}
            autoFocus
            type={col.type === 'number' ? 'number' : 'text'}
            value={String(editValue ?? '')}
            onChange={e => setEditValue(col.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
            onBlur={() => { updateCell(row.id, col.id, editValue); setEditCell(null) }}
            onKeyDown={e => { if (e.key === 'Enter') { updateCell(row.id, col.id, editValue); setEditCell(null) } if (e.key === 'Escape') setEditCell(null) }}
            className="w-full text-xs border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        )
      }

      if (col.type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={!!val}
            onChange={() => updateCell(row.id, col.id, !val)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 mx-auto block"
          />
        )
      }

      return (
        <span className="text-xs text-zinc-700 dark:text-zinc-300 truncate block">
          {col.type === 'select' && !val ? <span className="text-zinc-400">—</span> : String(val ?? '')}
        </span>
      )
    }

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-4 pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Database</h2>
            <span className="text-xs text-zinc-400">{filteredRows.length} righe</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={dbFilter}
              onChange={e => setDbFilter(e.target.value)}
              placeholder="Filtra..."
              className="text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 w-40 text-zinc-600 dark:text-zinc-300 placeholder-zinc-400"
            />
            <button onClick={() => setAddingColumn(true)} className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
              + Colonna
            </button>
            <button onClick={() => setAddingRow(true)} className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              + Riga
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 pb-4">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="w-8 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700 p-1"></th>
                {db.columns.map(col => (
                  <th
                    key={col.id}
                    style={{ minWidth: col.width, maxWidth: col.width * 2 }}
                    className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-r border-zinc-200 dark:border-zinc-700 px-3 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 select-none relative group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <button
                        onClick={() => {
                          if (dbSortCol === col.id) { setDbSortAsc(!dbSortAsc) }
                          else { setDbSortCol(col.id); setDbSortAsc(true) }
                        }}
                        className="hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1"
                      >
                        {col.name}
                        {dbSortCol === col.id && <span className="text-[10px]">{dbSortAsc ? '↑' : '↓'}</span>}
                      </button>
                      <button
                        onClick={(e) => setContextMenu({ colId: col.id, x: e.clientX, y: e.clientY })}
                        className="opacity-0 group-hover:opacity-100 text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        ⋯
                      </button>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-normal">{col.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <tr
                  key={row.id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="border-b border-zinc-100 dark:border-zinc-800 p-1 text-center">
                    <div className="flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => duplicateRow(row.id)} className="text-[10px] text-zinc-400 hover:text-zinc-600" title="Duplica">⧉</button>
                      <button onClick={() => deleteRow(row.id)} className="text-[10px] text-zinc-400 hover:text-red-500" title="Elimina">✕</button>
                    </div>
                  </td>
                  {db.columns.map(col => (
                    <td
                      key={col.id}
                      className="border-b border-r border-zinc-100 dark:border-zinc-800 px-3 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                      onClick={() => {
                        setEditCell({ rowId: row.id, colId: col.id })
                        setEditValue(row.cells[col.id] ?? (col.type === 'checkbox' ? false : ''))
                        setTimeout(() => editInputRef.current?.focus(), 50)
                      }}
                    >
                      {renderCellValue(row, col)}
                    </td>
                  ))}
                </tr>
              ))}
              {addingRow && (
                <tr>
                  <td className="border-b border-zinc-100 dark:border-zinc-800 p-1"></td>
                  {db.columns.map(col => (
                    <td key={col.id} className="border-b border-r border-zinc-100 dark:border-zinc-800 px-3 py-1">
                      {col.type === 'select' ? (
                        <select
                          value={String(newRow[col.id] ?? '')}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: e.target.value }))}
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-700 dark:text-zinc-300"
                        >
                          <option value="">—</option>
                          {col.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : col.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          checked={!!newRow[col.id]}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: e.target.checked }))}
                          className="h-4 w-4 rounded border-zinc-300 mx-auto block"
                        />
                      ) : (
                        <input
                          type={col.type === 'number' ? 'number' : 'text'}
                          value={String(newRow[col.id] ?? '')}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: col.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value }))}
                          placeholder={col.name}
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmNewRow(); if (e.key === 'Escape') { setAddingRow(false); setNewRow({}) } }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add column modal */}
        {addingColumn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setAddingColumn(false)}>
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700 w-80" onClick={e => e.stopPropagation()}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Nuova colonna</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Nome</label>
                  <input value={newColName} onChange={e => setNewColName(e.target.value)} placeholder="Es. Data" className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Tipo</label>
                  <select value={newColType} onChange={e => setNewColType(e.target.value as ColumnType)} className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300">
                    <option value="text">Testo</option>
                    <option value="number">Numero</option>
                    <option value="select">Selezione</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="date">Data</option>
                  </select>
                </div>
                {newColType === 'select' && (
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Opzioni (separate da virgola)</label>
                    <input value={newColOptions} onChange={e => setNewColOptions(e.target.value)} placeholder="Alta, Media, Bassa" className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400" />
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <button onClick={confirmNewColumn} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">Crea</button>
                  <button onClick={() => setAddingColumn(false)} className="text-xs px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Annulla</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Column context menu */}
        {contextMenu && (
          <div className="fixed inset-0 z-50" onClick={() => setContextMenu(null)}>
            <div
              className="absolute bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-1 w-40"
              style={{ left: contextMenu.x, top: contextMenu.y }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => { setDbSortCol(contextMenu.colId); setDbSortAsc(true); setContextMenu(null) }} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300">Ordina ↑</button>
              <button onClick={() => { setDbSortCol(contextMenu.colId); setDbSortAsc(false); setContextMenu(null) }} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300">Ordina ↓</button>
              <hr className="my-1 border-zinc-100 dark:border-zinc-700" />
              <button onClick={() => deleteColumn(contextMenu.colId)} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">Elimina colonna</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!loaded) return <div className="h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center"><span className="text-zinc-400">Caricamento...</span></div>

  return (
    <div className="h-screen flex bg-zinc-50 dark:bg-zinc-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} shrink-0 bg-white dark:bg-zinc-800/50 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-200 flex flex-col overflow-hidden`}>
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                <span className="text-xs font-bold text-white dark:text-zinc-900">A</span>
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Antonio AEO</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">◀</button>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg px-2 py-1.5">
            <span>🔒</span>
            <span>Locale</span>
          </div>
        </div>

        <div className="px-3 pb-2 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span>{darkMode ? 'Modalità chiara' : 'Modalità scura'}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {([
            { key: 'strategia', label: 'Strategia', icon: '◇' },
            { key: 'risorse', label: 'Risorse', icon: '🧰' },
            { key: 'community', label: 'Community e Gruppi', icon: '💬' },
            { key: 'monitoraggio', label: 'Monitoraggio AI', icon: '📈' },
            { key: 'operativo', label: 'Operativo', icon: '📋' },
            { key: 'spazio-libero', label: 'Spazio libero', icon: '✦' },
          ] as const).map(section => {
            const sectionPages = workspace?.pages.filter(p => (p as any).section === section.key) || []
            if (sectionPages.length === 0) return null
            return (
              <div key={section.key}>
                <div className="px-2 py-1.5 mt-2 mb-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
                    <span>{section.icon}</span>
                    <span className="uppercase tracking-wider font-semibold">{section.label}</span>
                  </div>
                </div>
                {sectionPages.map(p => (
                  <div key={p.id} className="group relative">
                    {renamingPage === p.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onBlur={() => {
                          save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, title: renameValue || pp.title } : pp) }))
                          setRenamingPage(null)
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, title: renameValue || pp.title } : pp) }))
                            setRenamingPage(null)
                          }
                        }}
                        className="w-full text-sm bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                      />
                    ) : (
                      <button
                        onClick={() => save(w => ({ ...w, activePage: p.id }))}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all duration-150 ${
                          workspace?.activePage === p.id
                            ? 'bg-zinc-100 dark:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200/50 dark:border-zinc-600/30'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 hover:text-zinc-800 dark:hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xs shrink-0 relative">
                          <span
                            onClick={e => { e.stopPropagation(); setIconPicker(iconPicker === p.id ? null : p.id) }}
                            className="cursor-pointer hover:opacity-70"
                          >
                            {p.icon}
                          </span>
                          {iconPicker === p.id && (
                            <div className="absolute left-0 top-5 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2 w-48" onClick={e => e.stopPropagation()}>
                              <div className="grid grid-cols-6 gap-0.5">
                                {pageIcons.map(ico => (
                                  <button
                                    key={ico}
                                    onClick={() => {
                                      save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, icon: ico } : pp) }))
                                      setIconPicker(null)
                                    }}
                                    className={`w-6 h-6 flex items-center justify-center text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${p.icon === ico ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}
                                  >
                                    {ico}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </span>
                        <span className="truncate text-left flex-1">{p.title}</span>
                      </button>
                    )}
                    <div className="hidden group-hover:flex absolute right-1 top-1/2 -translate-y-1/2 items-center gap-0.5">
                      <button onClick={() => { setRenamingPage(p.id); setRenameValue(p.title) }} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded text-zinc-400 text-xs" title="Rinomina">✎</button>
                      <button onClick={() => duplicatePage(p.id)} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded text-zinc-400 text-xs" title="Duplica">⧉</button>
                      {p.id !== 'page-overview' && (
                        <button onClick={() => deletePage(p.id)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-zinc-400 hover:text-red-500 text-xs" title="Elimina">✕</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 shrink-0 space-y-1">
          <button onClick={addPage} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors">
            <span>+</span>
            <span>Nuova pagina</span>
          </button>
          <button onClick={() => setSidebarOpen(false)} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors sm:hidden">
            <span>◀</span>
            <span>Chiudi sidebar</span>
          </button>
        </div>
      </aside>

      {/* Sidebar toggle (when closed) */}
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="fixed top-3 left-3 z-30 p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm">
          ▶
        </button>
      )}

      {/* Main content */}
      <main
        className={`flex-1 flex flex-col overflow-y-auto ${sidebarOpen ? '' : 'pl-10'}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => activePage && handleDrop(e, activePage.id)}
      >
        {dragOver && (
          <div className="fixed inset-0 z-50 bg-zinc-900/10 dark:bg-zinc-900/40 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-center">
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Rilascia i file qui</p>
              <p className="text-sm text-zinc-400 mt-1">Verranno aggiunti alla pagina corrente</p>
            </div>
          </div>
        )}

        {activePage && activePage.view === 'board' ? (
          renderBoard(activePage)
        ) : activePage && activePage.view === 'database' ? (
          renderDatabase(activePage)
        ) : activePage && (
          <>
            {/* Page toolbar */}
            <div className="sticky top-0 z-10 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-5 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 text-sm">
                <span className="text-base relative">
                  <span
                    onClick={() => setIconPicker(iconPicker === activePage.id ? null : activePage.id)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    {activePage.icon}
                  </span>
                  {iconPicker === activePage.id && (
                    <div className="absolute left-0 top-6 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2 w-48" onClick={e => e.stopPropagation()}>
                      <div className="grid grid-cols-6 gap-0.5">
                        {pageIcons.map(ico => (
                          <button
                            key={ico}
                            onClick={() => {
                              save(w => ({ ...w, pages: w.pages.map(pp => pp.id === activePage.id ? { ...pp, icon: ico } : pp) }))
                              setIconPicker(null)
                            }}
                            className={`w-6 h-6 flex items-center justify-center text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${activePage.icon === ico ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}
                          >
                            {ico}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">{activePage.title}</span>
                <span className="text-[10px] text-zinc-300 dark:text-zinc-600 uppercase tracking-wider ml-1 font-mono">{activePage.view}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setAddingBlock('__end__') }}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  + Blocco
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  📎
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0]
                    if (file && activePage) handleFileUpload(activePage.id, null, file)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>

            {/* Blocks */}
            <div className="flex-1 px-5 py-5 max-w-3xl mx-auto w-full">
              <div className="space-y-1">
                {activePage.blocks.map(block => renderBlock(block, activePage.id))}
              </div>

              {addingBlock === '__end__' && (
                <div className="relative z-20 my-2">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 w-64">
                    <p className="text-xs text-zinc-400 px-2 py-1">Aggiungi blocco</p>
                    {([['heading', 'Heading'], ['subheading', 'Subheading'], ['text', 'Testo'], ['todo', 'Todo'], ['task-group', 'Gruppo task'], ['query-group', 'Gruppo query'], ['divider', 'Divisore'], ['sticky', 'Post-it']] as const).map(([type, label]) => (
                      <button
                        key={type}
                        onClick={() => addBlockToPage(activePage.id, type)}
                        className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="mr-2 text-xs">{blockIcons[type]}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick add block at the bottom */}
              <button
                onClick={() => setAddingBlock('__end__')}
                className="mt-4 w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
              >
                ✏️ Aggiungi un blocco... (o scrivi "/" in un blocco)
              </button>

              {/* File upload target at the bottom */}
              <div
                className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  dragOver
                    ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); if (activePage) handleDrop(e, activePage.id) }}
              >
                <p className="text-sm text-zinc-400">📎 Trascina file qui o <button onClick={() => fileInputRef.current?.click()} className="text-zinc-600 dark:text-zinc-300 underline">carica</button></p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* File target block selector modal */}
      {targetBlockForFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setTargetBlockForFile(null)}>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700 w-80" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Allega file dopo il blocco</h3>
            <input
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (file && activePage) {
                  handleFileUpload(activePage.id, targetBlockForFile, file)
                  setTargetBlockForFile(null)
                }
              }}
              className="block w-full text-sm text-zinc-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-zinc-100 dark:file:bg-zinc-700 file:text-zinc-700 dark:file:text-zinc-300"
            />
            <button onClick={() => setTargetBlockForFile(null)} className="mt-3 text-xs text-zinc-400 hover:text-zinc-600">Annulla</button>
          </div>
        </div>
      )}
    </div>
  )
}
