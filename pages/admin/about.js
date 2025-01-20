// pages/admin/index.js
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Home from "../../components/Admin/Home";
import axios from "axios";

const AboutPage = () => {
  const { data: session, status } = useSession();
  const [homeData, setHomeData] = useState(null);
  const router = useRouter();

  // Fetch existing data
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/about`);
      setHomeData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    } else if (session && !session.user?.twoFactorVerified) {
      router.replace("/admin/2fa-verify");
    }
  }, [session, status, router]);

  // Show loading state while checking session
  if (status === "loading" || !session?.user?.twoFactorVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin About</h1>
        {homeData && (
          <Home _id={homeData._id} fetchData={fetchData} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AboutPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  if (!session.user?.twoFactorVerified) {
    return {
      redirect: {
        destination: "/admin/2fa-verify",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
