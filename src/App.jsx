// import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import RequireAuth from './RequireAuth.jsx';
import { AppContext } from './contexts/AppContext.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from './constants.js';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';

export const App = () => {
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

        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
    ]);

    // const store = {}
    const [store, setStore] = useState({
        token: localStorage.getItem("token")
    });

    // console.log();
    // const path = window.location.href.split("/")[window.location.href.split("/").length - 1]

    // console.log(path);


    useEffect(() => {
        const config = {
            headers: {
                token: store.token
            }
        }

        if (store.token) {

            axios.get(backendUrl + 'platforms', config).then(({ data }) => setStore({ ...store, platforms: data }))
        }

    }, [store.token])

    // console.log(store);

    return (
        <AppContext.Provider value={{ store, setStore }}>
            <RouterProvider router={router} />
            <ToastContainer />
        </AppContext.Provider>
    );
};

// export default App;