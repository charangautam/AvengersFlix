import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import { Form, FloatingLabel, Button } from 'react-bootstrap';
// scss file 
import './login-view.scss'
// logo img
import img from "../../logo.png";


export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // error validation
        if (username.length < 4) return setError('Must include a username that is longer than 4 characters');
        if (password.length < 6) return setError('Must include a password that is longer than 6 characters');

        axios.post('https://avengers-database.herokuapp.com/login/', {
            Username: username,
            Password: password,
        })
            .then(response => {
                onLoggedIn(response.data);
            })
            .catch(err => {
                setError("User does not exist");
                console.error(`User does not exist, ${err}`);
            })
    }

    return (
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
            <h1 className="d-flex align-items-center mb-5" style={{ fontFamily: 'Montserrat', fontWeight: 700, color: "#777978" }}>
                <img
                    src={img}
                    height="60"
                    width="60"
                    className="d-inline-block align-top"
                    alt="AvengersFlix logo"
                />vengersFlix
            </h1>
             <p className="d-flex text-center mb-5 w-50" style={{ fontWeight: 600, fontSize: "17px" }}>
                An application that consists of the most popular movies of the Avengers heroes. Created for fans to be able view Avengers movies and their details in one location. Join us!
            </p>
            <Form className="login-view" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Login</h1>
                <FloatingLabel controlId="formUsername" label="Username" className="mb-3 mt-4">
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required />
                </FloatingLabel>
                <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
                </FloatingLabel>
                {error && <h5 style={{ color: "red", marginBottom: "40px" }}>Incorrect username or password</h5>}
                <div className="d-grid gap-2">
                    <Button size="lg" variant="success" type="submit">Submit</Button>
                </div>
                <Link to={`/register`}>
                    <Button size="lg" variant="primary" className="register-button"> Register</Button>
                </Link>
            </Form>
        </div >
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}
