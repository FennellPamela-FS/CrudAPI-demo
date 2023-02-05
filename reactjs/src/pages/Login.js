import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
    // capture email
    const [email, setEmail] = useState("");

    // capture password
    const [password, setPassword] = useState("");

    // capture confirm password
    const [confirmPassword, setConfirmPassword] = useState("");

    // capture name


    const navigate = useNavigate();

    // function to handle signup
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // reach out to API, create response for user
            // const response = await fetch("http://localhost:5000/signup", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         email: email,
            //         password: password,

            //     })
            // });
            // const data = await response.json();
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Students Login page </h1>
                <Link to="/dashboard">Dashboard</Link>
                <section>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button type="submit">
                            Sign Up
                        </button>
                    </form>
                </section>
            </header>
        </div>
    );
}

export default Login;
