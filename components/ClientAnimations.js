'use client';

import AosAnimation from './AosAnimation';
import CursorAnimation from './CursorAnimation';
import ClientTawkMessenger from './ClientTawkMessenger';

const ClientAnimations = () => {
  return (
    <>
      <ClientTawkMessenger />
      <AosAnimation />
      <CursorAnimation />
    </>
  );
};

export default ClientAnimations;