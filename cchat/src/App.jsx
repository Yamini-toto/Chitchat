import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Join from "./component/Join/Join.jsx";
import "./App.css" 
import Chat from "./component/Chat/Chat.jsx";
function App() {

  return (
        <Router>
        <Routes>
        <Route exact path="/" Component={Join} />
        <Route exact path="/chat" Component={Chat}/>
        </Routes>
      </Router>
  );
  
}

export default App
