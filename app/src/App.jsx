
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

function App() {

  const [url, setUrl] = useState('');

  function handleInput(e) {
    setUrl(e.target.value)
  }

  function handleClick() {
    console.log(url);
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <Rank />
        <ImageLinkForm inputChange={handleInput} submitClick={handleClick}/>
      </div>
    </>
  )
}

export default App;
