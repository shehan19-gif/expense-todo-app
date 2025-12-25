import React from 'react';
import { Link } from 'react-router-dom';

import styles from './TodoItem.module.css';
import DescriptionBox from '../ui/DescriptionBox';

function TodoItem({todo, onDelete, onToggleComplete}) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  const handleToggle = () => {
    onToggleComplete(todo._id, todo.isCompleted);
  }

  return (
    <div className={todo.isCompleted ? `${styles.todoCompleted} ${styles.todoItem}` : todo.priority === 'high' ? `${styles.highPriority} ${styles.todoItem}` : todo.priority === 'medium' ? `${styles.mediumPriority} ${styles.todoItem}` : todo.priority === 'low' ? `${styles.lowPriority} ${styles.todoItem}` : ``}>
        <div className={styles.todoData}>
            <div className={styles.todoIsCompletedSec}>
                <h3 style={{textDecoration: todo.isCompleted? "line-through" : "none"}}>
                    {"📌 " + todo.title}
                </h3>
                <input type="checkbox" name="isCompleted" id="isCompleted" checked={todo.isCompleted} onChange={handleToggle} style={{cursor: "pointer"}} />
            </div>
            <p>{"⚡ Priority: " + todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</p>
            <p>{"🏷️ Category: " + todo.category}</p>
            {/* {todo.description && <p>{"📝 Description: " + todo.description}</p>} */}
            {todo.description && 
              <DescriptionBox data={todo.description} />
            }
            {todo.dueDate && (<p>⏳ Complete Before: {new Date(todo.dueDate).toLocaleDateString()}</p>)}
        </div>
        <div className={styles.todoAction}>
            <Link to={`/todos/edit/${todo._id}`}>
                <button className={styles.edit}>✏️ Edit</button>
            </Link>
            <button onClick={handleDelete} className={styles.delete}>🗑️ Delete</button>
        </div>
    </div>
  );
};

export default TodoItem;