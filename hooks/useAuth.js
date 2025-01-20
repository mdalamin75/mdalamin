import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    } else if (session && !session.user?.twoFactorVerified) {
      router.replace("/admin/2fa-verify");
    }
  }, [session, status, router]);

  return {
    session,
    status,
    isLoading: status === "loading" || !session?.user?.twoFactorVerified,
  };
};