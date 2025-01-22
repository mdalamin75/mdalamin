import Portfolio from "../../../../components/Admin/Portfolio";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import toast from "react-hot-toast";
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

	function goBack() {
		router.push("/admin/portfolio");
	}

	async function deleteBlog() {
		await axios.delete("/api/portfolio?id=" + id);
		toast.success("delete successfully");
		goBack();
	}

	return (
		<AdminLayout>
			<Head>
				<title>Update Portfolio</title>
			</Head>
			<div className="p-6">
				<div className="titledashboard flex flex-sb">
					<div>
						<h2 className="font-semibold text-xl">
							Delete <span>{portfolioInfo?.title}</span>
						</h2>
					</div>
				</div>
				<div className="deletesec flex items-center justify-center w-full mt-12">
					<div className="deletecard card-bordered card p-6 flex justify-center items-center gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="6em"
							height="6em"
							viewBox="0 0 24 24">
							<path
								fill="red"
								d="M20 7v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7H2V5h20v2h-2Zm-9 3v7h2v-7h-2ZM7 2h10v2H7V2Z"
							/>
						</svg>
						<p className="text-lg font-semibold">Are you sure?</p>
						<p className="text-lg font-semibold">
							If you delete this website content it will be permenent delete
							your content.
						</p>
						<div className="buttonContainer ">
							<button
								onClick={deleteBlog}
								className="acceptButton btn btn-error text-white">
								Delete
							</button>
							<button
								onClick={goBack}
								className="declineButton btn btn-primary ms-2">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
