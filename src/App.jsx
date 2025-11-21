import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import './assets/styles/App.css';
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Selector from "./pages/Selector";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

// Protected route component
const ProtectedRoute = ({children}) => {
  const {user} = useAuth();
  return user? children : <Navigate to="/login" />
}

// Public route - redirect to selector if already logged in
const PublicRoute = ({children}) => {
  const {user, loading} = useAuth();

  if(loading) {
    return "loading...";
  }

  return !user? children : <Navigate to="/selector" />
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }/>
            <Route path="/forgot/password" element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/selector" element={
              <ProtectedRoute>
                <Selector />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/expenses" element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            } />
            <Route path="/expenses/add" element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            } />
            <Route path="/expenses/edit/:id" element={
              <ProtectedRoute>
                <EditExpense />
              </ProtectedRoute>
            } />
            <Route path="/todos" element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }/>
            <Route path="/todos/add" element={
              <ProtectedRoute>
                <AddTodo />
              </ProtectedRoute>
            } />
            <Route path="/todos/edit/:id" element={
              <ProtectedRoute>
                <EditTodo />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;