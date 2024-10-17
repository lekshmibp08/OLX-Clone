import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

import { AuthContex, FirebaseContext } from "./store/Context";
import Context from "./store/Context"; // Import your Context

import Post from "./store/PostContext";
import { SearchProvider } from "./store/SearchContext";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
  return (
    <Context>
      {" "}
      {/* Wrap your Router with the Context provider */}
      <Router>
        <InnerApp />
      </Router>
    </Context>
  );
}

function InnerApp() {
  const { setUser } = useContext(AuthContex); // Now use context inside InnerApp

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []); // Added user to the dependency array

  return (
    <div>
      <Post>
        <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
        </SearchProvider>
      </Post>
    </div>
  );
}

export default App;
