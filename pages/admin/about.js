// pages/admin/index.js
import AdminLayout from "../../layouts/AdminLayout";
import About from "../../components/Admin/About";
import { useAuth } from "../../hooks/useAuth";
import useFetch  from "../../hooks/useFetch";
import { LoadingScreen } from "../../components/Admin/LoadingScreen";
import { withAdminAuth } from "../../layouts/withAdminAuth";
import axios from "axios";

const AboutPage = ({initialData}) => {
  const { isLoading } = useAuth();
  const { data: aboutData, refetch } = useFetch("about", initialData);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin About</h1>
        {aboutData && <About _id={aboutData._id} fetchData={refetch} />}
      </div>
    </AdminLayout>
  );
};

export default AboutPage;

export const getServerSideProps = withAdminAuth(async (context) => {
  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/about`);
      return { props: { initialData: response.data } };
  } catch {
      return { props: { initialData: null } };
  }
});