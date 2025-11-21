import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from '../components/expense/ExpenseForm';
import { expensesAPI } from '../utils/api';

function EditExpense() {
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [expense, setExpense] = useState(location.state?.expense || null);
  const [loading, setLoading] = useState(!location.state?.expense);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!location.state?.expense) {
      const fetchExpense = async () => {
        try {
          const response = await expensesAPI.getById(id);
          const expenseData = response.data || response;
          setExpense(expenseData);
        } catch(err) {
          setError(err.message || 'Failed to fetch expense');
        } finally {
          setLoading(false);
        }
      }

      fetchExpense();
    }
  }, [id, location.state]);

  const handleUpdateExpense = async (expenseData) => {
    try {
      const response = await expensesAPI.update(id, expenseData);
      const updatedExpense = response.data || expenseData;
      // navigate('/expenses');
      return { success: true, updatedExpense };
    } catch(err) {
      setError(err.message || 'Failed to update expense');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/expenses");
  };

  if (loading) return <div>Loading expense...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!expense) return <div>Expense not found</div>;

  return (
    <div className="editExpense">
        <h1>Edit Expense</h1>
        <ExpenseForm
            onSubmit={handleUpdateExpense}
            initialData={expense}
            onCancel={handleCancel}
        />
    </div>
  );
};

export default EditExpense;