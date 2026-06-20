import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Meu To-Do</h1>

        <nav>
          <NavLink to="/">Cadastrar</NavLink>
          <NavLink to="/tarefas">Tarefas</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App