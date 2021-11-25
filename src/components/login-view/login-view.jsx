import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// react-bootstrap UI
import { Form, FloatingLabel, Button } from 'react-bootstrap';

// scss file 
import './login-view.scss'

export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://avengers-database.herokuapp.com/login/', {
            Username: username,
            Password: password,
        })
            .then(response => {
                onLoggedIn(response.data);
            })
            .catch(err => {
                console.error(`User does not exist, ${err}`);
            })
    }

    return (
        <div className="mt-5 d-flex algin-items-center justify-content-center">
            <Form className="login-view" onSubmit={handleSubmit}>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Login</h1>
                <FloatingLabel controlId="formUsername" label="Username" className="mb-3 mt-4">
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required />
                </FloatingLabel>
                <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button size="lg" variant="success" type="submit">Submit</Button>
                </div>
            </Form>
        </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}