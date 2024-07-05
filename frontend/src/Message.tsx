import React, { useState } from 'react'
import MessageForm from './MessageForm';


const Message = () => {
  
   
  return (
    <>
  <div className='flex mb-3 flex-col items-center justify-center bg-slate-700'>
<div className="mb-4 w-full lg:w-[97vw] flex items-end ">
 <MessageForm />
 </div>
</div> 
  </>
  )
}


export default Message