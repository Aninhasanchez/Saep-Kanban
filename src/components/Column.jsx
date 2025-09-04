import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

export default function Column({ id, title, tasks, count, describedBy }){
  return (
    <section className="column" aria-labelledby={`${id}-title`} aria-describedby={describedBy} role="region">
      <header className="column-header">
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className={`badge badge--${id}`}></span>
          <h2 id={`${id}-title`} className="column-title">{title}</h2>
        </div>
        <span className="counter" aria-label={`Total de tarefas: ${count}`}>{count}</span>
      </header>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
            role="list"
            aria-label={`Lista ${title}`}
            aria-roledescription="Ambiente de soltura"
            tabIndex={0}
          >
            {tasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)}
            {provided.placeholder}
            <span className="sr-only">{snapshot.isDraggingOver ? 'Solte para mover para esta coluna' : ''}</span>
          </div>
        )}
      </Droppable>
    </section>
  )
}
