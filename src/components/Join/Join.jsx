import React, {useRef} from 'react'
import io from 'socket.io-client'

export default function Join(props) {

    const usernameRef = useRef()

    const handleSubmit = async () => {
        const username = usernameRef.current.value
        if (!username.trim()) return
        const socket = await io.connect('https://back-chat-8mup.onrender.com/')
        socket.emit('set_username', username)
        props.setSocket(socket)
        props.setChatVisibility(true)
    }

    const getEnterKey = (e) => {
        if (e.code === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} onKeyDown={(e) => getEnterKey(e)} placeholder='Nome do usuário' />
            <button onClick={() => handleSubmit()}>Entrar</button>
        </div>
    )
}