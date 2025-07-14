import LogoDark from "../../LogoDark/LogoDark";
import Register from "../../Register/Register";
import facialRecognitionImg from "./facial-recognition.jpg";

const Auth = ({ children, title, primaryDescription, secondaryDescription}) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div 
        className="w-full hidden lg:block lg:w-2/5 bg-cover bg-center bg-no-repeat h-screen bg-black"
        style={{ backgroundImage: `url(${facialRecognitionImg})` }}
      >
        <div className="text-white p-10 h-full flex flex-col justify-between">
          <LogoDark align={'h-[96px] w-[72px]'}/>
          <div>
            <h1 className="text-4xl mb-4 font-bold">{title}</h1>
            <p className="text-xl font-light">{primaryDescription}</p>
            <p className="text-xl font-light">{secondaryDescription}</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/5">
        {children}
      </div>
    </div>
  )
}

export default Auth;