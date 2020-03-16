import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import anonPicture from '../assets/anon.jpeg';

const ContactBox = styled.li`
    height: 50px;
    padding: 3px;
    display: flex;
    align-item: center;
    margin-bottom: 3px;
`

const ContactAvatar = styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`

const ContactInfo = styled.div`
    margin-left: 5px;
    font-family: Arial;
    p {
        font-size: .8em;
    }
`

const ContactItem = props => {
    return (
        <ContactBox>
            <ContactAvatar src={props.avatarURL || anonPicture} />
            <ContactInfo>
                <h5>{props.name}</h5>
                <p>{props.bio}</p>
            </ContactInfo>
        </ContactBox>
    )
}



ContactItem.propTypes = {
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    avatarURL: PropTypes.string
}

export default ContactItem;