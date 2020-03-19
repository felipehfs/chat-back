import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import MessageContainer from '../containers/MessageContainer';
import ContactContainer from '../containers/ContactContainer';
import { FaArrowAltCircleLeft, FaUserCircle } from 'react-icons/fa'
import Page from '../components/layout/Page';
import { createEvent, handleUserOnlineEvent } from '../services/flyweightwebsocket';


const Card = styled.div`
    height: 500px;
    width: 800px;
    padding: 10px;
    background-color: #fff;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-areas: "aside main";
`

const Contacts = styled.aside`
    grid-area: aside;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
`

const MessageBox = styled.main`
    grid-area: main;
    display: flex;
    flex-direction: column;
    padding: 0 6px;
`

const MessageList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 5px;
`

const MessageFooter = styled.div`
    display: flex;
`

const MessageInput = styled.input`
    flex: 1;
    margin-right: 5px;
    padding: 10px;
    border: none;
    background: whitesmoke;
`;

const SendInput = styled.button`
    border: none;
    padding: 10px;
    background-color: #1cc824;
    color: #fff;
    &:active {
        border: 1px solid #1cc824;
        background: transparent;
        color: #1cc824;
    }
`

const ContactsTitle = styled.h3`
    font-family: Arial;
    color: #333;
`

const BottomBar = styled.nav`
`



export default props =>  {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([
    ])
    const [contacts, setContacts] = useState([])

    const websocket = useMemo(() => new WebSocket("ws://localhost:8083/chat"));
    const user = useMemo(() => JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        websocket.onopen = function(event) {
            console.log('websocket connected');
            const user = JSON.parse(localStorage.getItem("userInfo"));
            const payload = createEvent(
                'new_user_online',
                {   
                    id: user.id,
                    name: user.username,
                    avatarURL: user.avatar_url
                },
                websocket
            )
                
            websocket.onclose = function(event) {
                console.log('disconnected')
            }
            websocket.send(payload);
        }

        return () => {
            websocket.close()
        }
    }, [])

    useEffect(() => {
        websocket.onmessage = function(event) {
            const message = event.data;
            console.log('received message', message);
            const payload = JSON.parse(message)

            if (payload.type === 'new_user_online') {
                handleUserOnlineEvent({ user, payload}, websocket);

                if (user.id !== payload.data.id) {
                    setContacts([...contacts, payload.data]);
                }
            }

            if (payload.type === 'user_online_received') {
                if (user.id !== payload.data.id) {
                    const contact = contacts.find(contact => contact.id === payload.data.id);
                    if (!contact) {
                        setContacts([...contacts, payload.data]);
                    }
                }
            }

            if (payload.type === 'global_message') {
                console.log(payload.data) 
                setMessageList([...messageList, payload.data])               
            }

        }
    }, [websocket, contacts, user, messageList])


    const handleQuit = e => {
        e.preventDefault();
        props.history.push("/");
        websocket.close()
    }

    const handleSendMessage = e => {
        createEvent('global_message', {
            id: Math.floor(Math.random() * 10000000),
            message: `${user.username}: ${message}`
        }, websocket);

        setMessage('');
    }

    return (
            <Page>
                <Card>
                    <Contacts>
                        <ContactsTitle>Contatos</ContactsTitle>
                        <ContactContainer contacts={contacts} />
                        <BottomBar>
                            <a title="Sair" onClick={handleQuit}>
                                <FaArrowAltCircleLeft size={20}/>
                            </a>
                            <a 
                                style={{ marginLeft: '10px'}}
                                title={user.username}>
                                <FaUserCircle size={20} />
                            </a>
                        </BottomBar>
                    </Contacts>
                    <MessageBox>
                        <MessageList>
                            <MessageContainer  messages={messageList} />
                        </MessageList>
                        <MessageFooter>
                            <MessageInput 
                                type="text" 
                                placeholder="Digite seu texto"
                                value={message}
                                onChange={e => setMessage(e.target.value)} />
                            <SendInput 
                                onClick={handleSendMessage}>
                            Enviar</SendInput>
                        </MessageFooter>
                    </MessageBox>
                </Card>
            </Page>
    )
}