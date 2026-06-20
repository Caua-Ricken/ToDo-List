import React from 'react'
import { useState, useEffect } from 'react'
import "../../public/css/Tarefas.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

import VisualizarTask from '../components/VisualizarTask';

const Tarefas = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [abrirModal, setAbrirModal] = useState(false)
    const [taskDetails, setTaskDetails] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/tasks');
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);


    const deleteTask = async (id) => {
          const confirmDelete = window.confirm(
        'Deseja realmente excluir esta tarefa?'
    );

    if (!confirmDelete) return;

        setLoading(true);
        try { 
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Erro ao excluir tarefa');
        }

         await fetchTasks();
    } catch (error) {
           console.error('Erro ao excluir tarefa:', error);
    } finally {
        setLoading(false)
    }
    }


    const [pesquisa, setPesquisa] = useState('');

    const tarefasFiltradas = tasks.filter((task) =>
        task.title.toLowerCase().includes(pesquisa.toLowerCase()) ||
        task.description.toLowerCase().includes(pesquisa.toLowerCase())
    );


    const atualizarStatus = async (id) => {
        setLoading(true)
        try { 
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PATCH'
        });

        if (!res.ok) {
            throw new Error('Erro ao atualizar tarefa');
        }

        await fetchTasks();
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    } finally {
        setLoading(false)
    }
}

    return (
    <div className="container-tarefas">
    <h2>Lista de Tarefas</h2>

    <input
    type="text"
    className="search-input"
    placeholder="Pesquisar tarefa..."
    value={pesquisa}
    onChange={(e) => setPesquisa(e.target.value)}
/>

    {loading && <p>Carregando...</p>}

    {!loading && tasks.length === 0 && (
        <p>Nenhuma tarefa encontrada</p>
    )}

  <div className="tasks-grid">
    {tarefasFiltradas.map((task) => (
        <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                Data prevista: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
            </p>

            <span className={
                task.done === 0
                    ? "status-pendente"
                    : "status-concluida"
            }>
                {task.done === 0 ? "Pendente" : "Concluída"}
            </span>

            <div className="task-actions">
                <i className="bi bi-check-circle-fill confirm"
                   onClick={() => atualizarStatus(task.id)}></i>

                <i className="bi bi-pencil-square edit"></i>

                <i className="bi bi-eye-fill view"
                    onClick={() => {
                        setTaskDetails(task);
                        setAbrirModal(true);
                    }
                    }
                ></i>

                <i className="bi bi-trash-fill delete"
                   onClick={() => deleteTask(task.id)}></i>
            </div>
        </div>
    ))}
</div>
<VisualizarTask open={abrirModal} task={taskDetails} onClose={() => setAbrirModal(false)}/>
</div>
    )
}

export default Tarefas