import './ChatStyle.css'
import React, { useRef, useState, useEffect } from 'react'
import { VscSend } from "react-icons/vsc"
<<<<<<< HEAD
import { MdDelete } from "react-icons/md"

export default function Chat(props) {

=======

export default function Chat(props) {

    const userId = localStorage.getItem('userId')

>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
    const bottomRef = useRef()
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])
    const [heightSendInput, setHeightSendInput] = useState(40)
<<<<<<< HEAD
    const [displayIcon, setDisplayIcon] = useState('none')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        localStorage.getItem('messages') && setMessageList(JSON.parse(localStorage.getItem('messages')))
    }, [])
=======
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f

    useEffect(() => {
        localStorage.getItem('messages') && setMessageList(JSON.parse(localStorage.getItem('messages')))
    }, [])

    useEffect(() => {

        props.socket.on('recive_message', data => {

<<<<<<< HEAD
            setMessageList(current => {
                const upadateMessage = [...current, data]
                localStorage.setItem('messages', JSON.stringify(upadateMessage))
=======

            setMessageList(current => {
                const upadateMessage = [...current, data]
                localStorage.setItem('messages', JSON.stringify(upadateMessage))
                //localStorage.clear()
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
                return upadateMessage
            })
        })

        return () => {
            props.socket.off('recive_message')
        }
    }, [props.socket])

    useEffect(() => {
        scrollDown()
    }, [messageList])

<<<<<<< HEAD
    const clearDatas = () => {
        localStorage.clear()
        window.location.reload()
    }
    
=======
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
    const clearInput = () => messageRef.current.value = ''

    const focusInput = () => messageRef.current.focus()

    const scrollDown = () => bottomRef.current.scrollIntoView()

<<<<<<< HEAD
    const input_lines = () => {
        const textarea = messageRef.current
        const lineCount = textarea.value.split('\n').length
        if (lineCount < 8) {
            setHeightSendInput(lineCount == 1 ? 40 : lineCount * 24 + 16)
        }
    }

=======
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
    const getEnterKey = (e) => {
        if (e.code === 'Enter') {
            if (e.shiftKey || e.ctrlKey) {
                const textarea = messageRef.current
                const start = textarea.selectionStart
                const end = textarea.selectionEnd
                textarea.value = `${textarea.value.substring(0, start)}\n${textarea.value.substring(end)}`
                textarea.selectionStart = textarea.selectionEnd = start + 1

<<<<<<< HEAD
                input_lines()
=======
                const lineCount = textarea.value.split('\n').length
                if (lineCount <= 5) {
                    setHeightSendInput(prev => prev += 24)
                }
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
            } else {
                handleSubmit()
            }
            e.preventDefault()
        }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
    const isLastTwoMessagesSameAuthor = (index) => {
        if (index > 0) {
            return messageList[index].authorId === messageList[index - 1].authorId
        }
        return false
    }

    const handleSubmit = () => {
        const message = messageRef.current.value
        if (!message.trim()) return

        props.socket.emit('message', message)
        clearInput()
        focusInput()
<<<<<<< HEAD
        setHeightSendInput(40)
=======
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
    }

    return (
        <div className='chat'>
<<<<<<< HEAD

            <button className='delete-button' title='apagar todos os dados' onClick={() => clearDatas()}>
                <MdDelete className='delete-icon' />
            </button>

=======
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
            <div className='chat-area'>
                <div className='conversation'>
                    {
                        messageList.map((message, index) => (
<<<<<<< HEAD
                            <div key={index} className={`message-area
                                ${message.authorId === userId ? 'my-message-area' : 'other-message-area'}
                                ${isLastTwoMessagesSameAuthor(index) && 'pasted-message'}`}>

                                <div className={`message ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                                    <p className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                                        ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}
                                    </p>

                                    <span>{message.text}</span>
=======
                            <div key={index} className={`message-area 
                                ${message.authorId === userId ? 'my-message-area' : 'other-message-area'}
                                ${isLastTwoMessagesSameAuthor(index) && 'pasted-message'}`}>

                                {/* {console.log(message.authorId)} */}
                                {/* {console.log(userId)} */}

                                <div className={`message ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                                    <p
                                        className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                                        ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}:
                                    </p>

                                    <p>{message.text}</p>
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f

                                    <p className='time'>{message.time}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>

                <div className='input-area'>
                    <textarea type="text" style={{ height: `${heightSendInput}px` }}
<<<<<<< HEAD
                        className='send-input' ref={messageRef} placeholder='Mensagem'
                        onKeyDown={e => getEnterKey(e)} onChange={input_lines} />
=======
                        className='send-input' ref={messageRef} onKeyDown={e => getEnterKey(e)} placeholder='Mensagem' />
>>>>>>> 499637a358951496cbb1b36a2312fb8167bcb80f
                    <button className='send-button' onClick={() => handleSubmit()}><VscSend className='send-icon' /></button>
                </div>
            </div>
        </div>
    )
}