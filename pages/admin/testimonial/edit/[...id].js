import Testimonial from "../../../../components/Admin/Testimonial";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import AdminLayout from "../../../../layouts/AdminLayout";

export default function EditTestimonial() {
	const router = useRouter();

	const { id } = router.query;

	const [testimonialInfo, setTestimonialInfo] = useState(null);

	useEffect(() => {
		if (!id) {
			return;
		} else {
			axios.get("/api/testimonial?id=" + id).then((response) => {
				setTestimonialInfo(response.data);
			});
		}
	}, [id]);

	return (
		<AdminLayout>
			<Head>
				<title>Update Testimonial</title>
			</Head>
			<div className="p-6">
				<div className="titledashboard flex flex-sb">
					<div>
						<h2 className="font-semibold text-xl">
							Edit <span>{testimonialInfo?.clientname}</span>
						</h2>
					</div>
				</div>
				<div className="mt-3">
					{testimonialInfo && <Testimonial {...testimonialInfo} />}
				</div>
			</div>
		</AdminLayout>
	);
}
