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
		href: "/admin/services"
	  },
	  {
		icon: <IoBriefcaseOutline className="text-xl" />,
		text: "Portfolio",
		href: "/admin/portfolio"
	  },
	  {
		icon: <MdOutlineReviews className="text-xl" />,
		text: "Testimonial",
		href: "/admin/testimonial"
	  },
	  {
		icon: <HiOutlineViewGrid className="text-xl" />,
		text: "Blog",
		href: "/admin/blog"
	  },
	  {
		icon: <AiOutlineShop className="text-xl" />,
		text: "Shop",
		href: "/admin/shop"
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
				  <li key={index}>
					<Link 
					  href={item.href}
					  className=""
					>
					  <div className="">{item.icon}</div>
					  {isDrawerOpen && (
						<span className="text-lg font-bold ml-2">{item.text}</span>
					  )}
					</Link>
				  </li>
				))}
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
				checked={theme === "light" ? false : true}
			  />
			  <svg
				className="swap-on h-8 w-8 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			  >
				<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
			  </svg>
			  <svg
				className="swap-off h-8 w-8 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			  >
				<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
			  </svg>
			</label>
		  </div>
		  <div className="dropdown dropdown-end">
			<div
			  tabIndex={0}
			  role="button"
			  className="btn btn-ghost btn-circle avatar"
			>
			  <div className="w-10 rounded-full bg-slate-100">
				<Image alt="Profile Picture" src={profile} />
			  </div>
			</div>
			<ul
			  tabIndex={0}
			  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
			>
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
				  className="w-full bg-red-500 text-white p-1 rounded hover:bg-red-600"
				>
				  Logout
				</button>
			  </li>
			</ul>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default AdminHeader;
