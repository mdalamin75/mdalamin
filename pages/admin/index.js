// pages/admin/index.js
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;

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
