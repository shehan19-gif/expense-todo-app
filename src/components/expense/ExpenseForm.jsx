import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import styles from "../../pages/Register.module.css";
import stylesForm from "./ExpenseForm.module.css";

function ExpenseForm({onSubmit, initialData, onCancel}) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    paymentMethod: "",
    description: "",
    note: "",
    user: useAuth().user.userId,
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if(initialData) {
        setFormData({
            amount: initialData.amount.toString(),
            type: initialData.type,
            category: initialData.category,
            date: initialData.date.split("T")[0],
            paymentMethod: initialData.paymentMethod,
            description: initialData.description || "",
            note: initialData.note || "",
            user: initialData.user,
        });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    try {
        const result = await onSubmit({
            ...formData,
            amount: parseFloat(formData.amount),
        });

        if(result.success) {
            setStatus("Successfully updated");
        } else {
            setError(result.error || "An error occurred");
        }

    } catch(e) {
        setError("An unexpected error occurred");
    }
    
  };

  return (
    <div className={styles.register}>
        <form onSubmit={handleSubmit}>
            <h1 className={stylesForm.mainHeader}>{initialData? "" : "Add New Expense"}</h1>
            {error && <div>{error}</div>}
            {status && <div>{status}</div>}

            <div className={stylesForm.formSection}>
                <div className="expenseForm__amount">
                    <label>Amount</label>
                    <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} step={0.01} required />
                </div>

                <div className="formData__type">
                    <label>Type</label>
                    <label>
                        <input type="radio" name="type" id="type" value={"income"} checked={formData.type === "income"} onChange={handleChange} />
                        Income
                    </label>
                    <label>
                        <input type="radio" name="type" id="type" value={"expense"} checked={formData.type === "expense"} onChange={handleChange} />
                        Expense
                    </label>
                </div>

                <div className="expenseForm__category">
                    <label>Category</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="expenseForm__date">
                    <label>Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="formData__payment-method">
                    <label>Payment Method</label>
                    <label>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value={"cash"} checked={formData.paymentMethod === "cash"} onChange={handleChange} />
                        Cash
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value={"card"} checked={formData.paymentMethod === "card"} onChange={handleChange} />
                        Card
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value={"cheque"} checked={formData.paymentMethod === "cheque"} onChange={handleChange} />
                        Cheque
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" id="paymentMethod" value={"other"} checked={formData.paymentMethod === "other"} onChange={handleChange} />
                        Other
                    </label>
                </div>

                <div className="formData__description">
                    <label>Description</label>
                    <textarea name='description' value={formData.description} onChange={handleChange} rows={5} required />
                </div>

                <div className="formData__note">
                    <label>Note</label>
                    <textarea name='note' value={formData.note} onChange={handleChange} rows={2} />
                </div>
            </div>

            <div className="expenseForm__actions">
                {onCancel && (
                    <button type="button" className={stylesForm.cancelBtn} onClick={onCancel}>Cancel</button>
                )}

                <button type="submit" className={stylesForm.addOrUpdateBtn}>
                    {initialData? "Update Expense" : "Add Expense"}
                </button>
            </div>
        </form>
    </div>
  );
};

export default ExpenseForm;