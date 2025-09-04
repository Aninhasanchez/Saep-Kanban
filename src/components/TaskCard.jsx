import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

export default function TaskCard({ task, index }){
  // readOnly impede edição e também mostra atributo readOnly nativo em inputs (quando houver)
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <article
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="listitem"
          aria-roledescription="Cartão de tarefa"
          aria-label={`${task.title} - ${task.assignee}`}
          aria-grabbed={snapshot.isDragging}
          tabIndex={0}
        >
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className="tag" aria-label={`Responsável ${task.assignee}`}>👤 {task.assignee}</span>
            {task.readonly && <span className="tag" aria-label="Somente leitura">🔒 readOnly</span>}
          </div>
        </article>
      )}
    </Draggable>
  )
}
