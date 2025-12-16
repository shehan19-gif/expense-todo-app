import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpensesList from '../components/expense/ExpensesList';
import { useExpenses } from '../hooks/useExpenses';
import ReactPaginateComponent from '../components/pagination/ReactPaginateComponent';
import { useClientPagination } from '../hooks/useClientPagination';
import ExpensesStats from '../components/expense/ExpensesStats';

import styles from './Expenses.module.css';

function Expenses() {
  const {expenses, loading, error, deleteExpense} = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    setFilteredExpenses(expenses.filter(expense => {
      const matchesCategory = categoryFilter === "all"? expense : expense.category === categoryFilter;

      const matchesPayment = paymentFilter === "all"? expense : expense.paymentMethod === paymentFilter;

      const matchesDate = dateFilter === ""? expense : expense.createdAt.split("T")[0] === dateFilter;

      return matchesCategory && matchesPayment && matchesDate;
    }));
  }, [expenses, categoryFilter, paymentFilter, dateFilter]);

  const {paginatedData, pagination, changePage} = useClientPagination(filteredExpenses, 1, 10);
  
  const handleDeleteExpense = async (id) => {
    return await deleteExpense(id);
  };

  const handlePageChange = (page) => {
    changePage(page);
  };

  // filters
  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    changePage(1);
  };

  const handlePaymentFilter = (e) => {
    setPaymentFilter(e.target.value);
    changePage(1);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
    changePage(1);
  };

  if(loading) return <div>Loading expenses...</div>;
  if(error) return <div>Error: {error}</div>

  return (
    <div className={styles.expenses}>
        <div className={styles.allTogether}>
          <h1>Expense Tracker</h1>

          <ExpensesStats
            expenses={expenses}
          />

          <div className={styles.expenses_filter}>

            <div className={styles.newFilterHolder}>
              <div>🔎 By Category: </div>
              <div>
                <select name="filter-category" id="filter-category" value={categoryFilter} onChange={handleCategoryFilter}>
                  <option value="all">All</option>
                  <option value="food">Food</option>
                  <option value="education">Education</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={styles.newFilterHolder}>
              <div>🔎 By Payment Method: </div>
              <div>
                <select name="filter-payment" id="filter-payment" value={paymentFilter} onChange={handlePaymentFilter}>
                  <option value="all">All</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="cheque">Cheque</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={styles.newFilterHolder}>
              <div>🔎 By Date: </div>
              <div>
                <input type="date" name="filter-date" id="filter-date" value={dateFilter} onChange={handleDateFilter} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.addExpensesBtnHolder}>
          <Link to="/expenses/add" className={styles.addExpensesBtn}>
              <button>+</button>
          </Link>
        </div>

        <ExpensesList
            expenses={paginatedData}
            onDelete={handleDeleteExpense}
        />

        <ReactPaginateComponent
          pagination={pagination}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default Expenses;