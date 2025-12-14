// API base url
// const API_BASE_URL = "http://localhost:8080/api/";
const API_BASE_URL = "https://expense-todo-app-backend.vercel.app/api/";

const handleResponse = async (response) => {
    if (response.status === 401) {
        throw new Error('Unauthorized');
    }

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }
    
    return response.json();
};

const request = (endpoint, options = {}) => {
    const config = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        ...options,
    }

    if(config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    return fetch(`${API_BASE_URL}${endpoint}`, config)
    .then(handleResponse)
    .catch(error => {
      if (error.message !== 'Unauthorized') {
        console.error('API request failed:', error);
      }
      
      throw error;
    });
};

// Auth API
export const authAPI = {
    login: (credentials) => request("auth/login", {method: "POST", body: credentials}),
    register: (userData) => request("auth/signup", {method: "POST", body: userData}),
    logout: () => request("auth/logout", {method: "POST"}),
    verifyAuth: () => request("auth/verify", {method: "GET"}),
};

// Expenses API
export const expensesAPI = {
    getAll: () => request("expenses", {method: "GET"}),
    getById: (id) => request(`expenses/${id}`, {method: "GET"}),
    create: (expense) => request("expenses/create", {method: "POST", body: expense}),
    update: (id, expense) => request(`expenses/${id}`, {method: "PUT", body: expense}),
    delete: (id) => request(`expenses/${id}`, {method: "DELETE"}), 
};

// Todos API
export const todosAPI = {
    getAll: () => request("todos", {method: "GET"}),
    getById: (id) => request(`todos/${id}`, {method: "GET"}),
    create: (todo) => request("todos/create", {method: "POST", body: todo}),
    update: (id, todo) => request(`todos/${id}`, {method: "PUT", body: todo}),
    delete: (id) => request(`todos/${id}`, {method: "DELETE"}),
};

// User API
export const userAPI = {
    getUser: () => request("user/profile", {method: "GET"}),
    updateUserData: (userData) => request("user/profile/update", {method: "PUT", body: userData}),
    updateUserCredentials: (credentials) => request("user/profile/credentials/update", {method: "PUT", body: credentials}),
    delete: () => request("user/profile/delete", {method: "DELETE"}),
    updatePasswordExternal: (passwordData) => request("user/forgot/password", {method: "PUT", body: passwordData}),
};