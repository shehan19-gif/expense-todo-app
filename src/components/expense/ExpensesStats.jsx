import React, { useEffect, useRef, useState } from 'react';

import styles from './ExpensesStats.module.css';

function ExpensesStats({expenses}) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || !expenses.length) return;
    expenses.map((expense, key) => {
        if(expense.type === "income") {
            setTotalIncome(pre => pre + expense.amount);

            if(Number(expense.createdAt.split("T")[0].split("-")[1]) === (new Date().getMonth() + 1)) {
                setMonthlyIncome(pre => pre + expense.amount);
            }
            return;
        }

        if(expense.type === "expense") {
            setTotalSpend(pre => pre + expense.amount);

            if(Number(expense.createdAt.split("T")[0].split("-")[1]) === (new Date().getMonth() + 1)) {
                setMonthlySpend(pre => pre + expense.amount);
            }
            return;
        }
    });
    hasRun.current = true;
  }, []);

  return (
    <div className={styles.statsMain}>
      <div className={styles.statsSection}>
        <div className={styles.statsTotal}>
          <p className={styles.statsTotalIncome}>
            <span className={styles.totalIncome}>Total Income</span> <br />
            <span className={styles.statsDigit}>Rs. {totalIncome}</span>
          </p>
          <p className={styles.statsTotalSpend}>
            <span className={styles.totalSpend}>Total Spend</span> <br />
            <span className={styles.statsDigit}>Rs. {totalSpend}</span>
          </p>
          <p className={styles.statsTotalSaved}>
            <span className={styles.totalSaved}>Total Saved</span> <br />
            <span className={styles.statsDigit}>Rs. {totalIncome - totalSpend}</span>
          </p>
        </div>
        <div className={styles.statsMonthly}>
          <p className={styles.statsMonthlyIncome}>
            <span className={styles.monthlyIncome}>Monthly Income</span>
            <span className={styles.statsDigit}>Rs. {monthlyIncome}</span>
          </p>
          <p className={styles.statsMonthlySpend}>
            <span className={styles.monthlySpend}>Monthly Spend</span>
            <span className={styles.statsDigit}>Rs. {monthlySpend}</span>
          </p>
          <p className={styles.statsMonthlySaved}>
            <span className={styles.monthlySaved}>Monthly Saved</span>
            <span className={styles.statsDigit}>Rs. {monthlyIncome - monthlySpend}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExpensesStats;