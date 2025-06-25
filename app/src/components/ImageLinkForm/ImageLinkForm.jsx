const ImageLinkForm = ({ inputChange, submitClick }) => {
  return (
    <div className="container pt-12 pb-6">
      <p className='text-center'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className="flex gap-1 justify-center mt-4">
        <input className="border-2 border-solid rounded-md max-w-xl w-full py-[0.5rem] px-[0.75rem]" type="url" onChange={inputChange} />
        <button className="border-2 border-solid rounded-md px-4 bg-gray-200" onClick={submitClick}>Detect</button>
        </div>
    </div>
  )
}

export default ImageLinkForm;