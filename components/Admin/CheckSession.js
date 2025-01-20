// components/CheckSession.js
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const CheckSession = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Client-Side Session:', session); // Debug log
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>No session found</div>;
  }

  return <div>Session: {JSON.stringify(session)}</div>;
};

export default CheckSession;
