
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

function App() {

  const [url, setUrl] = useState('');
  const [image, setImage] = useState('')

  function handleInput(e) {
    setUrl(e.target.value)
  }

  function handleClick() {
    setImage(url)

  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <Rank />
        <ImageLinkForm inputChange={handleInput} submitClick={handleClick}/>
        <FaceRecognition image={image}/>
      </div>
    </>
  )
}

export default App;
