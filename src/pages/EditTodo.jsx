import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TodoForm from '../components/todo/TodoForm';
import { todosAPI } from '../utils/api';

function EditTodo() {
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [todo, setTodo] = useState(location.state?.todo || null);
  const [loading, setLoading] = useState(!location.state?.todo);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!location.state?.todo) {
        const fetchTodo = async () => {
            try {
                const response = await todosAPI.getById(id);
                const todoData = response.data || response;
                setTodo(todoData);
            } catch(err) {
                setError(err.message || 'Failed to fetch todo');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }
  }, [id, location.state]);

  const handleUpdateTodo = async (todoData) => {
    try {
      const response = await todosAPI.update(id, todoData);
      const updatedTodo = response.data || todoData;
      // navigate("/todos");
      return { success: true, message: "Successfully Updated", updatedTodo };
    } catch(err) {
      setError(err.message || 'Failed to update todo');
      return { success: false, error: "Update Unsuccessfull!" };
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/todos");
  };

  if (loading) return <div>Loading todo...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="editTodo">
        <TodoForm
            onSubmit={handleUpdateTodo}
            initialData={todo}
            onCancel={handleCancel}
        />
    </div>
  );
};

export default EditTodo;