import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

//using react createContext to easily pass values to children without having to propdrill
const SocketContext = React.createContext()

//creating a hook to be able to access all functions within the socket provider
export function useSocket() {
  return useContext(SocketContext)
}

// creating the primary socket provider 
export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    //trying to connect to the backend server socket and parse the user id
    //sending the query as the id param
    const newSocket = io('http://localhost:5000', {
      query: { id } 
    })

    setSocket(newSocket)
    //closing the connection to prevent bandwidth errors 
    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};