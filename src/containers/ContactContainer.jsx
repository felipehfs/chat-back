import React from 'react';
import styled from 'styled-components';

import ContactItem from '../components/ContactItem';

const ContactItemBox = styled.ul`
    list-style-type: none;
    padding-top: 10px;
    flex: 2;
`


const ContactContainer =  props => {
    return (
        <ContactItemBox>
            { props.contacts.map(message => <ContactItem key={message.id} {...message}/>)}
        </ContactItemBox>
    )
}

ContactContainer.defaultProps = {
    contacts: []
}

export default ContactContainer;