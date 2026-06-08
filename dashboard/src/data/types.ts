export type Comment = {
  id: string
  text: string
  author: string
  createdAt: number
}

export type Block = {
  id: string
  type: 'heading' | 'subheading' | 'text' | 'todo' | 'file' | 'divider' | 'query-group' | 'task-group' | 'sticky'
  content: string
  done: boolean
  comments: Comment[]
  fileName: string
  fileData: string
  fileType: string
  collapsed: boolean
  children: Block[]
  color?: string
  cardId?: string
}

export type BoardCard = {
  id: string
  title: string
  description: string
  done: boolean
  comments: Comment[]
  fileName: string
  fileData: string
  fileType: string
  labels: string[]
}

export type BoardColumn = {
  id: string
  title: string
  period: string
  color: string
  cards: BoardCard[]
}

export type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date'

export type TableColumn = {
  id: string
  name: string
  type: ColumnType
  options: string[]
  width: number
}

export type TableRow = {
  id: string
  cells: Record<string, string | number | boolean>
}

export type DatabaseData = {
  columns: TableColumn[]
  rows: TableRow[]
}

export type PageSection = 'strategia' | 'risorse' | 'community' | 'monitoraggio' | 'operativo' | 'spazio-libero'

export type Page = {
  id: string
  title: string
  icon: string
  view: 'blocks' | 'board' | 'database'
  section: PageSection
  blocks: Block[]
  boardData?: BoardColumn[]
  databaseData?: DatabaseData
}

export type Workspace = {
  pages: Page[]
  activePage: string
}
