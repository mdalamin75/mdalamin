// pages/admin/2fa-setup.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SimpleLayout from '../../layouts/SimpleLayout';

const TwoFactorSetup = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        if (!session) {
          console.error('No session found');
          setError('You need to be logged in to set up 2FA.');
          return;
        }

        const response = await fetch('/api/auth/2fa-setup', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response Text:', errorText);
          throw new Error('Failed to fetch QR code');
        }

        const data = await response.json();
        console.log('QR Code Data:', data);

        if (data.twoFactorSetup) {
          router.push('/admin/2fa-verify'); // Redirect to verification if already set up
        } else {
          setQrCode(data.qrCodeDataURL); // Show QR code if not set up
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
        setError('Failed to load QR code. Please try again.');
      }
    };

    fetchQrCode();
  }, [session]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!qrCode) {
    return <div>Loading QR code...</div>;
  }

  return (
    <SimpleLayout>
      <h1>Scan this QR Code with Google Authenticator</h1>
      <img src={qrCode} alt="QR Code" />
    </SimpleLayout>
  );
};

export default TwoFactorSetup;
