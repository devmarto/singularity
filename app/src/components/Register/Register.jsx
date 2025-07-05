import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";


const Register = ({loadUser}) => {

  const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-4">
        <label className="block text-sm/6 font-medium text-gray-900 pb-1" htmlFor={props.id || props.name}>{label}</label>
        <input className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" {...field} {...props} />
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm shadow-xl rounded-2xl p-6 bg-[rgba(252, 185, 162, 0.15)]">
          <div className="">
            <Logo align={"mx-auto h-24 w-auto"} />
            <h2 className="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-900">
              Register
            </h2>
          </div>

          <div className="">
            <Formik
              initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('First Name is required'),
                lastName: Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .required('Last Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .required('Password is required'),
                confirmPassword: Yup.string()
                  .min(8, 'Must be 8 characters or more')
                  .oneOf([Yup.ref('password'), null], 'Passwords no match')
                  .required('Confirm password is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  fetch ('http://localhost:3000/register', {
                      method: 'post',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        name: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword
                      })
                    })
                      .then(response => response.json())
                      .then(data => {
                        if(data)  {
                          loadUser(data);
                          navigate('/login');
                        } else {
                          console.log('Error')
                        }
                      })
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(true);
                }, 400);
              }}
            >

              <Form>
                <TextInput label="First Name" name="firstName" type="text" />
                <TextInput label="Last Name" name="lastName" type="text" />
                <TextInput label="E-mail Address" name="email" type="email" />
                <TextInput label="Password" name="password" type="password" />
                <TextInput label="Confirm Password" name="confirmPassword" type="password" />

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 mt-8"
                >
                  Register
                </button>
              </Form>
            </Formik>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              If you already have an account? {' '}
              <NavLink to="/login" className="font-semibold text-orange-600 hover:text-orange-500">Sign In</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;