
import Navigation from "./components/Navigation/Navigation"
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

function App() {

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <Rank />
        <ImageLinkForm />
      </div>
    </>
  )
}

export default App;
