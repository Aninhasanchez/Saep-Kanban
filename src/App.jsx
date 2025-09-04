import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import KanbanBoard from './components/KanbanBoard'
import About from './pages/About'

export default function App(){
  const { pathname } = useLocation()
  return (
    <div className="container">
      <header className="header" role="banner">
        <div className="brand" aria-label="Aplicativo Kanban com acessibilidade">
          PWFE • Kanban DnD + ARIA
        </div>
        <nav aria-label="Navegação principal">
          <div className="toolbar" role="menubar">
            <Link className="btn" role="menuitem" to="/">Quadro</Link>
            <Link className="btn" role="menuitem" to="/sobre">Sobre</Link>
            <span aria-live="polite" className="sr-only">Você está em {pathname === '/' ? 'Quadro' : 'Sobre'}</span>
          </div>
        </nav>
      </header>
      <main role="main">
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </main>
      <footer>
        <p>Atalhos: Iniciar arraste com <kbd>Enter</kbd> em um cartão, mover com setas, soltar com <kbd>Enter</kbd> ou cancelar com <kbd>Esc</kbd>.</p>
      </footer>
    </div>
  )
}
