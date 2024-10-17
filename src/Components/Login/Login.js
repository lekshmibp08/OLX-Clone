import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../store/Context'
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate()

   // 1. Check if the user is already logged in
   useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, [firebase, navigate]);

  // 2. Prevent back navigation to the login page after logging in
  useEffect(() => {
    console.log("USE EFFECT WORKING");
    
    window.history.replaceState(null, null, window.location.href); // Push the current state into history

    const handlePopState = () => {
      // If the user tries to go back to the login page after login, redirect them to the homepage
      if (firebase.auth().currentUser) {
        navigate('/');
      }
    };

    window.addEventListener('popstate', handlePopState); // Listen for back button events

    return () => {
      window.removeEventListener('popstate', handlePopState); 
    };
  }, [firebase, navigate]);

  const handleLogin = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      //alert('Logged In')
      navigate('/');
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img 
        onClick={() => {
          navigate('/')
        }}
        style={{ cursor: 'pointer' }}
        width="200px" height="200px" src={Logo}>        
        </img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>          
        </form>
        <a href='/signup' style={{textDecoration:'none'}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
