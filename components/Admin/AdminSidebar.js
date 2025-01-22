// components/Admin/AdminHeader.js
import { MdOutlineMedicalServices, MdOutlineReviews } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import profile from "../../public/mdalamin75 (2).png";
import Image from "next/image";
import { HiOutlineViewGrid } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import Link from "next/link";

const AdminHeader = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
	);
	const [sidebar, setSidebar] = useState("");
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeMenuIndex, setActiveMenuIndex] = useState(null);

	const handleTheme = (e) => {
		if (e.target.checked) {
			setTheme("night");
		} else {
			setTheme("light");
		}
	};

	const handleSidebar = (e) => {
		const isChecked = e.target.checked;
		setIsDrawerOpen(isChecked);
		setSidebar(isChecked ? "swap-on" : "swap-off");
	};

	const toggleSubmenu = (index) => {
		setActiveMenuIndex(activeMenuIndex === index ? null : index);
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const localTheme = localStorage.getItem("theme");
		document.querySelector("html").setAttribute("data-theme", localTheme);
	}, [theme]);

	const menuItems = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
			text: "Home",
			href: "/admin/home"
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			text: "About",
			href: "/admin/about"
		},
		{
			icon: <MdOutlineMedicalServices className="text-xl" />,
			text: "Services",
			href: "/admin/services",
			submenu: [
				{ text: "Add Service", href: "/admin/services/add-service" },
				{ text: "Draft Service", href: "/admin/services/seo" },
			],
		},
		{
			icon: <IoBriefcaseOutline className="text-xl" />,
			text: "Portfolio",
			href: "/admin/portfolio",
			submenu: [
				{ text: "Recent Work", href: "/admin/portfolio/recent" },
				{ text: "Case Studies", href: "/admin/portfolio/case-studies" },
			],
		},
		{
			icon: <MdOutlineReviews className="text-xl" />,
			text: "Testimonial",
			href: "/admin/testimonial",
			submenu: [
				{ text: "Customer Reviews", href: "/admin/testimonial/reviews" },
				{ text: "Case Studies", href: "/admin/testimonial/case-studies" },
			],
		},
		{
			icon: <HiOutlineViewGrid className="text-xl" />,
			text: "Blog",
			href: "/admin/blog",
			submenu: [
				{ text: "Latest Posts", href: "/admin/blog/latest" },
				{ text: "Categories", href: "/admin/blog/categories" },
			],
		},
		{
			icon: <AiOutlineShop className="text-xl" />,
			text: "Shop",
			href: "/admin/shop",
			submenu: [
				{ text: "Products", href: "/admin/shop/products" },
				{ text: "Orders", href: "/admin/shop/orders" },
			],
		},
		{
			icon: <GrContact className="text-xl" />,
			text: "Contact",
			href: "/admin/contact"
		}
	];

	return (
		<div className="navbar bg-base-100 shadow items-start fixed">
			<div className="navbar-start">
				<div className="drawer">
					<input
						id="my-drawer"
						type="checkbox"
						className="drawer-toggle"
						onChange={handleSidebar}
					/>
					<div className="drawer-content">
						<label
							htmlFor="my-drawer"
							className="btn drawer-button swap swap-rotate"
							onClick={handleSidebar}
						>
							<input type="checkbox" checked={sidebar === "swap-on"} />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 swap-off fill-current"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
							<svg
								className="swap-on fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 512 512"
							>
								<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
							</svg>
						</label>
					</div>
					<div className="drawer-side mt-16">
						<label
							htmlFor="my-drawer"
							aria-label="close sidebar"
							className="drawer-overlay"
							onClick={handleSidebar}
						></label>
						<ul className="menu bg-base-100 shadow text-base-content min-h-full w-50 p-4 gap-10 sidebar_menu">
							{menuItems.map((item, index) => (
								<li key={index} className="relative">
									{item.submenu ? (
										<div className="flex items-center cursor-pointer" onClick={() => toggleSubmenu(index)}>
											<div className="">{item.icon}</div>
											{isDrawerOpen && (
												<span className="text-lg font-bold ml-2">{item.text}</span>
											)}
											<svg
												className={`transform transition-transform ${activeMenuIndex === index ? "rotate-180" : "rotate-0"} ml-2`}
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path fillRule="evenodd" d="M10 14l-6-6h12l-6 6z" />
											</svg>
										</div>
									) : (
										<Link href={item.href} className="flex items-center">
											<div className="">{item.icon}</div>
											{isDrawerOpen && (
												<span className="text-lg font-bold ml-2">{item.text}</span>
											)}
										</Link>
									)}
									{item.submenu && (
										<ul className={`submenu bg-base-100 shadow text-base-content p-2 mt-2 rounded absolute left-0 w-48 ${activeMenuIndex === index ? "block" : "hidden"}`}>
											{item.submenu.map((subitem, subindex) => (
												<li key={subindex} className="p-1">
													<Link href={subitem.href}>{subitem.text}</Link>
												</li>
											))}
										</ul>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div></div>)
}