
/* public/firebase-messaging-sw.js */
    importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
    importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBDr8tfCZWcNtelV7tdJ9czZI12CS8twIU",
    authDomain: "test-82db6.firebaseapp.com",
    projectId: "test-82db6",
    storageBucket: "test-82db6.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:837577380863:web:eb424f4dd7d6eabee24dca",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
