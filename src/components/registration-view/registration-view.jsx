import React, { useState } from 'react'

export function RegistrationView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='registration-view'>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="username">Password:</label>
                <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
