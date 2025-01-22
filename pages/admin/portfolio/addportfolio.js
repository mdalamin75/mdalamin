import Portfolio from "../../../components/Admin/Portfolio";
import { SiBloglovin } from "react-icons/si";
import AdminLayout from "../../../layouts/AdminLayout";


export default function Addproject() {

    return <>
        <AdminLayout className="addblogspage">
            <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Portfolio</h1>
                <Portfolio />
            </div>
        </AdminLayout>
    </>
}