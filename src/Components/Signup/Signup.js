import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Logo from '../../olx-logo.png';
import './Signup.css';
import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { useForm } from './useForm'

export default function Signup() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const { values, errors, handleChange, validate, setErrors } = useForm({
    username: '',
    email: '',
    phone: '',
    password: ''
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if(!validate()) return;

    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {
        result.user.updateProfile({ displayName: values.username })
          .then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: values.username,
              phone: values.phone
            }).then(() => {
              navigate('/login'); 
            });
          });
      }).catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
  <div className="signupParentDiv">
    <img width="200px" height="200px" src={Logo} alt="Logo" />
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="fname">Username:</label>
        <input
          className="input"
          type="text"
          value={values.username}
          onChange={handleChange}
          id="fname"
          name="username"
        />
      </div>
      {errors.username && <span className="error">{errors.username}</span>}

      <div className="formGroup">
        <label htmlFor="email">Email:</label>
        <input
          className="input"
          type="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          name="email"
        />
      </div>
      {errors.email && <span className="error">{errors.email}</span>}

      <div className="formGroup">
        <label htmlFor="phone">Phone:</label>
        <input
          className="input"
          type="number"
          value={values.phone}
          onChange={handleChange}
          id="phone"
          name="phone"
        />
      </div>
      {errors.phone && <span className="error">{errors.phone}</span>}

      <div className="formGroup">
        <label htmlFor="password">Password:</label>
        <input
          className="input"
          type="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          name="password"
        />
      </div>
      {errors.password && <span className="error">{errors.password}</span>}

      <button>Signup</button>
    </form>
    <a href="/login">Login</a>
  </div>
</div>
  );
}
