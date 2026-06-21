import React from 'react'
import "../../public/css/VisualizarTask.css"

const VisualizarTask = ({open, task, onClose}) => {
  if (!open || !task) return null;

  return (
     <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Detalhes da Tarefa</h2>

        <div className="info-group">
          <span>Título</span>
          <p>{task.title}</p>
        </div>

        <div className="info-group">
          <span>Descrição</span>
          <p>{task.description}</p>
        </div>

        <div className="info-group">
          <span>Data Prevista</span>
          <p>
            {task.dueDate.split("T")[0].split("-").reverse().join("/")}
          </p>
        </div>

        <div className="info-group">
          <span>Status</span>
          <p>
            {task.done === 0 ? 'Pendente' : 'Concluída'}
          </p>
        </div>

        <button className="btn-close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  )
}

export default VisualizarTask