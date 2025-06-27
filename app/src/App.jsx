
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";





function App() {
  
  const [url, setUrl] = useState('');
  const [image, setImage] = useState()
  
  const MODEL_ID = 'face-detection';
  const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '676f5924e1c94770bab612c61b3df703';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;
}

  function handleInput(e) {
    setUrl(e.target.value)
  }

  function handleClick() {
    setImage(url)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(url))
      .then(response => response.json())
      .then(response => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        if (response) {
          fetch('http://localhost:5173/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: '0001'
            })
          })
            .then(response => response.json())
        }
      })
      .catch(err => console.log(err));
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
