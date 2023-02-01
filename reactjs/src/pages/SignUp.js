import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SignUp() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Students Sign Up page </h1>
                <Link to="/dashboard">Dashboard</Link>
            </header>
        </div>
    );
}

export default SignUp;
