import React, { useState } from 'react';
import PropTypes from 'prop-types';

// react-bootstrap UI
import { Form, FloatingLabel, Button } from 'react-bootstrap';

// scss file 
import './login-view.scss'

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault;
        console.log(`${username}, ${password}`);
        props.onLoggedIn(username)
    }

    return (
        <Form className="login-view">
            <FloatingLabel controlId="formUsername" label="Username" className="mb-3">
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="username" />
            </FloatingLabel>
            <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                <Form.Control type="text" onChange={e => setPassword(e.target.value)} placeholder="password" />
            </FloatingLabel>
            <Button variant="success" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}