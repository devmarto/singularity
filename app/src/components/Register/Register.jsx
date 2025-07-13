import { useState } from "react";
import { NavLink } from "react-router";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { FaArrowRightLong } from "react-icons/fa6";
import { RiEyeCloseLine, RiEyeLine, RiCloseLargeLine } from "react-icons/ri";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'


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
         <div className="control_indicator"></div>
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="text-red-500 text-xs font-normal pt-1">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 const [terms, setTerms] = useState(false);

  let navigate = useNavigate();
  return (
     <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 max-h-screen h-full lg:px-8">
        <div className="max-w-full w-[475px] mx-auto">
          <div className="text-center lg:mb-10 mb-5">
            <h2 className="lg:mt-5 mt-3 text-center lg:text-4xl text-2xl font-bold tracking-tight text-gray-900">
              Register Now!
            </h2>
            <p className="lg:text-xl text-base font-light mt-2 lg:mt-4">Register now to start your journey!</p>
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
                <div className="lg:flex block gap-4">
                  <TextInput label="First Name" name="firstName" type="text" />
                  <TextInput label="Last Name" name="lastname" type="text" />
                </div>
                <TextInput label="E-mail" name="email" type="email" />
                <TextInput label="Phone" name="phone" type="text" />
                <PassInput label="Password" name="password" />
                <PassInput label="Confirm Password" name="confirmPassword" />
                <CheckTerms name="acceptedTerms">
                  <span>I read and agree to <span className="font-bold underline" onClick={() => setTerms(true)}>Terms of Conditions</span></span>
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

      <Dialog open={terms} onClose={setTerms} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setTerms(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <RiCloseLargeLine aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-xl font-semibold text-gray-900">Terms of Conditions</DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div class="container">
                      <header>
                          <p><strong>Effective Date:</strong> <code>July 12, 2025</code></p>
                      </header>
                      <main>
                          <p className="pb-2">Welcome to Singularity!</p>
                          <p className="pb-2">These Terms and Conditions ("Terms") govern your access to and use of the Singularity web application, website, and services (collectively, the "Service"), owned and operated by <strong>Singularity</strong> ("we," "us," or "our").</p>
                          <p className="pb-2">By creating an account, accessing, or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Service.</p>

                          <h2 className="py-2 font-bold">1. Description of the Service</h2>
                          <p className="pb-2">Singularity is a web application that utilizes artificial intelligence (AI) and facial recognition technology for purposes such as user authentication, identity verification, and other related features as described within the application. The Service works by capturing, processing, and comparing facial geometric data.</p>

                          <h2 className="py-2 font-bold">2. Eligibility and User Accounts</h2>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>Eligibility:</strong> You must be at least 18 years old or the age of legal majority in your jurisdiction to use the Service. By using the Service, you represent and warrant that you meet this requirement.</li>
                              <li className="pb-2"><strong>Account Registration:</strong> You must register for an account to access the Service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
                              <li className="pb-2"><strong>Account Security:</strong> You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to comply with this security obligation.</li>
                          </ul>

                          <h2 className="py-2 font-bold">3. Biometric Data, Consent, and Privacy</h2>
                          <p className="pb-2">This section is critically important. Your use of the Service involves the collection and processing of Biometric Data.</p>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>Definition:</strong> "Biometric Data" includes facial scans, facial geometry, and any other biometric identifiers or information derived from your facial features that we collect to provide the Service.</li>
                              <li className="pb-2">
                                  <strong>EXPLICIT CONSENT:</strong>
                                  <strong>By checking the box to agree to these Terms and by using our Service, you expressly acknowledge and provide your voluntary, informed, and explicit consent for us to collect, capture, store, use, and process your Biometric Data for the purposes outlined below:</strong>
                                  <ul className="list-disc mb-2">
                                      <li className="pb-2">To create and secure your user account.</li>
                                      <li className="pb-2">To authenticate your identity when you log in or access secure features.</li>
                                      <li className="pb-2">To verify your identity for security purposes.</li>
                                      <li className="pb-2">To improve the accuracy and performance of our facial recognition AI models.</li>
                                      <li className="pb-2">To prevent fraud, abuse, and security incidents.</li>
                                  </ul>
                              </li>
                              <li className="pb-2"><strong>Data Storage and Security:</strong> We implement commercially reasonable technical, administrative, and physical security measures to protect your Biometric Data from unauthorized access, use, or disclosure. Your Biometric Data is encrypted both in transit and at rest.</li>
                              <li className="pb-2"><strong>Data Retention:</strong> We will retain your Biometric Data only for as long as is necessary to fulfill the purposes for which it was collected, including for the duration your account is active, or as required by applicable law. Upon termination of your account, we will permanently and securely delete your Biometric Data in accordance with our data retention policies and applicable law.</li>
                              <li className="pb-2"><strong>Privacy Policy:</strong> Our collection and use of personal information, including Biometric Data, are also governed by our <strong><a href="">Privacy Policy</a></strong>. Please review it carefully to understand our practices.</li>
                          </ul>

                          <h2 className="py-2 font-bold">4. User Conduct and Prohibited Uses</h2>
                          <p className="pb-2">You agree not to use the Service for any unlawful purpose or in any way that could harm us, our service providers, or any other person. You specifically agree not to:</p>
                          <ul className="list-disc mb-2">
                              <li className="pb-2">Scan, upload, or process the facial data of any individual other than yourself without their explicit, prior, and informed consent.</li>
                              <li className="pb-2">Use the Service for surveillance, monitoring, or identification of individuals in public spaces.</li>
                              <li className="pb-2">Use the Service to harass, stalk, defame, or discriminate against any individual or group.</li>
                              <li className="pb-2">Attempt to "spoof," trick, or otherwise deceive the facial recognition system with photos, videos, masks, or any other means.</li>
                              <li className="pb-2">Reverse-engineer, decompile, or disassemble any aspect of the Service, including the AI models.</li>
                              <li className="pb-2">Use the Service in any manner that violates any applicable local, state, national, or international law or regulation.</li>
                          </ul>

                          <h2 className="py-2 font-bold">5. Intellectual Property Rights</h2>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>Our Intellectual Property:</strong> The Service and its entire contents, features, and functionality (including but not limited to all software, AI models, algorithms, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Singularity, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</li>
                              <li className="pb-2"><strong>Your Data:</strong> You retain all ownership rights to your personal data, including your Biometric Data. You grant us a worldwide, non-exclusive, royalty-free license to use, process, and store your data solely for the purpose of providing and improving the Service as described in these Terms and our Privacy Policy.</li>
                          </ul>

                          <h2 className="py-2 font-bold">6. Disclaimers</h2>
                          <p className="pb-2">THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>Accuracy Disclaimer:</strong> You acknowledge that AI and facial recognition technology are not infallible and may be subject to error. We do not warrant that the Service will be 100% accurate, uninterrupted, or error-free. There may be instances of false positives (incorrectly identifying a person) or false negatives (failing to identify a person). We disclaim all liability for any inaccuracies, errors, or failures of the Service.</li>
                              <li className="pb-2"><strong>No Warranty:</strong> We do not warrant that the Service will meet your requirements, operate without interruption, or be secure or free from bugs, viruses, or other harmful components.</li>
                          </ul>

                          <h2 className="py-2 font-bold">7. Limitation of Liability</h2>
                          <p className="pb-2">TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SINGULARITY, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, INCLUDING YOUR BIOMETRIC DATA.</p>
                          <p className="pb-2">IN NO EVENT SHALL OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS ($100.00) OR THE AMOUNT YOU PAID US, IF ANY, IN THE LAST 12 MONTHS.</p>

                          <h2 className="py-2 font-bold">8. Indemnification</h2>
                          <p className="pb-2">You agree to defend, indemnify, and hold harmless Singularity and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Service; (ii) your violation of any term of these Terms; or (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right, including any claims arising from your use of the Service to process the data of others without their consent.</p>

                          <h2 className="py-2 font-bold">9. Termination</h2>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>By You:</strong> You can terminate your account at any time by using the account deletion feature within the Service or by contacting us.</li>
                              <li className="pb-2"><strong>By Us:</strong> We may suspend or terminate your access to the Service at any time, with or without cause or notice, for any reason, including, but not limited to, if we believe you have violated these Terms.</li>
                              <li className="pb-2"><strong>Effect of Termination:</strong> Upon termination, your right to use the Service will immediately cease, and we will proceed with the deletion of your data as described in our Privacy Policy and Section 3 of these Terms.</li>
                          </ul>

                          <h2 className="py-2 font-bold">10. Changes to the Terms</h2>
                          <p className="pb-2">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Service after any such change constitutes your acceptance of the new Terms.</p>

                          <h2 className="py-2 font-bold">11. Governing Law and Dispute Resolution</h2>
                          <p className="pb-2">These Terms shall be governed by the laws of <code>Brazil</code>, without regard to its conflict of law provisions. Any dispute arising from these Terms or your use of the Service shall be resolved in the state or federal courts located in <code>São Paulo</code>.</p>

                          <h2 className="py-2 font-bold">12. Miscellaneous</h2>
                          <ul className="list-disc mb-2">
                              <li className="pb-2"><strong>Entire Agreement:</strong> These Terms and our Privacy Policy constitute the entire agreement between you and Singularity regarding the Service.</li>
                              <li className="pb-2"><strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.</li>
                          </ul>
                      </main>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Register;