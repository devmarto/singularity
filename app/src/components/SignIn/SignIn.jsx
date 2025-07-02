import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { useFormik } from "formik";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    }
  })
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
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email Address</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Sign In
                </button>
            </form>
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