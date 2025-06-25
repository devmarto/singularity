const FaceRecognition = ({ image }) => {
  return (
    <div className="max-w-2xl w-full h-auto pb-6">
      <img className="rounded-lg" src={image} alt="" />
    </div>
  )
}

export default FaceRecognition;