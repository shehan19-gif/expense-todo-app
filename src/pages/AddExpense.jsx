import React from 'react';
import ExpenseForm from '../components/expense/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';
import { useNavigate } from 'react-router-dom';

function AddExpense() {
  const {addExpense} = useExpenses();
  const navigate = useNavigate();

  const handleAddExpense = async (expenseData) => {
    const result = await addExpense(expenseData);
    if(result.success) {
        navigate("/expenses");
    }

    return result;
  };

  const handleCancel = () => {
    navigate("/expenses");
  }

  return (
    <div className="addExpense">
        <ExpenseForm
            onSubmit={handleAddExpense}
            onCancel={handleCancel}
        />
    </div>
  );
};

export default AddExpense;