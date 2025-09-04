# PWFE - Kanban com Drag & Drop e ARIA

Projeto React (Vite) com:
- Drag & Drop com `@hello-pangea/dnd` (mouse e teclado).
- ARIA (roles, aria-labels, aria-live, regions) e ordem de tabulação amigável.
- Prevenção a erros com validação (Zod + React Hook Form), `required` e exemplo de `readOnly`.
- Hooks: `useState`, `useEffect`, `useMemo`, `react-router-dom`, DnD e Zod.
- Persistência em `localStorage`.
- Comentários no código guiando critérios de usabilidade.

## Rodar
```bash
npm i
npm run dev
```

## Estrutura
- `src/components/KanbanBoard.jsx`: lógica do board e persistência.
- `src/components/Column.jsx`: coluna droppable.
- `src/components/TaskCard.jsx`: cartão draggable com atributos ARIA.
- `src/components/AddTaskDialog.jsx`: formulário com validação.
- `src/components/A11yAnnouncer.jsx`: live region para anúncios.
- `src/utils/validation.js`: schemas Zod e storage.
