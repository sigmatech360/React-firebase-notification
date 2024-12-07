// src/useFirebaseMessaging.js
import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "./firebase-config";

const useFirebaseMessaging = () => {
  const [token, setToken] = useState('dIwkJLzvy8gl4Adq_CtOgN:APA91bEVJxUYUlYdhFhuUuF1tMMLcZZ-UWDkyPpccRWdtPO3KRElQDzSJWrJNHxEejvVySEAEOT0TfIGUmTFuBhzZAiEOOnWACFNlxikh5Xt6GhH8YNW46Q');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  console.log("token data" , token)
  useEffect(() => {
    // Function to request notification permission and get the FCM token
    const requestPermission = async () => {
      try {
        const status = await Notification.requestPermission();
        if (status === "granted") {
          const fcmToken = await getToken(messaging, {
            vapidKey: "BIjI1oqbMVt30PlmvWBgj_2c33h66xtB1ywF6qAdkviYZJdbIAKFC8ZP1AHTRRMQmwRLjPAxo9ojHK47D_EveBs",
          });
          setToken(fcmToken);
          console.log("FCM Token:", fcmToken);
        } else {
          console.error("Permission denied for notifications");
        }
      } catch (error) {
        console.error("Error requesting permission", error);
      }
    };

    requestPermission();

    // Firebase messaging handler when a message is received
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      alert(`Notification: ${payload.notification.title}`);
    });

    // Cleanup the messaging listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Effect to send the FCM token to your server when the token changes
  useEffect(() => {
    const sendTokenToServer = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("https://server.testlinkwebsitespace.com/test/public/api/send-fcm-token", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
 
          },
          body: JSON.stringify({ token: 'dIwkJLzvy8gl4Adq_CtOgN:APA91bEVJxUYUlYdhFhuUuF1tMMLcZZ-UWDkyPpccRWdtPO3KRElQDzSJWrJNHxEejvVySEAEOT0TfIGUmTFuBhzZAiEOOnWACFNlxikh5Xt6GhH8YNW46Q' }), 
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Server response:", data); // Handle the response data
      } catch (err) {
        setError(err.message); // Set error if the fetch fails
        console.error('Fetch error:', err);
      } finally {
        setLoading(false); // End loading
      }
    };
   
      sendTokenToServer();
    }, []); // This effect will run whenever the `token` changes
  
  return {
    token,
    loading,
    error,
  };
};

export default useFirebaseMessaging;
