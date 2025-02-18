import useFetch from "../../../hooks/useFetch";
import Link from "next/link";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LoadingScreen } from "../../../components/Admin/LoadingScreen";
import axios from "axios";
import { withAdminAuth } from "../../../layouts/withAdminAuth";
import { useAuth } from "../../../hooks/useAuth";
import AdminLayout from "../../../layouts/AdminLayout";
import Image from "next/image";

export default function allPortfolio({ initialData }) {
    const { isLoading } = useAuth();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1); // for page 1
    const [perPage] = useState(7);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch portfolio data
    const { data: portfolioData, loading, refetch } = useFetch("portfolio", initialData);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Total number of portfolios
    const allportfolio = Array.isArray(portfolioData) ? portfolioData.length : 0;

    // Filter all data based on search query
    const filteredPortfolios = Array.isArray(portfolioData)
        ? (searchQuery.trim() === '' ? portfolioData : portfolioData.filter(portfolio => portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())))
        : [];

    // Calculate index of the first portfolio displayed on the current page
    const indexOfFirstPortfolio = (currentPage - 1) * perPage;
    const indexOfLastPortfolio = currentPage * perPage;

    // Get the current page's portfolios
    const currentPortfolios = filteredPortfolios.slice(indexOfFirstPortfolio, indexOfLastPortfolio);
    const publishedPortfolios = currentPortfolios.filter(ab => ab.status === 'publish'); // For draft portfolio
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allportfolio / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <AdminLayout>
            <div className="draftportfolio p-6">
                <div className="titledashboard flex flex-sb">
                <h1 className="text-2xl font-bold mb-4">Admin All Portfolio</h1>
                </div>
                <div className="blogstable">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-semibold text-lg">Search Projects</h2>
                        <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." className="file-input file-input-bordered ps-3" />
                    </div>
                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}><LoadingScreen /></td>
                                </tr>
                            ) : (
                                publishedPortfolios.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Portfolio Found</td>
                                    </tr>
                                ) : (
                                    publishedPortfolios.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstPortfolio + index + 1}</td>
                                            <td><Image src={blog.images[0]} width={180} alt="image" /></td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/admin/portfolio/edit/' + blog._id}> <button className="btn btn-accent"> <FaEdit /> </button> </Link>
                                                    <Link href={'/admin/portfolio/delete/' + blog._id}> <button className="btn btn-warning"> <RiDeleteBin6Fill /> </button> </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                    {publishedPortfolios.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="btn btn-info btn-sm"
                        >
                            Previous
                        </button>
                        {pageNumbers
                            .slice(
                                Math.max(currentPage - 3, 0), 
                                Math.min(currentPage + 2, pageNumbers.length)
                            )
                            .map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''} text-lg mx-3 ` }
                                >
                                    {number}
                                </button>
                            ))}
                        <button 
                            onClick={() => paginate(currentPage + 1)} 
                            disabled={currentPage >= Math.ceil(filteredPortfolios.length / perPage)}
                            className="btn btn-info btn-sm"
                        >
                            Next
                        </button>
                    </div>
                )}
                </div>
            </div>
        </AdminLayout>
    );
}

export const getServerSideProps = withAdminAuth(async (context) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`);
        return { props: { initialData: response.data } };
    } catch {
        return { props: { initialData: null } };
    }
});
