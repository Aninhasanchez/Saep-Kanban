import React from 'react'

export default function About(){
  return (
    <section aria-labelledby="about-title">
      <h1 id="about-title">Sobre</h1>
      <p>Este projeto demonstra um Kanban acessível com Drag & Drop por mouse e teclado, uso de ARIA, validações de formulário e persistência local.</p>
      <ul>
        <li>Prevenção a erros: validação com Zod + react-hook-form, campos required/readOnly.</li>
        <li>ARIA: roles, rótulos, live regions e foco visível.</li>
        <li>Hooks: state, effect, react-router-dom, dnd e zod.</li>
      </ul>
    </section>
  )
}
