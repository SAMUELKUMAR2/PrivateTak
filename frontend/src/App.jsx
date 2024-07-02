import { useState } from 'react'

import './App.css'
import MessageForm from './MessageForm'

function App() {
  

  return (
    <>
    <div className='flex flex-col w-[100vw] h-[100vh] items-center justify-center bg-slate-700'>
      <h3 className=' p-2 font-bold text-white shadow-emerald-300'>Message</h3>
      <div className="mb-8 w-full lg:w-[90vw] flex items-end ">
      <MessageForm />
      </div>
    </div>
     </>
  )
}

export default App
