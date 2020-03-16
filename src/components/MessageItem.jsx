import React from 'react';
import styled from 'styled-components'

const ListItem = styled.li`
`;
 

export default props => {
    return (
        <ListItem>
            <p style={{ fontFamily: "Arial"}}>{props.message}</p>
        </ListItem>
    )
}