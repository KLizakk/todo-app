import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
 
    </div>
  );
}

export default TodoItem;
