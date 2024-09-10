import './JoinStyle.css'
import React, { useRef, useEffect } from 'react'
import io from 'socket.io-client'

export default function Join(props) {

    useEffect(() => {
        let userId = localStorage.getItem('userId') 
        let username = localStorage.getItem('username') 

        if (userId && username) {
            
<<<<<<< HEAD
            const socket = io.connect('http://localhost:3001', {
=======
            const socket = io.connect('https://back-chat-8mup.onrender.com', {
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
                query: { userId } // Passa o userId na query ao conectar ao servidor
            })

            socket.emit('set_username', localStorage.getItem('username'))
            props.setSocket(socket)
            props.setChatVisibility(true)

            socket.emit('set_username', username)
        }

        if (!userId) {
            userId = crypto.randomUUID()  // Gera um UUID único para o usuário
            localStorage.setItem('userId', userId)  // Armazena no localStorage
        }
    }, [])

    const usernameRef = useRef()

    const handleSubmit = async () => {

        const username = usernameRef.current.value
        if (!username.trim()) return

        const userId = localStorage.getItem('userId') // Pega o userId do localStorage
<<<<<<< HEAD
        const socket = await io.connect('http://localhost:3001', {
=======
        const socket = await io.connect('https://back-chat-8mup.onrender.com', {
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
            query: { userId }  // Envia o userId ao conectar
        })

        socket.emit('set_username', username)
        localStorage.setItem('username', username)
        props.setSocket(socket)
        props.setChatVisibility(true)
    }

    const getEnterKey = (e) => {
        if (e.code === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div className='cadastro'>
            <h1>Cadastro</h1>

            <div className="input-group">
                <input
                    className="input-text"
                    name="text" type="text"
                    placeholder="Type here" autoComplete='off'
                    ref={usernameRef} onKeyDown={(e) => getEnterKey(e)}
                />
                <label className="input-text-label" htmlFor="text">Nome do usuário</label>
            </div>

            <button className='register-button' onClick={() => handleSubmit()}>Entrar</button>
        </div>
    )
}