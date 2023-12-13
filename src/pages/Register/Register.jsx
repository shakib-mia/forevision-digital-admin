import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../constants';

const Register = () => {
    const handleSubmit = e => {
        e.preventDefault();
        if (e.target.password.value === e.target.confirmPassword.value) {
            const body = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            axios.post(backendUrl + 'register', body).then(res => console.log(res.data))
        }
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">

            <form className="shadow-lg rounded-xl p-6 w-1/2" onSubmit={handleSubmit}>
                <h1 className="text-heading-4-bold mb-4 text-center">Admin Register</h1>

                <div className="flex flex-col gap-3 items-center">
                    <InputField name="email" type="email" label="Email" containerClassName="w-full" id="register-email" placeholder="Enter Your Email Address" />
                    <InputField name="password" type="password" label="Password" containerClassName="w-full" id="register-password" placeholder="Enter Your Password Address" />
                    <InputField name="confirmPassword" type="password" label="Confirm Password" containerClassName="w-full" id="register-confirm-password" placeholder="Confirm Your Password Address" />
                    <Button text="Login" type="submit" />
                </div>

                <p className='text-center'>Already Have An Account <Link to={"/"} className='text-secondary underline'>Login</Link></p>

            </form>
        </div>
    );
};

export default Register;