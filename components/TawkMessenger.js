"use client";
import React, { useRef, useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TawkMessenger = () => {
  const onBeforeLoadHandler = () => {
    console.log("Tawk Widget loading...");
  };
  
  const onLoadHandler = () => {
    console.log("Tawk Widget loaded successfully!");
    // Check if the widget is visible
    setTimeout(() => {
      const tawkWidget = document.querySelector('#tawk-widget');
      if (tawkWidget) {
        console.log("Tawk widget element found:", tawkWidget);
      } else {
        console.log("Tawk widget element not found in DOM");
      }
    }, 2000);
  };
  
  const onStatusChangeHandler = (status) => {
    console.log("Tawk Widget status changed:", status);
  };
  const tawkMessengerRef = useRef();

  useEffect(() => {
    // Make sure to handle any potential window/document undefined errors
    try {
      console.log('TawkMessenger component mounted');
      console.log('Property ID:', "6481da3dcc26a871b0216170");
      console.log('Widget ID:', "1h2djp0ri");
    } catch (error) {
      console.error('Failed to load Tawk Messenger:', error);
    }
  }, []);

  return (
    <TawkMessengerReact
      propertyId="6481da3dcc26a871b0216170"
      widgetId="1h2djp0ri"
      ref={tawkMessengerRef}
      onLoad={onLoadHandler}
      onBeforeLoad={onBeforeLoadHandler}
      onStatusChange={onStatusChangeHandler}
    />
  );
};

export default TawkMessenger;
