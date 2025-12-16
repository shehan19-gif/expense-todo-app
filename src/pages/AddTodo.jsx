import React from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/todo/TodoForm';
import { useTodos } from '../hooks/useTodos';

function AddTodo() {
  const {addTodo} = useTodos();
  const navigate = useNavigate();

  const handleAddTodo = async (todoData) => {
    const result = await addTodo(todoData);

    if(result.success) {
      return {
        success: true,
        message: "Successfully Created!",
        type: "new"
      };
    }

    return { success: false, error: "Can't Add a Todo!" };
  };

  const handleCancel = () => {
    navigate("/todos");
  };

  return (
    <div className="addTodo">
      <TodoForm
        onSubmit={handleAddTodo}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddTodo;