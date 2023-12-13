import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();

        axios.post(backendUrl + 'login', { email: e.target["login-email"].value, password: e.target["login-password"].value }).then(res => {
            if (res.data.token.length) {
                localStorage.setItem("token", res.data.token)
                navigate("/")
            }
        })
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

            </form>
        </div>
    );
};

export default Login;