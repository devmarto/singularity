import Logo from "../../Logo/Logo";
import Register from "../../Register/Register";
import facialRecognitionImg from "./facial-recognition.jpg";

const Auth = ({loadUser}) => {
  return (
    <div className="flex">
      <div 
        className="w-2/5 bg-cover bg-center bg-no-repeat h-screen bg-black"
        style={{ backgroundImage: `url(${facialRecognitionImg})` }}
      >
        <div className="text-white p-10 h-full flex flex-col justify-end">
          <h1 className="text-4xl mb-4 font-bold">Create Your Account Now!</h1>
          <p className="text-xl font-light">Join us to experience the future of identity.</p>
          <p className="text-xl font-light">Create an account to harness the power of AI for instant, reliable, and personalized recognition.</p>
        </div>
      </div>
      <div className="w-3/5">
        <Register loadUser={loadUser} />
      </div>
    </div>
  )
}

export default Auth;