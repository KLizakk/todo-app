import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    }

    async function addTask(text) {
      try {
          const response = await axios.post('http://localhost:5000/tasks', { text });
          setTasks([...tasks, response.data]);
          setText('');
      } catch (error) {
          console.error('Error adding task:', error);
      }
  }
  

    function deleteTask(id) {
      try {
          axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
              setTasks(tasks.filter(task => task.id !== id));
          });
      } catch (error) {
          console.error('Error deleting task:', error);
      }
  }
  function toggleCompleted(id) {
    try {
        axios.put(`http://localhost:5000/tasks/${id}`).then(response => {
            setTasks(tasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                } else {
                    return task;
                }
            }));
        });
    } catch (error) {
        console.error('Error toggling task completion:', error);
    }
}
async function uncheckAllTasks() {
  try {
      await axios.put('http://localhost:5000/tasksu', { completed: false });
      setTasks(tasks.map(task => ({ ...task, completed: false })));
  } catch (error) {
      console.error('Error unchecking all tasks:', error);
  }
}
return (
  <div className="todo-list">
      <button onClick={uncheckAllTasks}>Uncheck All</button>
      {tasks.map(task => (
          <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
          />
      ))}
      <input
          value={text}
          onChange={e => setText(e.target.value)}
      />
      <button onClick={() => addTask(text)}>Add</button>
  </div>
);
}

export default TodoList;

