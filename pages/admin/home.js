// pages/admin/index.js
import AdminLayout from "../../layouts/AdminLayout";
import Home from "../../components/Admin/Home";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import { LoadingScreen } from "../../components/Admin/LoadingScreen";
import { withAdminAuth } from "../../layouts/withAdminAuth";
import axios from "axios";

const HomePage = ({ initialData }) => {
    const { isLoading } = useAuth();
    const { data: homeData, refetch } = useFetch("home", initialData);

    if (isLoading) return <LoadingScreen />;

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Admin Home</h1>
                {homeData && <Home _id={homeData._id} fetchData={refetch} />}
            </div>
        </AdminLayout>
    );
};

export default HomePage;

export const getServerSideProps = withAdminAuth(async (context) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/home`);
        return { props: { initialData: response.data } };
    } catch {
        return { props: { initialData: null } };
    }
});