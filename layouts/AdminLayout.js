// layouts/AdminLayout.js
import dynamic from 'next/dynamic';
const AdminHeader = dynamic(() => import("../components/Admin/AdminHeader"),{
  ssr: false,
})

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div style={{marginLeft: "5rem", marginTop: "4rem"}}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
