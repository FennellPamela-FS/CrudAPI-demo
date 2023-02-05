import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AuthService from './services/auth.service';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  // build a service to grab token when user signs in
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // const user = false;
    if (user) {
      setCurrentUser(user);
    }
  }, [])

  const logOut = () => {
    AuthService.logout();
  }

  return (
    <div>
      <h1>Demo Logging in</h1>
      {/* create a view for login */}
      <div>
        {
          // currentUser ? <Dashboard /> : <Home />
          // currentUser === false
          currentUser ? <h2>Logged In</h2> : <h2>You are Logged Out</h2>
        }
      </div>
      <section>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/students/:id" exact element={<Student />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
