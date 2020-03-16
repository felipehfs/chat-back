import React, { useState } from 'react';
import Page from '../components/layout/Page';
import styled from 'styled-components';
import { api } from '../services/api';

const CardC = styled.div`
    width: 500px;
    background-color: #fff;
    height: 300px;
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

const Button = styled.button`
    border: none;
    background: ${props => props.color};
    color: white;
    padding: 13px;
    margin-bottom: ${props => props.marginBottom || 0};
    &:active {
        background-color: transparent;
        border: 1px solid ${props => props.color};
        color: ${props => props.color};
    }
`


const LoginPage = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        props.history.push("/register")
    }

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", {
                username,
                password
            });
            localStorage.clear();
            localStorage.setItem('userInfo', response.data);
            props.history.push('/chat');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Page>
            <CardC>
                <h2>Login</h2>
                <Form>
                    <div>
                        <input value={username} 
                            onChange={e => setUsername(e.target.value)}
                            type="text" placeholder="username" />
                        <input value={password} 
                            onChange={e => setPassword(e.target.value)}
                            type="password" placeholder="senha" />
                    </div>
                </Form>
                
                <Button 
                    color="#000" 
                    marginBottom="2px"
                    onClick={handleRegister}
                >Registrar</Button>
                <Button 
                    color="#1cc824"
                    onClick={handleLogin}
                >Entrar</Button>
            </CardC>
        </Page>
    )
}

export default LoginPage;