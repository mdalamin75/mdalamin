// pages/admin/index.js
import AdminLayout from "../../layouts/AdminLayout";
import About from "../../components/Admin/About";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { LoadingScreen } from "../../components/Admin/LoadingScreen";
import { withAdminAuth } from "../../layouts/withAdminAuth";

const HomePage = () => {
  const { isLoading } = useAuth();
  const { data: aboutData, refetch } = useFetch("about");

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin About</h1>
        {aboutData && (
          <About _id={aboutData._id} fetchData={refetch} />
        )}
      </div>
    </AdminLayout>
  );
};

export default HomePage;

export const getServerSideProps = withAdminAuth();