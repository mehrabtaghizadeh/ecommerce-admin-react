import React from 'react'

function Erorr() {
  return (
    <div className='flex justify-center items-center max-h-screen p-12'>
      <div className='flex flex-col justify-center items-center gap-3 p-12'>
      <h2 className='text-red text-2xl'>404 error</h2>
      <p className='text-red text-xl'>صفحه در دسترس نمی باشد!</p>
      </div>
    </div>
  )
}

export default Erorr