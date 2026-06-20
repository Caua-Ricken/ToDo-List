import React, { useState, useEffect } from "react";
import "../../public/css/Tarefas.css";

const EditarTask = ({ open, task, onClose, taskUpdate }) => {
  const [loading, setLoading] = useState(false);

  const hoje = new Date();
const dataMinima = hoje.toLocaleDateString("en-CA");

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);

  if (!open || !task) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/edit/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar tarefa");
      }

      taskUpdate();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Tarefa</h2>

        <form onSubmit={updateTask}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Data Prevista</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              min={dataMinima}
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Confirmar"}
          </button>

          <button className="cancel-btn" type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarTask;