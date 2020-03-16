import React, { useState} from 'react';
import Page from '../components/layout/Page';
import styled from 'styled-components';
import { api } from '../services/api';

const CardC = styled.div`
    width: 500px;
    background-color: #fff;
    height: 303px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    & > h2 {
        text-align: center;
        font-family: Arial;
    }
`

const Form = styled.form`
    flex: 1;
    & > div {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }
    & > div input {
        padding: 10px;
        margin-bottom: 10px;
    }
`;

const RegisterButton = styled.button`
    border: none;
    background: green;
    color: white;
    padding: 13px;
`


const RegisterPage = props => {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await api.post("/register", {
                username,
                status,
                password
            });
    
            console.log(response.data);
            props.history.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Page>
            <CardC>
                <h2>Registrar</h2>
                <Form>
                    <div>
                        <input 
                            onChange={e => setUsername(e.target.value)}
                            value={username} 
                            type="text" placeholder="username" />
                        <input 
                            onChange={e => setStatus(e.target.value)} 
                            value={status} 
                            type="text" placeholder="status" />
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} type="password" placeholder="senha" />
                        <input type="file" placeholder="avatar" accept="image/*"/>
                    </div>
                </Form>
                <RegisterButton 
                    onClick={handleRegister}
                >Confirmar</RegisterButton>
            </CardC>
        </Page>
    )
}

export default RegisterPage;