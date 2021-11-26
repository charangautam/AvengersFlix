import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import { Form, FloatingLabel, Button } from 'react-bootstrap';


export function ProfileView({ user, onLoggedOut }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length < 4) return setError('Username must be longer than 4 characters');
        if (password.length < 6) return setError('Password must be longer than 6 characters');
        var alphaNum = /^[0-9a-zA-Z]+$/;
        if (!username.match(alphaNum)) return setError('Username must contain letters and numbers');

        axios.put(`https://avengers-database.herokuapp.com/users/${user}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                console.log(response.data);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            });
    }

    const token = localStorage.getItem('token')
    const handleDelete = () => {
        axios.delete(`https://avengers-database.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                onLoggedOut()
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <div className="mt-5 d-flex justify-content-center">

            <Form className="registration-view" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h5>{user}</h5>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Update user</h1>
                <FloatingLabel controlId="formUsername" label="Username" className="mb-3 mt-4">
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
                </FloatingLabel>
                <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
                </FloatingLabel>
                <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                </FloatingLabel>
                <FloatingLabel controlId="formBirthday" label="Birthday" className="mb-3">
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="birthday" />
                </FloatingLabel>
                {error && <h5 style={{ color: "red", marginBottom: "40px" }}>{error}</h5>}
                <div className="d-grid gap-2">
                    <Button size="lg" variant="success" type="submit">Submit</Button>
                </div>
                <Link to={'/'}>
                    <Button size="lg" variant="danger" className="mt-5 w-75" onClick={handleDelete}>Delete Account</Button>
                </Link>
            </Form>
        </div>
    )
}
