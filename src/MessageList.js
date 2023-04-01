import React, { useState, useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatDate } from './utils';
import axios from 'axios';
import io from 'socket.io-client';

const serverUrl = 'https://messanger-back.onrender.com';

const MessageList = ({ userName }) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(serverUrl, {
            transports: ['websocket'],
        });
        socketRef.current.on('newMessage', (message) => {
            if (message.recipient_name === userName) {
                setMessages((prevState) => [message, ...prevState]);
            }
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [userName]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${serverUrl}/messages/${userName}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                const formattedMessages = response.data.data.map((message) => ({
                    ...message,
                    isExpanded: false,
                }));
                setMessages(formattedMessages);
            } catch (error) {
                console.log(error);
            }
        };
        if (userName) {
            getMessages();
        }
    }, [userName]);
    
    const toggleMessage = (id) => {
        setMessages((prevState) =>
            prevState.map((message) => {
                if (message.id === id) {
                    return { ...message, isExpanded: !message.isExpanded };
                } else {
                    return message;
                }
            })
        );
    };

  return (
    <ListGroup className="mt-4">
      {messages.length === 0 ? (
        <div className="text-center">No messages yet</div>
      ) : (
        messages.map((message) => (
          <ListGroup.Item
            key={message.id}
            className="mb-3"
            onClick={() => toggleMessage(message.id)}
          >
            <h5>{message.title}</h5>
            {message.isExpanded ? (
              <><p>{message.body}</p>
                <p className="font-italic">
                From: {message.sender_name} | To: {message.recipient_name} |{' '}
                {formatDate(message.created_at)}
              </p>
              </>
                          ) : (
              <p className="font-italic">
                From: {message.sender_name} | To: {message.recipient_name} |{' '}
                {formatDate(message.created_at)}
              </p>
            )}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageList;
