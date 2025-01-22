import Portfolio from "../../../../components/Admin/Portfolio";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import AdminLayout from "../../../../layouts/AdminLayout";

export default function EditPortfolio() {
	const router = useRouter();

	const { id } = router.query;

	const [portfolioInfo, setPortfolioInfo] = useState(null);

	useEffect(() => {
		if (!id) {
			return;
		} else {
			axios.get("/api/portfolio?id=" + id).then((response) => {
				setPortfolioInfo(response.data);
			});
		}
	}, [id]);

	return (
		<AdminLayout>
			<Head>
				<title>Update Portfolio</title>
			</Head>
			<div className="p-6">
				<div className="titledashboard flex flex-sb">
					<div>
						<h2 className="font-semibold text-xl">
							Edit <span>{portfolioInfo?.title}</span>
						</h2>
					</div>
				</div>
				<div className="mt-3">
					{portfolioInfo && <Portfolio {...portfolioInfo} />}
				</div>
			</div>
		</AdminLayout>
	);
}
