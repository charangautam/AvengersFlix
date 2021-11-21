import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <form action="">
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="username">Password:</label>
                <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}