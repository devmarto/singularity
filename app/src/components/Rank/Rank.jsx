const Rank = ({name, entries}) => {
  return (
    <div className="container text-center">
      <div className='text-4xl font-semibold'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='text-4xl font-semibold mt-4'>
        {`#${entries}`}
      </div>
    </div>
  )
}

export default Rank;