"use client";
import React, { useRef, useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

// const TawkMessenger = () => {
//   const onBeforeLoadHandler = () => {
//     console.log("Widget loading...");
//   };
//   const tawkMessengerRef = useRef();

//   // const handleMinimize = () => {
//   //   tawkMessengerRef.current.minimize();
//   // };
//   return (
//     <>
//       <TawkMessengerReact
//         propertyId="6481da3dcc26a871b0216170"
//         widgetId="1h2djp0ri"
//         ref={tawkMessengerRef}
//         onLoad={() => {}}
//         onBeforeLoad={onBeforeLoadHandler}
//         onStatusChange={() => {}}
//       />
//     </>
//   );
// };

// export default TawkMessenger;


const TawkMessenger = () => {
  const onBeforeLoadHandler = () => {
    console.log("Widget loading...");
  };
  const tawkMessengerRef = useRef();

  // const handleMinimize = () => {
  //   tawkMessengerRef.current.minimize();
  // };
  useEffect(() => {
    <TawkMessengerReact
      propertyId="6481da3dcc26a871b0216170"
      widgetId="1h2djp0ri"
      ref={tawkMessengerRef}
      onLoad={() => { }}
      onBeforeLoad={onBeforeLoadHandler}
      onStatusChange={() => { }}
    />
    // Make sure to handle any potential window/document undefined errors
    try {
      // Initialize Tawk here
    } catch (error) {
      console.error('Failed to load Tawk Messenger:', error);
    }
  }, []);

  return null; // Or return a container div if needed
};

export default TawkMessenger;
