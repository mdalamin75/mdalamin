// components/Admin/AdminHeader.js
import { MdOutlineMedicalServices, MdOutlineReviews, MdDashboard, MdList, MdAdd, MdDrafts, MdSpaceDashboard } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import profile from "../../public/mdalamin75 (2).png";
import Image from "next/image";
import { HiOutlineViewGrid } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminHeader = () => {
	const router = useRouter();
	// Initialize theme to null and don't set default value until loaded from localStorage
	const [theme, setTheme] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeMenuIndex, setActiveMenuIndex] = useState(null);
	const sidebarRef = useRef(null);
	const iconSidebarRef = useRef(null);

	// Load theme from localStorage when component mounts
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.querySelector("html").setAttribute("data-theme", savedTheme);
	}, []);

	const handleTheme = (e) => {
		const newTheme = e.target.checked ? "night" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.querySelector("html").setAttribute("data-theme", newTheme);
	};

	const handleSidebar = () => {
		setIsDrawerOpen(!isDrawerOpen);
		if (isDrawerOpen) {
			setActiveMenuIndex(null);
		}
	};

	const toggleSubmenu = (index) => {
		setActiveMenuIndex(activeMenuIndex === index ? null : index);
		// Scroll to ensure the submenu is visible
		setTimeout(() => {
			if (sidebarRef.current && activeMenuIndex !== index) {
				const submenuElement = sidebarRef.current.querySelector(`li[data-index="${index}"]`);
				if (submenuElement) {
					submenuElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
				}
			}
		}, 100);
	};

	const submenuIcons = {
		list: <MdList className="text-lg" />,
		add: <MdAdd className="text-lg" />,
		draft: <MdDrafts className="text-lg" />
	};

	const menuItems = [
		{
			icon: <MdSpaceDashboard className="text-xl" />,
			text: "Dashboard",
			href: "/admin", // Points to the main admin index page
		},
		{
			icon: <MdDashboard className="text-xl" />,
			text: "Home",
			href: "/admin/home",
		},
		{
			icon: <BsInfoCircle className="text-xl" />,
			text: "About",
			href: "/admin/about",
		},
		{
			icon: <MdOutlineMedicalServices className="text-xl" />,
			text: "Services",
			href: "/admin/services",
			submenu: [
				{ icon: submenuIcons.list, text: "All Service", href: "/admin/service/" },
				{ icon: submenuIcons.add, text: "Add Service", href: "/admin/service/addservice" },
				{ icon: submenuIcons.draft, text: "Draft Service", href: "/admin/service/draftservice" },
			],
		},
		{
			icon: <IoBriefcaseOutline className="text-xl" />,
			text: "Portfolio",
			href: "/admin/portfolio",
			submenu: [
				{ icon: submenuIcons.list, text: "All Portfolio", href: "/admin/portfolio/" },
				{ icon: submenuIcons.add, text: "Add Portfolio", href: "/admin/portfolio/addportfolio" },
				{ icon: submenuIcons.draft, text: "Draft Portfolio", href: "/admin/portfolio/draftportfolio" },
			],
		},
		{
			icon: <MdOutlineReviews className="text-xl" />,
			text: "Testimonial",
			href: "/admin/testimonial",
			submenu: [
				{ icon: submenuIcons.list, text: "All Testimonial", href: "/admin/testimonial/" },
				{ icon: submenuIcons.add, text: "Add Testimonial", href: "/admin/testimonial/addtestimonial" },
				{ icon: submenuIcons.draft, text: "Draft Testimonial", href: "/admin/testimonial/drafttestimonial" },
			],
		},
		{
			icon: <HiOutlineViewGrid className="text-xl" />,
			text: "Blog",
			href: "/admin/blog",
			submenu: [
				{ icon: submenuIcons.list, text: "All Blog", href: "/admin/blog/" },
				{ icon: submenuIcons.add, text: "Add Blog", href: "/admin/blog/addblog" },
				{ icon: submenuIcons.draft, text: "Draft Blog", href: "/admin/blog/draftblog" },
			],
		},
		{
			icon: <AiOutlineShop className="text-xl" />,
			text: "Shop",
			href: "/admin/shop",
			submenu: [
				{ icon: submenuIcons.list, text: "All Shop", href: "/admin/shop/" },
				{ icon: submenuIcons.add, text: "Add Shop", href: "/admin/shop/addshop" },
				{ icon: submenuIcons.draft, text: "Draft Shop", href: "/admin/shop/draftshop" },
			],
		},
		{
			icon: <GrContact className="text-xl" />,
			text: "Contact",
			href: "/admin/contact",
		},
	];

	// Calculate sidebar width for proper overlay positioning
	const sidebarWidth = 256; // 16rem or 256px (standard width for w-64)
	const iconSidebarWidth = 70; // Width for icons-only sidebar

	// Helper function to check if a route is active
	const isActive = (href) => {
		if (href === '/admin' && router.pathname === '/admin') {
			return true;
		}
		
		if (href === '/admin/home' && router.pathname === '/admin/home') {
			return true;
		}
		
		if (href !== '/admin' && href !== '/admin/home') {
			return router.pathname.startsWith(href);
		}
		
		return false;
	};

	// Set consistent menu item height
	const menuItemHeight = "h-12";

	return (
		<>
			{/* Main content padding for sidebar */}
			<style jsx global>{`
				.admin-layout-main {
					padding-left: ${iconSidebarWidth}px;
					transition: padding-left 0.3s ease-in-out;
				}
			`}</style>

			{/* Add an overlay that appears when sidebar is open but only covers the area outside the sidebar */}
			{isDrawerOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" 
					onClick={handleSidebar}
					style={{ 
						marginLeft: `${sidebarWidth}px`, // Push the overlay to the right of the sidebar
						width: `calc(100% - ${sidebarWidth}px)` // Make overlay width only cover the area outside sidebar
					}}
				></div>
			)}
			
			{/* Icons-only sidebar (always visible) */}
			<div 
				ref={iconSidebarRef}
				className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-base-100 shadow-xl z-[9997] transition-all duration-300 ease-in-out ${isDrawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
				style={{ width: `${iconSidebarWidth}px` }}
			>
				<ul className="menu bg-base-100 text-base-content w-full p-2 gap-3">
					{menuItems.map((item, index) => {
						const isMenuActive = isActive(item.href);
						
						return (
							<li key={index} className="relative" data-index={index}>
								{item.submenu ? (
									<div 
										className={`flex justify-center items-center ${menuItemHeight} p-2 rounded-lg cursor-pointer ${isMenuActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`}
										onClick={() => {
											handleSidebar(); // Open the full sidebar
											setTimeout(() => toggleSubmenu(index), 300); // Open the submenu after sidebar animation
										}}
									>
										<div className="mx-auto">{item.icon}</div>
									</div>
								) : (
									<Link
										href={item.href}
										className={`flex justify-center items-center ${menuItemHeight} p-2 rounded-lg ${isMenuActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`}
									>
										<div className="mx-auto">{item.icon}</div>
									</Link>
								)}
							</li>
						);
					})}
				</ul>
			</div>
			
			<div className="navbar bg-base-100 shadow items-start fixed z-[9999]">
				<div className="navbar-start">
					<div className="relative flex items-center">
						{/* Menu button to toggle sidebar */}
						<button 
							className="btn btn-ghost btn-circle cursor-pointer flex items-center justify-center"
							onClick={handleSidebar}
						>
							{isDrawerOpen ? (
								<svg
									className="h-7 w-7"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="h-7 w-7"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
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
							)}
						</button>
						
						{/* Full sidebar with higher z-index than the overlay */}
						<div 
							ref={sidebarRef}
							className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-base-100 shadow-xl transition-all duration-300 ease-in-out z-[99999] ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
							style={{ pointerEvents: 'auto', width: `${sidebarWidth}px`, overflowY: 'auto' }}
						>
							<ul className="menu bg-base-100 text-base-content w-full p-2 gap-3">
								{menuItems.map((item, index) => {
									const isMenuActive = isActive(item.href);
									
									return (
										<li key={index} className="relative" data-index={index}>
											{item.submenu ? (
												<div className="w-full flex flex-col items-start ps-0">
													<div
														className={`flex items-center ${menuItemHeight} p-2 rounded-lg cursor-pointer w-full ${isMenuActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`}
														onClick={() => toggleSubmenu(index)}
													>
														<div className="mr-2">{item.icon}</div>
														<span className="text-lg font-medium">{item.text}</span>
													</div>
													{activeMenuIndex === index && (
														<ul className="ml-6 mt-2 space-y-2 w-full">
															{item.submenu.map((subitem, subindex) => {
																const isSubmenuActive = isActive(subitem.href);
																
																return (
																	<li key={subindex}>
																		<Link
																			href={subitem.href}
																			className={`flex items-center ${menuItemHeight} p-2 rounded-lg w-full 
																				${isSubmenuActive 
																					? 'bg-primary bg-opacity-20 text-primary font-semibold' 
																					: 'hover:bg-base-300'}`}
																			onClick={handleSidebar}
																		>
																			<div className="mr-2">{subitem.icon}</div>
																			<span>{subitem.text}</span>
																		</Link>
																	</li>
																);
															})}
														</ul>
													)}
												</div>
											) : (
												<Link
													href={item.href}
													className={`flex items-center ${menuItemHeight} p-2 rounded-lg w-full ${isMenuActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`}
													onClick={handleSidebar}
												>
													<div className="mr-2">{item.icon}</div>
													<span className="text-lg font-medium">{item.text}</span>
												</Link>
											)}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				
				<div className="navbar-center">
					<Link href="/admin" className="btn btn-ghost text-xl">
						Admin Dashboard
					</Link>
				</div>
				<div className="navbar-end">
					<div className="mr-5">
						<label className="swap swap-rotate align-middle">
							<input
								type="checkbox"
								onChange={handleTheme}
								checked={theme === "night"}
							/>
							<svg
								className="swap-on h-8 w-8 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24">
								<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
							</svg>
							<svg
								className="swap-off h-8 w-8 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24">
								<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
							</svg>
						</label>
					</div>
					
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full bg-slate-100">
								<Image alt="Profile Picture" src={profile}  width={50} height={50} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100000] mt-3 w-52 p-2 shadow">
							<li>
								<Link href="/admin" className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<Link href="/admin">Settings</Link>
							</li>
							<li>
								<button
									onClick={() => signOut({ callbackUrl: "/admin/login" })}
									className="w-full bg-red-500 text-white p-1 rounded hover:bg-red-600">
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminHeader;
