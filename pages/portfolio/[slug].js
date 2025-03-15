import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import useFetch from "../../hooks/useFetch";
import { useState } from 'react'; // Added missing import
import Image from "next/image";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProjectSlug({ initialData }) {
	const router = useRouter();
	const { slug } = router.query;

	const {
		data: project,
		loading,
		error
	} = useFetch(`portfolio?slug=${slug}`, initialData);

	if (loading) {
		return <LoadingSpinner variant="ring" size="lg" text="Loading project details" fullContainer={true} />;
	}

	if (error) {
		return <div className="container mx-auto py-20 text-center">
			<h2 className="text-2xl font-semibold text-red-500">Error loading project</h2>
			<p className="mt-4">Please try again later or contact the administrator.</p>
		</div>;
	}

	if (!project) {
		return <div>Project not found</div>;
	}

	// Safely access the images array
	const firstImage = project?.images?.[0] || '';
	const projectImages = project?.images || [];

	const Code = ({ node, inline, className, children, ...props }) => {
		const match = /language-(\w+)/.exec(className || '');

		const [copid, setCopied] = useState(false);

		const handleCopy = () => {
			navigator.clipboard.writeText(children);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 3000); // 3000 miliseconds = 3 seconds
		}

		if (inline) {
			return <code>{children}</code>
		} else if (match) {
			return (
				<div style={{ position: 'relative' }}>
					<SyntaxHighlighter
						style={a11yDark}
						language={match[1]}
						PreTag='pre'
						{...props}
						codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
					>
						{String(children).replace(/\n$/, '')}
					</SyntaxHighlighter>
					<button onClick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
						{copid ? 'Copied!' : 'Copy code'}
					</button>
				</div>
			);
		} else {
			return (
				<code className="md-post-code" {...props}>
					{children}
				</code>
			)
		}
	}

	return (
		<>
			<section id="portfolio" className="relative bg_pattern pt-20">
				<Head>
					<title>{project?.title || 'Project'}</title>
				</Head>
				<div className="container mx-auto px-3 md:px-5">
					<div className="projectslug">
						<div className="projectslugimg">
							<div className="container">
								<div className="max-h-96 overflow-hidden">
									{firstImage && (
										<Image
											width={900}
											height={300}
											src={firstImage}
											alt={project?.title || 'Project image'}
											className="w-full object-top"
										/>
									)}
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 py-10">
									<div className="leftmainproinfo">
										<h1 className="text-2xl font-bold font-josefin mb-5">
											{project?.title}
										</h1>
										{project?.livepreview && (
											<a
												href={project.livepreview}
												className="button w-44 button--nina bg-gradient-to-r from-purple-950 to-purple-600 relative block focus:outline-none text-white border-2 border-solid rounded-2xl text-sm text-center font-josefin font-semibold uppercase tracking-widest overflow-hidden me-3 mb-5 px-5"
												data-text="Live Preview"
												target="_blank"
												rel="noopener noreferrer">
												<span className="align-middle">Live Preview</span>
											</a>
										)}
									</div>
									<div className="grid grid-cols-2 gap-5">
										<div>
											<h3 className="text-xl font-bold font-josefin">Category</h3>
											<h2>
												{Array.isArray(project?.projectcategory)
													? project.projectcategory.join(', ')
													: project?.projectcategory}
											</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Client Name</h3>
											<h2>{project?.client}</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Start Date</h3>
											<h2>{project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Developer Name</h3>
											<h2>mdalamin</h2>
										</div>
									</div>
								</div>

								{projectImages.length > 0 && (
									<div className="max-h-48 overflow-hidden">
										<Swiper
											slidesPerView={"auto"}
											spaceBetween={30}
											freeMode={true}
											grabCursor={true}
											modules={[FreeMode]}
											className="mySwiper">
											{projectImages.map((image, index) => (
												<SwiperSlide key={index}>
													<Image
														width={700}
														height={300}
														src={image}
														alt={`Project image ${index + 1}`}
														className="h-48 shadow border border-gray-300"
													/>
												</SwiperSlide>
											))}
										</Swiper>
									</div>
								)}
							</div>
						</div>
						<div className="projectslugdescription my-10">
							<div className="container">
								<div className="psdescri">
									<h2 className="text-2xl font-bold font-josefin">Project Description</h2>
									<hr className="w-36 my-3 border-purple-600 border-t-2" />
									<div className="font-titillium text-lg">
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												code: Code,
											}}>
											{project?.description || ''}
										</ReactMarkdown>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}