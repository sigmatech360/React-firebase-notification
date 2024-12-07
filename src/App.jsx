// src/App.js
import React , {useState } from "react";
import useFirebaseMessaging from "./useFirebaseMessaging";

const App = () => {
  useFirebaseMessaging();
 
  return (
    <div className="App">
      <h1>Firebase Notifications in React</h1>
      <p>Waiting for notifications...</p>
    </div>
  );
};

export default App;
