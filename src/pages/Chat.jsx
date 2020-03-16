import React, { useState } from 'react';
import styled from 'styled-components';
import MessageContainer from '../containers/MessageContainer';
import ContactContainer from '../containers/ContactContainer';
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import Page from '../components/layout/Page';


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
    const [messageList, setMessageList] = useState([])
    const [contacts, setContacts] = useState([
        { id: 1, name: 'Socrates', bio: 'Um filosofo muito foda'},
        { id: 2, name: 'Luciana', bio: 'Um filosofo muito foda'},
        { id: 3, name: 'Marcos', bio: 'Um filosofo muito foda'},
        { id: 4, name: 'Beatriz', bio: 'Um filosofo muito foda'},
    ])

    const handleQuit = e => {
        e.preventDefault();
        props.history.push("/");
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
                            <SendInput>Enviar</SendInput>
                        </MessageFooter>
                    </MessageBox>
                </Card>
            </Page>
    )
}