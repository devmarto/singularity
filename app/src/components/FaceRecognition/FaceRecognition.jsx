const FaceRecognition = ({ image, boxes }) => {
  const colors = ['border-indigo-500', 'border-red-500', 'border-green-500', 'border-yellow-500', 'border-purple-500'];

  return (
    <div className="max-w-2xl w-full h-auto pb-6 relative">
      <img id="imageUpload" className="rounded-lg w-full" src={image} alt="" />
      {boxes && boxes.length > 0 && boxes.map((box) => (
        <div 
          key={box.id}
          className={`absolute border-4 ${colors[box.id % colors.length]} pointer-events-none`}
          style={{
            left: `${box.left}px`,
            top: `${box.top}px`,
            width: `${box.width}px`,
            height: `${box.height}px`
          }}
        >
          <span className={`absolute -top-6 left-0 ${colors[box.id % colors.length].replace('border', 'bg')} text-white px-2 py-1 text-xs rounded`}>
            Face {box.id + 1}
          </span>
        </div>
      ))}
    </div>
  )
}

export default FaceRecognition;