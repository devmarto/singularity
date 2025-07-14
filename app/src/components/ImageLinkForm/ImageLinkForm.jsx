const ImageLinkForm = ({ inputChange, submitClick }) => {
  return (
    <div className="container pt-12 pb-6">
      <h1 className="text-4xl font-semibold text-center mb-2">Unleash our Vision Singularity. </h1>
      <p className='text-center'>
        {'Instantly detect the faces in your pictures. Git it a try.'}
      </p>
      <div className="flex gap-1 justify-center mt-8">
        <input className="w-full md max-w-xl h-[44px] rounded-lg bg-neutral-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6" type="url" onChange={inputChange} placeholder="https://www.image.com/example.jpeg"/>
        <button className="border-2 border-solid rounded-md px-4 bg-orange-600 text-base font-semibold text-white hover:bg-orange-500 focus-visible:outline-orange-600" onClick={submitClick}>
          Detect
        </button>
        </div>
    </div>
  )
}

export default ImageLinkForm;