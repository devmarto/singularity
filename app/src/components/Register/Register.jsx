import { NavLink } from "react-router";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { FaArrowRightLong } from "react-icons/fa6";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useState } from "react";


const Register = ({loadUser}) => {

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

  const CheckTerms = ({ children, ...props }) => {
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <div className="control-group">
       <label className="control control-checkbox">
         <input type="checkbox" {...field} {...props} />
         <div class="control_indicator"></div>
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="text-red-500 text-xs font-normal pt-1">{meta.error}</div>
       ) : null}
     </div>
   );
 };

  let navigate = useNavigate();
  return (
     <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 max-h-screen h-full lg:px-8">
        <div className="max-w-full w-[475px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="mt-5 text-center text-4xl font-bold tracking-tight text-gray-900">
              Register Now!
            </h2>
            <p className="text-xl font-light mt-4">Register now to start your journey!</p>
          </div>

          <div className="">
            <Formik
              initialValues={{
                firstName: '',
                lastname: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptedTerms: false,
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('First Name is required'),
                lastname: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Last Name is required'),
                phone: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Phone is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .required('Password is required'),
                confirmPassword: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .oneOf([Yup.ref('password'), null], 'Passwords no match')
                  .required('Confirm password is required'),
                acceptedTerms: Yup.boolean()
                  .required('Required')
                  .oneOf([true], 'You must accept the terms and conditions.'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  fetch ('http://localhost:3000/register', {
                      method: 'post',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        name: values.firstName,
                        lastname: values.lastname,
                        phone: values.phone,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword
                      })
                    })
                      .then(response => response.json())
                      .then(user => {
                        console.log(user);
                        if(user && user.id)  {
                          loadUser(user);
                          navigate('/login');
                        } else if (user && user.error) {
                          toast.error('Error registering. Please try again.');
                        } else {
                          toast.error('Error registering. Please try again.');
                        }
                      })
                  setSubmitting(true);
                }, 400);
              }}
            >

              <Form>
                <div className="flex gap-4">
                  <TextInput label="First Name" name="firstName" type="text" />
                  <TextInput label="Last Name" name="lastname" type="text" />
                </div>
                <TextInput label="E-mail" name="email" type="email" />
                <TextInput label="Phone" name="phone" type="text" />
                <PassInput label="Password" name="password" />
                <PassInput label="Confirm Password" name="confirmPassword" />
                <CheckTerms name="acceptedTerms">
                  <span>I agree to <span className="font-bold underline">Terms of Conditions</span> and <span className="font-bold underline">Privacy of Policy</span></span>
                </CheckTerms>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center gap-4 rounded-md bg-orange-600 p-3 text-base font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-8"
                >
                  <span> Sign Up</span>
                  <FaArrowRightLong />
                </button>
              </Form>
            </Formik>
            <p className="mt-5 text-center text-sm/6 text-gray-500">
              If you already have an account? {' '}
              <NavLink to="/login" className="font-semibold text-orange-600 hover:text-orange-500 underline">Sign In</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;