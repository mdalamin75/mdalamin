"use client";
import React, { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const TawkMessenger = () => {
  const onLoad = () => {
    console.log("onLoad works!");
  };
  const tawkMessengerRef = useRef();

  // const handleMinimize = () => {
  //   tawkMessengerRef.current.minimize();
  // };
  return (
    <>
      <TawkMessengerReact
        propertyId="6481da3dcc26a871b0216170"
        widgetId="1h2djp0ri"
        ref={tawkMessengerRef}
        onLoad={onLoad}
      />
    </>
  );
};

export default TawkMessenger;
