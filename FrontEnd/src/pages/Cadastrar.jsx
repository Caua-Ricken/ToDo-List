import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../public/css/Cadastrar.css'

const Cadastrar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const hoje = new Date();
const dataMinima = hoje.toLocaleDateString("en-CA");

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://todo-list-ajcm.onrender.com/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            if (res.ok) {
                navigate('/tarefas');
            }
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
        } finally {
            setLoading(false);
            setTask({
                title: '',
                description: '',
                dueDate: '',
            });
        }
    };

    return (
        <div className="container">
            <h2>Cadastrar Tarefa</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Data Prevista</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        min={dataMinima}
                        value={task.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default Cadastrar;