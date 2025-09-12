// pages/admin/index.js
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { FaShoppingBag, FaBriefcase, FaComments, FaNewspaper, FaBoxOpen } from "react-icons/fa";

// Lazy load heavy chart components
const Bar = dynamic(() => import("react-chartjs-2").then(mod => ({ default: mod.Bar })), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
});

const Pie = dynamic(() => import("react-chartjs-2").then(mod => ({ default: mod.Pie })), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
});

// Lazy load Chart.js registration
const loadChartJS = async () => {
  const {
    Chart: ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } = await import("chart.js");
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  
  return ChartJS;
};

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    services: 0,
    portfolios: 0,
    testimonials: 0,
    blogs: 0,
    products: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    } else if (session && !session.user?.twoFactorVerified) {
      router.replace("/admin/2fa-verify");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.twoFactorVerified) {
      fetchStats();
      // Load Chart.js in background
      loadChartJS().then(() => {
        setChartLoaded(true);
      });
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const [servicesRes, portfoliosRes, testimonialsRes] = await Promise.all([
        axios.get('/api/service'),
        axios.get('/api/portfolio'),
        axios.get('/api/testimonial'),
      ]);

      setStats({
        services: servicesRes.data.length,
        portfolios: portfoliosRes.data.length,
        testimonials: testimonialsRes.data.length,
        blogs: 0, // Currently no blog model
        products: 0 // Will be used for future shop items
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  // Show loading state while checking session
  if (status === "loading" || !session?.user?.twoFactorVerified || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Prepare chart data
  const barChartData = {
    labels: ['Services', 'Portfolios', 'Testimonials'],
    datasets: [
      {
        label: 'Total Items',
        data: [stats.services, stats.portfolios, stats.testimonials],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Services', 'Portfolios', 'Testimonials'],
    datasets: [
      {
        label: 'Content Distribution',
        data: [stats.services, stats.portfolios, stats.testimonials],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {/* Services */}
          <div className="glass shadow-md rounded-lg p-4 border-l-4 border-primary backdrop-blur-sm">
            <div className="flex items-center">
              <div className="bg-primary bg-opacity-20 p-3 rounded-full mr-4">
                <FaShoppingBag className="text-primary text-xl" />
              </div>
              <div>
                <h2 className="text-base-content text-opacity-70 text-sm">Total Services</h2>
                <p className="text-base-content text-2xl font-bold">{stats.services}</p>
              </div>
            </div>
          </div>
          
          {/* Portfolios */}
          <div className="glass shadow-md rounded-lg p-4 border-l-4 border-secondary backdrop-blur-sm">
            <div className="flex items-center">
              <div className="bg-secondary bg-opacity-20 p-3 rounded-full mr-4">
                <FaBriefcase className="text-secondary text-xl" />
              </div>
              <div>
                <h2 className="text-base-content text-opacity-70 text-sm">Total Portfolio Projects</h2>
                <p className="text-base-content text-2xl font-bold">{stats.portfolios}</p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="glass shadow-md rounded-lg p-4 border-l-4 border-accent backdrop-blur-sm">
            <div className="flex items-center">
              <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                <FaComments className="text-accent text-xl" />
              </div>
              <div>
                <h2 className="text-base-content text-opacity-70 text-sm">Total Testimonials</h2>
                <p className="text-base-content text-2xl font-bold">{stats.testimonials}</p>
              </div>
            </div>
          </div>
          
          {/* Blogs (Placeholder) */}
          <div className="glass shadow-md rounded-lg p-4 border-l-4 border-info backdrop-blur-sm">
            <div className="flex items-center">
              <div className="bg-info bg-opacity-20 p-3 rounded-full mr-4">
                <FaNewspaper className="text-info text-xl" />
              </div>
              <div>
                <h2 className="text-base-content text-opacity-70 text-sm">Total Blogs</h2>
                <p className="text-base-content text-2xl font-bold">{stats.blogs}</p>
              </div>
            </div>
          </div>
          
          {/* Total Products */}
          <div className="glass shadow-md rounded-lg p-4 border-l-4 border-success backdrop-blur-sm">
            <div className="flex items-center">
              <div className="bg-success bg-opacity-20 p-3 rounded-full mr-4">
                <FaBoxOpen className="text-success text-xl" />
              </div>
              <div>
                <h2 className="text-base-content text-opacity-70 text-sm">Total Products</h2>
                <p className="text-base-content text-2xl font-bold">{stats.products}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-lg shadow-md backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-base-content">Content Distribution</h2>
            <div className="h-64">
              {chartLoaded ? (
                <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
              ) : (
                <div className="h-full bg-gray-200 animate-pulse rounded flex items-center justify-center">
                  <span className="text-gray-500">Loading chart...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="glass p-6 rounded-lg shadow-md backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-base-content">Content Percentage</h2>
            <div className="h-64">
              {chartLoaded ? (
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              ) : (
                <div className="h-full bg-gray-200 animate-pulse rounded flex items-center justify-center">
                  <span className="text-gray-500">Loading chart...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  if (!session.user?.twoFactorVerified) {
    return {
      redirect: {
        destination: "/admin/2fa-verify",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
