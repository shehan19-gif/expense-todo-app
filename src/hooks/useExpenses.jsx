import { useEffect, useState } from "react";
import {expensesAPI} from "../utils/api";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await expensesAPI.getAll();
            const expenseData = response.data || [];
            setExpenses(expenseData);
        } catch(err) {
            setError(err.message);
            setExpenses([]);
        } finally {
            setLoading(false);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await expensesAPI.create(expenseData);
            const newExpense = response.data || expenseData;
            setExpenses(newExpense);
            return {success: true};
        } catch(err) {
            return {success: false, error: err.message};
        }
    };

    const deleteExpense = async (id) => {
        try {
            await expensesAPI.delete(id);
            setExpenses(prev => prev.filter(expense => expense._id !== id));
            return {success: true};
        } catch(err) {
            return {success: false, error: err.message};
        }
    };

    return {
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
        refetch: fetchExpenses
    };
};