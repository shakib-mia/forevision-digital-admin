import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import RequireAuth from './RequireAuth.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth>
      <Home />
    </RequireAuth>,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
