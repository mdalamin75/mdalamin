import Testimonial from "../../../components/Admin/Testimonial";
import AdminLayout from "../../../layouts/AdminLayout";



export default function Addproject() {

    return <>
        <AdminLayout className="addblogspage">
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Testimonial</h1>
                <Testimonial />
            </div>
        </AdminLayout>
    </>
}