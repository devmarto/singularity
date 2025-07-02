import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignIn = () => {
  return (
     <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 max-h-screen h-full lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm shadow-xl rounded-2xl p-6 bg-[rgba(252, 185, 162, 0.15)]">
          <div>
              <Logo align={"mx-auto h-24 w-auto"} />
            <h2 className="mt-10 text-center text-2xl/9 tracking-tight font-semibold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10">
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Sign in
                  </button>
                </Form>
              )}
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