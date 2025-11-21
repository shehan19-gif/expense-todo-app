import { useEffect, useState } from "react";
import {todosAPI} from "../utils/api";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await todosAPI.getAll();
            const todosData = response.data || [];
            setTodos(todosData);
        } catch(err) {
            setError(err.message);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todoData) => {
        try {
            const response = await todosAPI.create(todoData);
            const newTodo = response.data || todoData;
            setTodos(prev => [newTodo, ...prev]);
            return { success: true };
        } catch(err) {
            return {success: false, error: err.message};
        }
    };

    const deleteTodo = async (id) => {
        try {
            await todosAPI.delete(id);
            setTodos(prev => prev.filter(todo => todo._id !== id));
            return {success: true};
        } catch(err) {
            return {success: false, error: err.message};
        }
    };

    const updateTodo = async (id, todoData) => {
        try {
            const response = await todosAPI.update(id, todoData);
            const updatedTodo = response.data || todoData;

            setTodos(prev => prev.map(todo => 
                todo._id === id ? {...updatedTodo, id} : todo
            ));

            return { success: true };
        } catch(err) {
            return { success: false, error: err.message };
        }
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        deleteTodo,
        updateTodo,
        refetch: fetchTodos
    };
};