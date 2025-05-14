import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  const API_URL = 'http://localhost:3030/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle
      });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !taskToUpdate.completed
      });

      setTasks(tasks.map(task =>
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  const updateTask = async (id) => {
    if (!editingTaskTitle.trim()) return;

    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: editingTaskTitle
      });

      setTasks(tasks.map(task =>
        task.id === id ? response.data : task
      ));
      setEditingTaskId(null);
      setEditingTaskTitle('');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>

      <div className="task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nova tarefa..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-info">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && updateTask(task.id)}
                />
              ) : (
                <span className="task-title">{task.title}</span>
              )}
              <span className="task-date">{formatDate(task.created_at)}</span>
            </div>
            {editingTaskId === task.id ? (
              <button onClick={() => updateTask(task.id)}className='save-btn'>Salvar</button>
            ) : (
              <button onClick={() => {
                setEditingTaskId(task.id);
                setEditingTaskTitle(task.title);
              }} className='edit-btn'>
                Editar
              </button>
            )}
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;