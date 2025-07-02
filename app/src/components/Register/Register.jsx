import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { useFormik } from "formik";

 const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required'
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
     errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = `Passwords don't match`;
  } else if (values.confirmPassword < 8) {
    errors.confirmPassword = 'Must be 8 characters or more';
  }


  return errors;


 }

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    }
  })
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
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">Name</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

              <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Lastname</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-mail Address</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Register
              </button>

            </form>
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