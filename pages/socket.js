import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';


export default function Home() {
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [myId, setMyId] = useState("");
  // const [chatMsg, setChatMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const [temp, setTemp] = useState({});

  useEffect(() => {
    const _socket = io("http://localhost:3000/");

    _socket.on("connect", () => {
      console.log('----')
      console.log(_socket.id)
      setMyId(_socket.id);
    } )

    _socket.on('chat message', (chatObj) => {
      console.log('chat received.')
      console.log(chatObj.msg);
      console.log(chatObj.senderId);

      setTemp({
        msg: chatObj.msg,
        senderId: chatObj.senderId,
        uuid: Math.random()
      })

      setMsg("");
    });

    setSocket(_socket);
  }, [])

  useEffect(() => {
    const cp = [...chatList]
    cp.push(temp)
    setChatList(cp);
  }, [temp])

  const emitData = () => {
    socket.emit('chat message', msg);
  }
  
  return (
    <div style={{margin: 10}}>
      {myId}
      <br/>
      <input 
      style={{width:200, marginRight: 10}}
      value={msg}
      onChange={e => setMsg(e.target.value)}></input>

      <button onClick={e => emitData()}>send</button>

      <div>
        <br/>
        {chatList.map((chatObj,index) => {
          return <div key={index}>
            {chatObj.senderId === myId ?
            <>
            나: {chatObj.msg}
            </>
            :
            <>
            상대:{chatObj.msg} - {chatObj.senderId}
            </>
            }
          <br/>
          </div>
        })}
      </div>
    </div>
  )
}