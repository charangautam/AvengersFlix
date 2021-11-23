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
        <div className="mt-5 d-flex algin-items-center justify-content-center">
            <Form className="login-view">
                <h1 className="">Login</h1>
                <FloatingLabel controlId="formUsername" label="Username" className="mb-3 mt-4">
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="username" />
                </FloatingLabel>
                <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                    <Form.Control type="text" onChange={e => setPassword(e.target.value)} placeholder="password" />
                </FloatingLabel>
                <div className="d-grid gap-2">
                    <Button size="lg" variant="success" type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}