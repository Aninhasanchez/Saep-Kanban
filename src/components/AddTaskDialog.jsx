import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().max(500).optional(),
  assignee: z.string().min(1, 'Obrigatório'),
  status: z.enum(['todo','doing','done']).default('todo')
})

export default function AddTaskDialog({ open, onClose, onSubmit }){
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title:'', description:'', assignee:'', status:'todo' }
  })

  function submit(data){
    onSubmit({ ...data, id:nanoid(), readonly:false })
    reset()
    onClose()
  }

  if(!open) return null
  return (
    <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="new-task-title">
      <div className="dialog">
        <h2 id="new-task-title">Nova tarefa</h2>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="field">
            <label htmlFor="title">Título *</label>
            <input id="title" placeholder="Ex: Implementar login" required {...register('title')} />
            {errors.title && <span className="error">{errors.title.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="description">Descrição</label>
            <textarea id="description" rows="4" {...register('description')} />
            {errors.description && <span className="error">{errors.description.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="assignee">Responsável *</label>
            <input id="assignee" placeholder="Nome" required {...register('assignee')} />
            {errors.assignee && <span className="error">{errors.assignee.message}</span>}
          </div>
          <div className="field">
            <label htmlFor="status">Status inicial</label>
            <select id="status" {...register('status')}>
              <option value="todo">A Fazer</option>
              <option value="doing">Fazendo</option>
              <option value="done">Concluído</option>
            </select>
          </div>
          <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:12}}>
            <button type="button" onClick={onClose} aria-label="Cancelar criação">Cancelar</button>
            <button type="submit" disabled={isSubmitting} aria-label="Salvar nova tarefa">Salvar</button>
          </div>
        </form>
        <p className="sr-only">Campos com * são obrigatórios. O formulário possui validação e prevenção a erros.</p>
      </div>
    </div>
  )
}
