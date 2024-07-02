import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  
const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);

//Scroll bottom
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/add', { content: message })
      .then(response => {

        console.log(response.data);
        setMessage(''); // Clear the input field after submission
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  //HandleDelete
  const handleDelete = (e) => {

    axios.delete('http://localhost:5000/add')
      .then(response => {

        console.log(response.data);

      })
      .catch(error => {
        console.error('There was an error!', error);
      })

    window.location.reload();
  };

  useEffect(() => {
    axios.get('http://localhost:5000/add').then((messages) => {
      setMessageData(messages.data)
      console.log(messages.data[0].content);
    })
      .catch(err => console.log(err))

      scrollToBottom();
  }, [message])



  return (
    <div className='w-[100%]' >

      <div className='bg-blue-400 h-[80vh] lg:h-[70vh] overflow-y-scroll'>
        {messageData.map(message => (
          
            <div ref={messagesEndRef} key={message._id} className='m-2 w-fit p-2 pl-4 border-2 bg-purple-300 rounded-[15px] rounded-bl-none'>
              {message.content}

            </div>
            
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='mt-5  ml-2 mr-2'>
      <form onSubmit={handleSubmit}>
        <input
        className=' w-[60%] md:w-[50%] lg:w-[50%]  outline-1 p-2 text-wrap rounded-[10px] '
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button className='ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type="submit">Send</button>
        <button className='ml-3 bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full' onClick={handleDelete}>Delete</button>

      </form>
      </div>
    </div>
  );
};


export default MessageForm;
