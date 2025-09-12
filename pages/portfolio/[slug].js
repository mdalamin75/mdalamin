import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from 'react';
import Image from "next/image";
import LoadingSpinner from "../../components/LoadingSpinner";
import SEO from "../../components/SEO";

// Lazy load heavy components to reduce bundle size
const Swiper = dynamic(() => import("swiper/react").then(mod => ({ default: mod.Swiper })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-700 h-64 rounded"></div>
});

const SwiperSlide = dynamic(() => import("swiper/react").then(mod => ({ default: mod.SwiperSlide })), {
  ssr: false
});

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then(mod => mod.Prism), {
  ssr: false,
  loading: () => <div className="bg-gray-800 p-4 rounded animate-pulse">Loading code...</div>
});

// Lazy load Swiper modules
const loadSwiperModules = () => import("swiper").then(mod => ({
  FreeMode: mod.FreeMode,
  Pagination: mod.Pagination
}));

export default function ProjectSlug({ initialData }) {
	const router = useRouter();
	const { slug } = router.query;
	const [swiperModules, setSwiperModules] = useState(null);

	// Load Swiper modules dynamically
	useEffect(() => {
		loadSwiperModules().then(setSwiperModules);
	}, []);

	const {
		data: project,
		loading,
		error
	} = useFetch(`portfolio?slug=${slug}`, initialData);

	// Redirect to 404 when project not found
	useEffect(() => {
		if (!loading && !error) {
			// Check if there's no project data or if it's an empty array
			if (!project || (Array.isArray(project) && project.length === 0)) {
				router.push('/404');
			}
		}
	}, [project, loading, error, router]);

	if (loading) {
		return <LoadingSpinner variant="ring" size="lg" text="Loading project details" fullContainer={true} />;
	}

	if (error) {
		return <div className="container mx-auto py-20 text-center">
			<h2 className="text-2xl font-semibold text-red-500">Error loading project</h2>
			<p className="mt-4">Please try again later or contact the administrator.</p>
		</div>;
	}

	// Project data extracted from API response
	const projectData = Array.isArray(project) && project.length > 0 ? project[0] : project;

	// If no project data, return null (useEffect will handle redirect)
	if (!projectData) {
		return null;
	}

	// Safely access the images array
	const firstImage = projectData?.images?.[0] || '';
	const projectImages = projectData?.images || [];

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

	// Extract data for convenience
	const {
		title,
		description,
		thumbnail,
		images,
		projectcategory,
		techstack,
		github,
		livelink,
		tags,
	} = projectData;

	// Create SEO description from project description
	const seoDescription = description ?
		`${description.substring(0, 150)}... View this ${projectcategory ? projectcategory.join(', ') : ''} project by MD. AL AMIN.` :
		`${title} - A ${projectcategory ? projectcategory.join(', ') : 'web development'} project by MD. AL AMIN. View details, technologies used, and screenshots.`;

	// Create SEO keywords from project tags and categories
	const seoKeywords = [
		"mdalamin",
		"mdalamin75",
		"web developer portfolio",
		...((projectcategory && projectcategory.length) ? projectcategory : []),
		...((tags && tags.length) ? tags : []),
		...((techstack && techstack.length) ? techstack : []),
		"portfolio project",
		"web development",
		"case study"
	].join(", ");

	return (
		<>
			<SEO
				title={`${title} | Project by MD. AL AMIN`}
				description={seoDescription}
				keywords={seoKeywords}
				ogImage={thumbnail || (images && images.length > 0 ? images[0] : '/profile.jpg')}
				ogType="article"
			/>

			{/* Structured Data for Project */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "CreativeWork",
						"name": title,
						"description": description,
						"creator": {
							"@type": "Person",
							"name": "MD. AL AMIN",
							"url": "https://mdalamin.vercel.app"
						},
						"image": images && images.length > 0 ? images.map(img => img.startsWith('http') ? img : `https://mdalamin.vercel.app${img}`) : [],
						"thumbnailUrl": thumbnail ? (thumbnail.startsWith('http') ? thumbnail : `https://mdalamin.vercel.app${thumbnail}`) : null,
						"keywords": tags ? tags.join(", ") : "",
						"url": `https://mdalamin.vercel.app/portfolio/${projectData.slug}`,
						"datePublished": projectData.createdAt || new Date().toISOString(),
						"dateModified": projectData.updatedAt || new Date().toISOString(),
						"genre": projectcategory ? projectcategory.join(", ") : "",
						"workExample": livelink ? { "@type": "WebSite", "url": livelink } : null
					})
				}}
			/>

			<section id="portfolio" className="relative bg_pattern py-20">
				<div className="container mx-auto px-3 md:px-5">
					<div className="projectslug pt-10">
						<div className="projectslugimg">
							<div className="container">
								<div className="max-h-96 overflow-hidden">
									{firstImage && (
										<Image
											width={900}
											height={300}
											src={firstImage}
											alt={`${title} - ${projectcategory ? projectcategory.join(', ') : 'Web Project'} by MD. AL AMIN`}
											className="w-full object-top"
											priority
										/>
									)}
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 py-10">
									<div className="leftmainproinfo">
										<h1 className="text-2xl font-bold font-josefin mb-5">
											{projectData?.title}
										</h1>
										{projectData?.livepreview && (
											<a
												href={projectData.livepreview}
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
												{Array.isArray(projectData?.projectcategory)
													? projectData.projectcategory.join(', ')
													: projectData?.projectcategory}
											</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Client Name</h3>
											<h2>{projectData?.client}</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Start Date</h3>
											<h2>{projectData?.createdAt ? new Date(projectData.createdAt).toLocaleDateString() : ''}</h2>
										</div>
										<div>
											<h3 className="text-xl font-bold font-josefin">Developer Name</h3>
											<h2>mdalamin</h2>
										</div>
									</div>
								</div>

								{projectImages.length > 0 && (
									<div className="max-h-48 overflow-hidden">
									{swiperModules ? (
										<Swiper
											slidesPerView={"auto"}
											spaceBetween={30}
											freeMode={true}
											grabCursor={true}
											modules={[swiperModules.FreeMode]}
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
									) : (
										<div className="animate-pulse bg-gray-700 h-48 rounded"></div>
									)}
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
											{projectData?.description || ''}
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

export async function getServerSideProps(context) {
	const { slug } = context.params;

	// Use your API or directly query your database/model here
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://mdalamin.vercel.app'}/api/portfolio?slug=${slug}`);
	let data = null;
	try {
		data = await res.json();
	} catch (e) {
		data = null;
	}

	if (!data || data.error) {
		return { notFound: true };
	}

	return {
		props: {
			initialData: Array.isArray(data) ? data : [data],
		},
	};
}