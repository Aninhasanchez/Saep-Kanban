import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3, 'Título precisa de pelo menos 3 caracteres'),
  description: z.string().max(500).optional().or(z.literal('')),
  status: z.enum(['todo','doing','done']),
  assignee: z.string().min(1, 'Responsável é obrigatório'),
  readonly: z.boolean().optional().default(false)
})

export const BoardSchema = z.object({
  columns: z.object({
    todo: z.array(TaskSchema),
    doing: z.array(TaskSchema),
    done: z.array(TaskSchema)
  })
})

const STORAGE_KEY = 'kanban-aria-dnd:v1'

export function loadBoard(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return null
    const parsed = JSON.parse(raw)
    return BoardSchema.parse(parsed)
  }catch(e){
    console.warn('Falha ao carregar estado. Resetando.', e)
    return null
  }
}

export function saveBoard(board){
  try{
    const data = BoardSchema.parse(board)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }catch(e){
    console.error('Falha ao salvar board', e)
  }
}
