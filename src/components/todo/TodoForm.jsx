import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import styles from "../../pages/Register.module.css";
import stylesForm from "../expense/ExpenseForm.module.css";

const TodoForm = ({onSubmit, initialData, onCancel}) => {
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
    priority: "medium",
    category: "",
    user: useAuth().user.userId,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if(initialData) {
        setFormData({
            title: initialData.title,
            dueDate: initialData.dueDate.split('T')[0],
            description: initialData.description || "",
            priority: initialData.priority || "medium",
            category: initialData.category,
            user: initialData.user
        });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await onSubmit(formData);

    if(!result.success) {
        setError(result.error);
    }
  };

  return (
    <div className={styles.register}>
        <form onSubmit={handleSubmit}>
            <h1 className={stylesForm.mainHeader}>{initialData ? 'Edit Todo' : 'Add a New Todo'}</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div className={stylesForm.formSection}>
                <div className="todoForm__title">
                    <label>Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="todoForm__date">
                    <label>Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required />
                </div>

                <div className="todoForm__description">
                    <label>Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={5} required />
                </div>

                <div className="todoForm__priority">
                    <label>Priority</label>
                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="todoForm__category">
                    <label>Category</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="education">Education</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="todoForm__actions">
                {onCancel && (
                    <button type="button" className={stylesForm.cancelBtn} onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button type="submit" className={stylesForm.addOrUpdateBtn}>
                    {initialData ? 'Update Todo' : 'Add Todo'}
                </button>
            </div>
        </form>
    </div>
  );
};

export default TodoForm;