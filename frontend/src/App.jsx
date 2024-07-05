import { useState } from 'react'

import './App.css'
import Message from './Message';


function App() {
  

  const [code,setCode] = useState("")

  const handleSubmit=(e)=>{
      e.preventDefault();

  }
 
return (
  <>
<div className= {`${code=="Nikita" && "hidden"}`}>
    <div className='h-[100vh] bg-blue-500 flex flex-col gap-4 items-center justify-center   '>
      <form onSubmit={handleSubmit}>
      <input
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className='outlin rounded-xl h-8' type="text" />
      
      </form>
      </div>
</div>
{code=="Nikita" && <Message />}
</>
  )
}

export default App
