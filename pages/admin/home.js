// pages/admin/index.js
import AdminLayout from "../../layouts/AdminLayout";
import Home from "../../components/Admin/Home";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { LoadingScreen } from "../../components/Admin/LoadingScreen";
import { withAdminAuth } from "../../layouts/withAdminAuth";

const HomePage = () => {
  const { isLoading } = useAuth();
  const { data: homeData, refetch } = useFetch("home");

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Home</h1>
        {homeData && (
          <Home _id={homeData._id} fetchData={refetch} />
        )}
      </div>
    </AdminLayout>
  );
};

export default HomePage;

export const getServerSideProps = withAdminAuth();