// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBDr8tfCZWcNtelV7tdJ9czZI12CS8twIU",
  authDomain: "test-82db6.firebaseapp.com",
  projectId: "test-82db6",
  storageBucket: "test-82db6.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:837577380863:web:eb424f4dd7d6eabee24dca",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
