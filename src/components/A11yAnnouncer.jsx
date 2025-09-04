import React from 'react'

/**
 * Região de anúncio para leitores de tela. Use setMessage para narrar ações.
 */
export default function A11yAnnouncer({ message }){
  return (
    <div aria-live="polite" className="sr-only" role="status">{message}</div>
  )
}
