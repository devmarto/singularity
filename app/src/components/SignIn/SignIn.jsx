import { useState } from "react";
import { NavLink } from "react-router";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";


const SignIn = ({ loadUser }) => {

  const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-4 w-full">
        <label className="block text-base font-bold text-gray-900 pb-1 mb-2" htmlFor={props.id || props.name}>{label}</label>
        <input className="block w-full h-[44px] rounded-lg bg-neutral-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs font-normal pt-1">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const PassInput = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    const [type, setType] = useState('password');
    const [showPassIcon, setShowPassIcon] = useState(<RiEyeCloseLine className="cursor-pointer"/>);
    const handleShowPass = () => {
      if (type === 'password') {
        setType('text');
        setShowPassIcon(<RiEyeLine className="cursor-pointer"/>)
      } else {
        setType('password');
        setShowPassIcon(<RiEyeCloseLine className="cursor-pointer"/>)
      }
    }
    return (
      <div className="mb-4 w-full relative">
        <label className="block text-base font-bold text-gray-900 pb-1 mb-2" htmlFor={props.id || props.name}>{label}</label>
        <input className="block w-full h-[44px] rounded-lg bg-neutral-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" {...field} {...props} type={type} />
        <span className="flex justify-around items-center absolute top-[65%] left-[92%]" onClick={handleShowPass}>
            {showPassIcon}
        </span>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs font-normal pt-1">{meta.error}</div>
        ) : null}
      </div>
    )
  }

  let navigate = useNavigate();
  return (
     <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 max-h-screen h-full lg:px-8">
        <div className="max-w-full w-[475px] mx-auto">
          <div>
            <h2 className="lg:mt-5 mt-3 text-center lg:text-4xl text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10">

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .required('Password is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    fetch ('http://localhost:3000/login', {
                      method: 'post',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        email: values.email,
                        password: values.password
                      })
                    })
                      .then(response => response.json())
                      .then(user => {
                        console.log('SignIn: ', user)
                        if(user && user.id) {
                          loadUser(user);
                          navigate('/');
                        } else {
                          toast.error('Incorrect email or password. Please try again.');
                        }
                      })
                      .catch(error => {
                        console.error('Erro no login:', error);
                        toast.error('Error logging in. Please try again.');
                      })
                  setSubmitting(true);
                }, 400);
              }}
            >
              <Form>
                <TextInput label="E-mail" name="email" type="email" />
                <PassInput label="Password" name="password" />

                <button
                  type="submit"
                  className="flex w-full justify-center items-center gap-4 rounded-md bg-orange-600 p-3 text-base font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-8"
                >
                  <span>Sign In</span>
                  <FaArrowRightLong />
                </button>
              </Form>
            </Formik>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <NavLink to="/register" className="font-semibold text-orange-600 hover:text-orange-500">Create an Account</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn;