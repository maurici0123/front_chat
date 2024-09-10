import './App.css'
import { useState } from 'react'
import Chat from './components/Chat/Chat.jsx'
import Join from './components/Join/Join.jsx'

export default function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className='main'>
      {
        chatVisibility ? (<Chat socket={socket} />) : (<Join setChatVisibility={setChatVisibility} setSocket={setSocket} />)
      }
    </div>
  )
}