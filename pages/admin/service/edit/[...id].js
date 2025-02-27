import Service from "../../../../components/Admin/Service";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";

export default function EditService() {
	const router = useRouter();

	const { id } = router.query;

	const [serviceInfo, setServiceInfo] = useState(null);

	useEffect(() => {
		if (!id) {
			return;
		} else {
			axios.get("/api/service?id=" + id).then((response) => {
				setServiceInfo(response.data);
			});
		}
	}, [id]);

	return (
		<AdminLayout>
			<Head>
				<title>Update Service</title>
			</Head>
			<div className="p-6">
				<div className="titledashboard flex flex-sb">
					<div>
						<h2 className="font-semibold text-xl">
							Edit <span>{serviceInfo?.title}</span>
						</h2>
					</div>
				</div>
				<div className="mt-3">
					{serviceInfo && <Service {...serviceInfo} />}
				</div>
			</div>
		</AdminLayout>
	);
}
