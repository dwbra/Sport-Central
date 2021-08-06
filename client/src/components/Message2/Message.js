import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { getMessages } from '../../api';

function Message() {
    const userData = JSON.parse(localStorage.getItem('profile'))
    const userEmail = userData.result.email;
    const id = userEmail;

    const [text, setText] = useState('');
    const [socket, setSocket] = useState();

    const allMessages = () => {
        getMessages().then((data) => {
            console.log(data)
        })
    }

    allMessages()

    // useEffect(() => {
    //     const socket = io({
    //       query: { id }
    //     })
    
    //     setSocket(socket)
    //     return () => socket.close()
    //   }, [id])

    // useEffect(() => {
    //     if (socket == null) return

    //     socket.on('receive-message', data => {
    //         console.log('received data from server', data)
    //         if (data.length) {
    //             data.forEach(message => {
    //                 let msg = document.getElementById('messages')
    //                 msg.append(message)
    //             })
    //         }
    //     })

    //     return () => socket.off('receive-message')
    // }, [socket])


    function handleSubmit(e){
        e.preventDefault()
        console.log(id)
        console.log(text)
        socket.emit('send-message', id, text)
        console.log('submit from msgfrom', id)
        setText('');
    }

    return (
        <div>
            <div id="messages"></div>
        <div>
            <form id="messageForm" onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}></input>
                <button type="submit" value="submit">Send</button>
            </form>
            </div>
        </div>
    )
}

export default Message;
