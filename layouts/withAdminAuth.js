import { getSession } from "next-auth/react";

export const withAdminAuth = (gssp) => {
    return async (context) => {
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

        const gsspData = gssp ? await gssp(context) : { props: {} };
        return {
            ...gsspData,
            props: {
                ...gsspData.props,
                session,
            },
        };
    };
};