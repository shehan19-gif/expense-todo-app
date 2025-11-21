import React from 'react';
import { Link } from 'react-router-dom';
import TodoItem from './TodoItem';

import styles from '../../pages/Todos.module.css'

function TodoList({todos, onDelete, onToggleComplete, limit}) {
  const todosArray = [];

  if(todos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <div className={styles.todosList}>
        {todos.map(todo => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />
            ))
        }
    </div>
  );
};

export default TodoList;