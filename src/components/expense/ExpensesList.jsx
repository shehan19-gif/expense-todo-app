import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';

import styles from '../../pages/Expenses.module.css';

function ExpensesList({expenses, onDelete}) {
  const [count, setCount] = useState(0);
  const expensesArray = [];
  
  if(expenses.length === 0) {
    return <p>No expenses found. Add your first expense!</p>
  };

  return (
    <div className={styles.expensesList}>
        {expenses.map(expense => (
                <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    onDelete={onDelete}
                />
          ))
        }
    </div>
  );
};

export default ExpensesList;