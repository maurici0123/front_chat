import './ChatStyle.css'
import React, { useRef, useState, useEffect } from 'react'
import { VscSend } from "react-icons/vsc"
import { MdDelete } from "react-icons/md"

export default function Chat(props) {

    const bottomRef = useRef()
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])
    const [heightSendInput, setHeightSendInput] = useState(40)
    const [displayIcon, setDisplayIcon] = useState('none')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        localStorage.getItem('messages') && setMessageList(JSON.parse(localStorage.getItem('messages')))
    }, [])

    useEffect(() => {
        localStorage.getItem('messages') && setMessageList(JSON.parse(localStorage.getItem('messages')))
    }, [])

    useEffect(() => {

        props.socket.on('recive_message', data => {

            setMessageList(current => {
                const upadateMessage = [...current, data]
                localStorage.setItem('messages', JSON.stringify(upadateMessage))
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

    const clearDatas = () => {
        localStorage.clear()
        window.location.reload()
    }
    
    const clearInput = () => messageRef.current.value = ''

    const focusInput = () => messageRef.current.focus()

    const scrollDown = () => bottomRef.current.scrollIntoView()

    const input_lines = () => {
        const textarea = messageRef.current
        const lineCount = textarea.value.split('\n').length
        if (lineCount < 8) {
            setHeightSendInput(lineCount == 1 ? 40 : lineCount * 24 + 16)
        }
    }

    const getEnterKey = (e) => {
        if (e.code === 'Enter') {
            if (e.shiftKey || e.ctrlKey) {
                const textarea = messageRef.current
                const start = textarea.selectionStart
                const end = textarea.selectionEnd
                textarea.value = `${textarea.value.substring(0, start)}\n${textarea.value.substring(end)}`
                textarea.selectionStart = textarea.selectionEnd = start + 1

                input_lines()
            } else {
                handleSubmit()
            }
            e.preventDefault()
        }
    }
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
        setHeightSendInput(40)
    }

    return (
        <div className='chat'>

            <button className='delete-button' title='apagar todos os dados' onClick={() => clearDatas()}>
                <MdDelete className='delete-icon' />
            </button>

            <div className='chat-area'>
                <div className='conversation'>
                    {
                        messageList.map((message, index) => (
                            <div key={index} className={`message-area
                                ${message.authorId === userId ? 'my-message-area' : 'other-message-area'}
                                ${isLastTwoMessagesSameAuthor(index) && 'pasted-message'}`}>

                                <div className={`message ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                                    <p className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                                        ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}
                                    </p>

                                    <span>{message.text}</span>

                                    <p className='time'>{message.time}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>

                <div className='input-area'>
                    <textarea type="text" style={{ height: `${heightSendInput}px` }}
                        className='send-input' ref={messageRef} placeholder='Mensagem'
                        onKeyDown={e => getEnterKey(e)} onChange={input_lines} />
                    <button className='send-button' onClick={() => handleSubmit()}><VscSend className='send-icon' /></button>
                </div>
            </div>
        </div>
    )
}