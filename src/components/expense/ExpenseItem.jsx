import React from 'react';
import {Link} from "react-router-dom";

import styles from './ExpenseItem.module.css';

function ExpenseItem({expense, onDelete}) {
  const handleDelete = () => {
    if(window.confirm("Are you sure want to delete this expense?")) {
        onDelete(expense._id);
    }
  };
  
  return (
    <div className={expense.type === "income" ? `${styles.expenseTypeIncome} ${styles.expenseItem}` : `${styles.expenseTypeOutcome} ${styles.expenseItem}`}>
        <div className={styles.expenseData}>
          <div className={styles.firstSec}>
            <p className={styles.amount}>Amount: Rs. {expense.amount}</p>
            <p className={styles.category}>Category: {expense.category}</p>
          </div>
          <div className={styles.secondSec}>
            <p className={styles.payment}>Payment Method: {expense.paymentMethod}</p>
          </div>
          <div className={styles.thirdSec}>
            <p className={styles.description}>Description: {expense.description}</p>
            {expense.note && <p className={styles.note}>Note: {expense.note}</p>}
          </div>
          <div className={styles.fourthSec}>
            <p className={styles.date}>Date: {new Date(expense.date).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className={styles.expenseAction}>
            <Link to={`/expenses/edit/${expense._id}`} state={{expense}}>
                <button className={styles.edit}>Edit</button>
            </Link>

            <button onClick={handleDelete} className={styles.delete}>Delete</button>
        </div>
    </div>
  );
};

export default ExpenseItem;