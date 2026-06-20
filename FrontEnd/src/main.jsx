import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//rotas
import Cadastrar from './pages/Cadastrar.jsx'
import Tarefas from './pages/Tarefas.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Cadastrar />
      },
      {
        path: "/tarefas",
        element: <Tarefas />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
