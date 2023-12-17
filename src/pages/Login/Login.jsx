import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { backendUrl } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { setStore, store } = useContext(AppContext)
    const handleSubmit = e => {
        e.preventDefault();

        axios.post(backendUrl + 'login', { email: e.target["login-email"].value, password: e.target["login-password"].value }).then(res => {
            // console.log(res.data.toke);
            if (res.data.token.length) {
                localStorage.setItem("token", res.data.token)
                setStore({ ...store, token: res.data.token })
                navigate("/")
            }
        }).catch(error => toast.error(error.response.data.message, {
            position: "bottom-center"
        }))
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">

            <form className="shadow-lg rounded-xl p-6 w-1/2" onSubmit={handleSubmit}>
                <h1 className="text-heading-4-bold mb-4 text-center">Admin Login</h1>

                <div className="flex flex-col gap-3 items-center">

                    <InputField name="login-email" type="email" label="Email" containerClassName="w-full" id="login-email" placeholder="Enter Your Email Address" />
                    <InputField name="login-password" type="password" label="Password" containerClassName="w-full" id="login-password" placeholder="Enter Your Password Address" />
                    <Button text="Login" type="submit" />
                </div>
                <div className="text-right">
                    <Link to={'/forgot-password'} className="text-primary underline hover:no-underline">Forgot Your Password?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;