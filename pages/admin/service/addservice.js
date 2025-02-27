import Service from "../../../components/Admin/Service";
import AdminLayout from "../../../layouts/AdminLayout";


export default function Addproject() {

    return <>
        <AdminLayout className="addblogspage">
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Service</h1>
                <Service />
            </div>
        </AdminLayout>
    </>
}