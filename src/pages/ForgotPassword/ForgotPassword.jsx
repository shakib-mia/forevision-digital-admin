import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const ForgotPassword = () => {
    const handleSubmit = e => {
        e.preventDefault();

        console.log(e.target['email'].value);
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">

            <form className="shadow-lg rounded-xl p-6 w-1/2" onSubmit={handleSubmit}>
                <h1 className="text-heading-4-bold mb-4 text-center">Admin Forgot Password</h1>

                <div className="flex flex-col gap-3 items-center">
                    <InputField name="email" type="email" label="Email" containerClassName="w-full" id="login-email" placeholder="Enter Your Email Address" />
                </div>

                <div className='mt-2 text-center'>
                    <Button type={'submit'} text={"Submit"}></Button>
                </div>

                <div className="text-right">
                    <Link to={'/login'} className="text-primary underline hover:no-underline">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;