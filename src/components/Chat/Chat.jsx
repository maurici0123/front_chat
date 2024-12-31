import './ChatStyle.css'
import React, { useRef, useState, useEffect } from 'react'
import { IoIosMore } from "react-icons/io"
import { FaImage } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import { GrPowerReset } from "react-icons/gr"
import { VscSend } from "react-icons/vsc"

export default function Chat(props) {
    const bottomRef = useRef()
    const messageRef = useRef()
    const fileInputRef = useRef()
    const [messageList, setMessageList] = useState([])
    const [heightSendInput, setHeightSendInput] = useState(35)
    const [displayOption, setDisplayOption] = useState('none')
    const [backgroundColor, setBackgroundColor] = useState('transparent')
    const userId = localStorage.getItem('userId')

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

    const clearInput = () => messageRef.current.innerText = ""

    const focusInput = () => messageRef.current.focus()

    const scrollDown = () => bottomRef.current.scrollIntoView()

    const imagens = () => fileInputRef.current.click()

    const clearDatas = () => {
        localStorage.clear()
        window.location.reload()
    }

    const clearMessages = () => {
        localStorage.setItem('messages', JSON.stringify([]))
        window.location.reload()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = (e) => {
            const base64Data = e.target.result

            props.socket.emit('message', [base64Data, 'imageLocal'])
        }

        reader.readAsDataURL(file)
        showOption()
    }

    // const imageLocal = (file) => {
    //     return <img src={file} alt="image" className='valueImage' />
    // }

    // const file = event.target.files[0]
    // console.log(file)
    // if (file) {
    //     const blobURL = URL.createObjectURL(file)
    //     console.log(blobURL)
    //     props.socket.emit('message', [blobURL, 'imageLocal'])
    // }

    const isItImage = () => {
        const div = messageRef.current

        if (div.querySelector('img')) {
            const img = div.querySelector('img')
            return [img.getAttribute('src'), 'imageURL']
        } else {
            return [div.innerText, 'message']
        }
    }

    const handleSubmit = () => {
        const content = isItImage() || ""
        if (!content[0].trim()) return

        props.socket.emit('message', content)
        clearInput()
        focusInput()
        setHeightSendInput(35)

        showOption('none')
        setBackgroundColor('transparent')
    }

    const getEnterKey = (e) => {
        if (e.code === 'Enter') {
            if (e.shiftKey || e.ctrlKey) {
                return
            } else {
                handleSubmit()
                e.preventDefault()
            }
        }

        showOption('none')
        setBackgroundColor('transparent')
    }

    const isLastTwoMessagesSameAuthor = (index) => {
        if (index > 0) {
            return messageList[index].authorId === messageList[index - 1].authorId
        }
        return false
    }

    const showOption = (e = '') => {
        if (e == 'none') {
            setDisplayOption('none')
        } else if (e == '') {
            setDisplayOption(prev => {
                if (prev == 'none') {
                    setBackgroundColor('#666')
                    return 'flex'
                } else {
                    setBackgroundColor('transparent')
                    return 'none'
                }
            })
        }
    }

    function textOrImage(message, index) {

        if (message.type == 'message') {
            return (
                <div className={`messageText ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                    <p className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                    ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}</p>

                    <p className='valueText'>{message.text}</p>

                    <p className='timeText'>{message.time}</p>
                </div>)
        } else if (message.type == 'imageURL') {
            return (
                <div className={`messageImage ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                    <p className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                    ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}</p>

                    <img src={message.text} alt="image" className='valueImage' />

                    <p className='timeImage'>{message.time[0]}</p>
                </div>)
        } else if (message.type == 'imageLocal') {
            return (
                <div className={`messageImage ${message.authorId === userId ? 'my-message' : 'other-message'}`}>
                    <p className={`author ${message.authorId === userId ? 'my-author' : 'other-author'}
                    ${isLastTwoMessagesSameAuthor(index) && 'author-pasted'}`}>{message.author}</p>

                    <img src={message.text} alt="image" className='valueImage' />

                    <p className='timeImage'>{message.time[0]}</p>
                </div>)
        }
    }

    return (
        <div className='chat'>
            <div className='chat-area'>
                <div className='conversation'>
                    {
                        messageList.map((message, index) => (
                            <div key={index} className={`message-area
                                ${message.authorId === userId ? 'my-message-area' : 'other-message-area'}
                                ${isLastTwoMessagesSameAuthor(index) && 'pasted-message'}`}>

                                {textOrImage(message, index)}
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>

                <div className='input-area'>
                    <div className='displayOption' style={{ display: displayOption }}>
                        <div className='more-button' onClick={() => imagens()}>
                            <FaImage className='more-icon' />
                            <span>Imagens</span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={evt => handleFileChange(evt)}
                            />
                        </div>
                        <div className='more-button' onClick={() => clearMessages()}>
                            <MdDelete className='more-icon' />
                            <span>Deletar mensagens</span>
                        </div>
                        <div className='more-button' onClick={() => clearDatas()}>
                            <GrPowerReset className='more-icon' />
                            <span>Deletar dados</span>
                        </div>
                    </div>

                    <IoIosMore className='option-icon' style={{ backgroundColor: backgroundColor }} onClick={() => showOption()} />

                    <div
                        contentEditable='true'
                        style={{ 'minHeight': `${heightSendInput}px` }}
                        className='send-input'
                        ref={messageRef}
                        placeholder='Mensagem'
                        onKeyDown={e => getEnterKey(e)}
                    />

                    <button className='send-button' onClick={() => handleSubmit()}><VscSend className='send-icon' /></button>
                </div>
            </div>
        </div>
    )
}