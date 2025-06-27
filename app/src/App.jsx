
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";





function App() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState()
  const [boxes, setBoxes] = useState([]);

  const MODEL_ID = 'face-detection';
  const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = import.meta.env.VITE_CLARIFAI_PAT;
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
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

  function calculateFaceLocation(data) {
    const regions = data.outputs[0].data.regions;
    if (regions.length > 0) {
      const imageUpload = document.getElementById('imageUpload');
      const imageWidth = imageUpload.offsetWidth;
      const imageHeight = imageUpload.offsetHeight;
      const faceBoxes = regions.map((region, index) => {
        const boundingBox = region.region_info.bounding_box;
        const leftCol = boundingBox.left_col * imageWidth;
        const topRow = boundingBox.top_row * imageHeight;
        const rightCol = boundingBox.right_col * imageWidth;
        const bottomRow = boundingBox.bottom_row * imageHeight;
        const width = rightCol - leftCol;
        const height = bottomRow - topRow;
        return {
          id: index,
          left: leftCol,
          top: topRow,
          width: width,
          height: height
        };
      });
      setBoxes(faceBoxes);
    } else {
      setBoxes([]);
  }
}

  function handleClick() {
    setImage(url)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(url))
      .then(response => response.json())
      .then(response => {
        calculateFaceLocation(response);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <Rank />
        <ImageLinkForm inputChange={handleInput} submitClick={handleClick}/>
        <FaceRecognition boxes={boxes} image={image}/>
      </div>
    </>
  )
}

export default App;
