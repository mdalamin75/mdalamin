'use client';

import dynamic from 'next/dynamic';

const TawkMessenger = dynamic(() => import("./TawkMessenger"), {
  ssr: false,
  loading: () => null,
});

export default function ClientTawkMessenger() {
  return <TawkMessenger />;
}