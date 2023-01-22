import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Students List Home page </h1>
                <Link to="/dashboard">Dashboard</Link>
            </header>
        </div>
    );
}

export default Home;