import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import MessageButton from '../ui/MessageButton';
import styles from "../../pages/Register.module.css";
import stylesForm from "../expense/ExpenseForm.module.css";

const TodoForm = ({onSubmit, initialData, onCancel}) => {
  const userId = useAuth().user.userId;

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
    priority: "medium",
    category: "",
    user: userId,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
        const result = await onSubmit(formData);

        if(result.success) {
            setSuccess(result.message);
            if(result.type == "new") {
                setFormData(() => ({
                    title: "",
                    dueDate: "",
                    description: "",
                    priority: "medium",
                    category: "",
                    user: userId,
                }));
            }
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
            <h1 className={stylesForm.mainHeader}>{initialData ? 'Edit Todo' : 'Add a New Todo'}</h1>
            {error && <MessageButton type="error" message={error} func1={setSuccess} func2={setError}/>}
            {success && <MessageButton type="success" message={success} func1={setSuccess} func2={setError}/>}

            <div className={stylesForm.formSection}>
                <div className="todoForm__title">
                    <label>📌 Title:</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="todoForm__date">
                    <label>⏳ Due Date: </label>
                    <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required />
                </div>

                <div className="todoForm__description">
                    <label>📝 Description: </label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={5} required />
                </div>

                <div className="todoForm__priority">
                    <label>⚡ Priority: </label>
                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="todoForm__category">
                    <label>🏷️ Category: </label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="🎯 Focus">🎯 Focus</option>
                        <option value="💼 Work">💼 Work</option>
                        <option value="🏠 Personal">🏠 Personal</option>
                        <option value="🛒 Shopping">🛒 Shopping</option>
                        <option value="🏃 Fitness">🏃 Fitness</option>
                        <option value="📚 Learning">📚 Learning</option>
                        <option value="👨‍👩‍👧‍👦 Family">👨‍👩‍👧‍👦 Family</option>
                        <option value="⏰ Urgent">⏰ Urgent</option>
                        <option value="📊 Projects">📊 Projects</option>
                        <option value="📈 Goals">📈 Goals</option>
                        <option value="✍️ Writing">✍️ Writing</option>
                        <option value="📅 Planning">📅 Planning</option>
                        <option value="🏡 Home">🏡 Home</option>
                        <option value="💰 Finance">💰 Finance</option>
                        <option value="📋 Errands">📋 Errands</option>
                        <option value="🥗 Health">🥗 Health</option>
                        <option value="🧘 Self-care">🧘 Self-care</option>
                        <option value="😴 Sleep">😴 Sleep</option>
                        <option value="🍎 Diet">🍎 Diet</option>
                        <option value="📖 Reading">📖 Reading</option>
                        <option value="💡 Ideas">💡 Ideas</option>
                        <option value="🎨 Creative">🎨 Creative</option>
                        <option value="🧠 Skill">🧠 Skill</option>
                        <option value="👯 Friends">👯 Friends</option>
                        <option value="❤️ Love">❤️ Love</option>
                        <option value="🎉 Events">🎉 Events</option>
                        <option value="📞 Calls">📞 Calls</option>
                        <option value="💻 Computer">💻 Computer</option>
                        <option value="📱 Digital">📱 Digital</option>
                        <option value="📧 Email">📧 Email</option>
                        <option value="🔧 Maintenance">🔧 Maintenance</option>
                        <option value="🌅 Morning">🌅 Morning</option>
                        <option value="🌙 Evening">🌙 Evening</option>
                        <option value="📆 Weekly">📆 Weekly</option>
                        <option value="📅 Monthly">📅 Monthly</option>
                        <option value="✨ Bucket List">✨ Bucket List</option>
                        <option value="🎁 Gifts">🎁 Gifts</option>
                        <option value="🚗 Travel">🚗 Travel</option>
                        <option value="🏠 Home Improvement">🏠 Home Improvement</option>
                        <option value="Other">Other</option>
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