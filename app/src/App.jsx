
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import { Routes, Route, Navigate } from "react-router";
import Register from "./components/Register/Register";
import { ToastContainer } from 'react-toastify';
import Auth from "./components/templates/Auth/Auth";
import Usage from "./components/Usage/Usage";
import Plans from "./components/Plans/Plans";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState()
  const [boxes, setBoxes] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  })

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name:user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    })
  }

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

  function onImageSubmit() {
    setImage(url)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(url))
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch ('https://singularity-api.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id,
            })
          })
            .then(response => response.json())
            .then(count => {
                setUser(Object.assign(user, {entries: count}))
            })
        }
        calculateFaceLocation(response);
      })
      .catch(err => console.log(err));
  }

  const handleSignOut = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    });
  };


  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute user={user}>
            <Navigation name={user.name} entries={user.entries} onSignOut={handleSignOut}/>
            <div className="flex flex-col justify-center items-center">
              <ImageLinkForm inputChange={handleInput} submitClick={onImageSubmit}/>
              <FaceRecognition boxes={boxes} image={image}/>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/usage" element={
          <ProtectedRoute user={user}>
            <Navigation name={user.name} entries={user.entries} onSignOut={handleSignOut}/>
            <Usage entries={user.entries}/>
          </ProtectedRoute>
        }/>
        <Route path="/plans" element={
          <ProtectedRoute user={user}>
            <Navigation name={user.name} entries={user.entries} onSignOut={handleSignOut}/>
            <Plans />
          </ProtectedRoute>
        }/>
        <Route path="/login" element={
          user.id ? (
            <Navigate to="/" replace />
          ) : (
            <Auth
              title="Welcome Back!"
              primaryDescription="Continue your journey into the future of identity."
              secondaryDescription="Sign in to access your account and use the power of AI for instant, reliable, and personalized recognition."
            >
              <SignIn loadUser={loadUser}/>
            </Auth>
          )
          }
        />
        <Route path="/register" element={
            user.id ? (
              <Navigate to="/" replace />
            ) : (
              <Auth
                title="Create Your Account Now!"
                primaryDescription="Join us to experience the future of identity."
                secondaryDescription="Create an account to harness the power of AI for instant, reliable, and personalized recognition."
              >
                <Register loadUser={loadUser} />
              </Auth>
            )
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App;