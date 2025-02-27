"use client";
import React, { useRef, useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TawkMessenger = () => {
  const onBeforeLoadHandler = () => {
    console.log("Widget loading...");
  };
  const tawkMessengerRef = useRef();

  useEffect(() => {
    // Make sure to handle any potential window/document undefined errors
    try {
      // You can initialize any necessary Tawk settings here if needed
    } catch (error) {
      console.error('Failed to load Tawk Messenger:', error);
    }
  }, []);

  return (
    <TawkMessengerReact
      propertyId="6481da3dcc26a871b0216170"
      widgetId="1h2djp0ri"
      ref={tawkMessengerRef}
      onLoad={() => { }}
      onBeforeLoad={onBeforeLoadHandler}
      onStatusChange={() => { }}
    />
  );
};

export default TawkMessenger;
