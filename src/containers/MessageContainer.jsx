import React from 'react';
import styled from 'styled-components';

import MessageItem from '../components/MessageItem';

const MessageItemBox = styled.ul`
    list-style-type: none;
`


const MessageContainer =  props => {
    return (
        <MessageItemBox>
            { props.messages.map(message => <MessageItem key={message.id} {...message}/>)}
        </MessageItemBox>
    )
}

MessageContainer.defaultProps = {
    messages: []
}

export default MessageContainer;