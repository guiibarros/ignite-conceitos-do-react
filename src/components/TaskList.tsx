import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      document.querySelector('header .input-group input')?.classList.add('invalid-title');
      return;
    }

    const id = Date.now();

    const newTask = {
      id,
      title: newTaskTitle,
      isComplete: false,
    };

    setNewTaskTitle('');
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map(task => {
      const isComplete = !task.isComplete;

      const updatedTask = {
        ...task,
        isComplete,
      };

      return task.id === id ? updatedTask : task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={ (e) => setNewTaskTitle(e.target.value) }
            value={ newTaskTitle }
            onAnimationEnd={ e => e.currentTarget.classList.remove('invalid-title') }
          />

          <button type="submit" data-testid="add-task-button" onClick={ handleCreateNewTask }>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>{
          tasks.map(task => (
            <li key={ task.id }>
              <div className={ task.isComplete ? 'completed' : '' } data-testid="task">
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />

                  <span className="checkmark"></span>
                </label>

                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))
        }</ul>
      </main>
    </section>
  );
}