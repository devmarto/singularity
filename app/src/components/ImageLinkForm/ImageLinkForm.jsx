const ImageLinkForm = () => {
  return (
    <div className="container py-12">
      <p className='text-center'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className="flex gap-1 justify-center mt-4">
        <input className="border-2 border-solid rounded-md" type="text" />
        <button className="border-2 border-solid rounded-md px-4 bg-gray-200">Detect</button>
        </div>
    </div>
  )
}

export default ImageLinkForm;