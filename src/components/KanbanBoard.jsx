import React, { useEffect, useMemo, useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'
import AddTaskDialog from './AddTaskDialog'
import A11yAnnouncer from './A11yAnnouncer'
import { loadBoard, saveBoard } from '../utils/validation'

const initialData = {
  columns: {
    todo: [
      { id:'t1', title:'Especificar requisitos', description:'', status:'todo', assignee:'Ana', readonly:false },
      { id:'t2', title:'Criar layout', description:'', status:'todo', assignee:'Kevin', readonly:false }
    ],
    doing: [
      { id:'t3', title:'API de tarefas', description:'', status:'doing', assignee:'Leonardo', readonly:false }
    ],
    done: [
      { id:'t4', title:'Setup do projeto', description:'', status:'done', assignee:'Miguel', readonly:true }
    ]
  }
}

export default function KanbanBoard(){
  const [board, setBoard] = useState(() => loadBoard() ?? initialData)
  const [announce, setAnnounce] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => saveBoard(board), [board])

  const counts = useMemo(() => ({
    todo: board.columns.todo.length,
    doing: board.columns.doing.length,
    done: board.columns.done.length
  }), [board])

  function onDragEnd(result){
    const { source, destination } = result
    if(!destination) return

    // Não faz nada se soltou no mesmo lugar
    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return
    }

    setBoard(prev => {
      const srcList = Array.from(prev.columns[source.droppableId])
      const [moved] = srcList.splice(source.index, 1)
      const dstList = Array.from(prev.columns[destination.droppableId])
      // Atualiza o status conforme a coluna de destino
      const updated = { ...moved, status: destination.droppableId }
      dstList.splice(destination.index, 0, updated)

      const next = {
        columns: {
          ...prev.columns,
          [source.droppableId]: srcList,
          [destination.droppableId]: dstList
        }
      }
      setAnnounce(`Tarefa "${updated.title}" movida para "${labelOf(destination.droppableId)}"`)
      return next
    })
  }

  function labelOf(colId){
    return colId === 'todo' ? 'A Fazer' : colId === 'doing' ? 'Fazendo' : 'Concluído'
  }

  function addTask(task){
    setBoard(prev => ({
      columns: {
        ...prev.columns,
        [task.status]: [...prev.columns[task.status], task]
      }
    }))
    setAnnounce(`Tarefa "${task.title}" criada em "${labelOf(task.status)}"`)
  }

  function resetBoard(){
    setBoard(initialData)
    setAnnounce('Quadro restaurado ao estado inicial')
  }

  return (
    <section aria-labelledby="board-title">
      <A11yAnnouncer message={announce} />
      <div className="header" style={{paddingTop:0}}>
        <h1 id="board-title">Quadro Kanban</h1>
        <div className="toolbar" role="toolbar" aria-label="Ações do quadro">
          <button onClick={() => setOpen(true)} aria-label="Adicionar nova tarefa">+ Nova</button>
          <button onClick={resetBoard} aria-label="Restaurar quadro">↺ Resetar</button>
        </div>
      </div>

      <div className="board" aria-describedby="help-text">
        <p id="help-text" className="sr-only">
          Use o mouse ou o teclado para arrastar cartões. Com o foco no cartão, pressione Enter para iniciar a movimentação.
          Use as setas para escolher uma posição e Enter para soltar.
        </p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Column id="todo" title="A Fazer" tasks={board.columns.todo} count={counts.todo} describedBy="help-text" />
          <Column id="doing" title="Fazendo" tasks={board.columns.doing} count={counts.doing} describedBy="help-text" />
          <Column id="done" title="Concluído" tasks={board.columns.done} count={counts.done} describedBy="help-text" />
        </DragDropContext>
      </div>

      <AddTaskDialog open={open} onClose={() => setOpen(false)} onSubmit={addTask} />
    </section>
  )
}
