import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../components/todo/TodoList';
import { useTodos } from '../hooks/useTodos';
import ReactPaginateComponent from '../components/pagination/ReactPaginateComponent';
import {useClientPagination} from '../hooks/useClientPagination';

import styles from './Todos.module.css';

function Todos() {
  const {todos, loading, error, deleteTodo, updateTodo} = useTodos();

  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    setFilteredTodos(todos.filter(todo => {
      const matchesFilter = filter === "all"? todo : (filter === "completed")? todo.isCompleted === true : todo.isCompleted === false;
      
      const matchesPriority = priorityFilter === "all"? todo : todo.priority === priorityFilter;
      
      const matchesCategory = categoryFilter === "all"? todo : todo.category === categoryFilter;
      
      const matchesDate = dateFilter === ""? todo : todo.createdAt.split("T")[0] === dateFilter;

      return matchesFilter && matchesPriority && matchesCategory && matchesDate;
    })
  )}, [todos, filter, priorityFilter, categoryFilter, dateFilter]);

  const {paginatedData, pagination, changePage} = useClientPagination(filteredTodos, 1, 10);

  const handlePageChange = (page) => {
    changePage(page);
  };

  const handleDeleteTodo = async (id) => {
    return await deleteTodo(id);
  };

  const handleToggleComplete = async (id, isCompleted) => {
    const todoResult = todos.find(todo => todo._id === id);

    if(todoResult) {
        await updateTodo(id, { ...todoResult, isCompleted: !isCompleted });
    }
  };

  // filters

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    changePage(1);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
    changePage(1);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    changePage(1);
  };

  const handleDateFilter = (e) => {
    console.log(e.target.value)
    setDateFilter(e.target.value);
    changePage(1);
  };

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.todos}>
      <div className={styles.allTogether}>
        <h1>Todo List</h1>

        <div className={styles.todos_filter}>
          <div className={styles.todosFiltersHolder}>
            <div>🔎 By Task: </div>
              <div>
              <select name="fiter-select" id="filter-select" value={filter} onChange={handleFilterChange}>
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className={styles.todosFiltersHolder}>
            <div>🔎 By Priority: </div>
            <div>
              <select name="filter-priority" id="filter-priority" value={priorityFilter} onChange={handlePriorityFilter}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>

          <div className={styles.todosFiltersHolder}>
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

          <div className={styles.todosFiltersHolder}>
            <div>🔎 By Date: </div>
            <div>
              <input type="date" name="filter-date" id="filter-date" value={dateFilter} onChange={handleDateFilter} />
            </div>
          </div>
        </div>
      </div>

        <div className={styles.addTodosBtnHolder}>
          <Link to="/todos/add" className={styles.addTodosBtn}>
              <button>+</button>
          </Link>
        </div>

        <TodoList 
            todos={paginatedData}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
        />

        <ReactPaginateComponent
          pagination={pagination}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default Todos;