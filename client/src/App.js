import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
} from "react-router-dom";
import Index from "./components/index.jsx"
import socketIOClient from "socket.io-client"
//const socket = socketIOClient('http://localhost:9000/testAPI')
function App (){
    return (
    <>
        {
            <Router>
                <Routes>
                    {}
                    <Route path="/" element={Index()}/>
                </Routes>
            </Router>
        }
    </>
)
}

export default App;
