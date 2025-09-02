import React from 'react'
import Services from '../components/Services'
import SEO from '../components/SEO'
import useFetch from "../hooks/useFetch";

const Service = ({ initialData }) => {
    // Fetch Service data to use in SEO metadata
    const { data: serviceData, loading } = useFetch("service", initialData);

    // Extract service titles and descriptions for SEO
    const servicesList = !loading && serviceData ?
        serviceData
            .filter(service => service.status === "publish")
            .map(service => service.title)
        : [];

    // Create service-specific keywords
    const serviceKeywords = [
        "web development services",
        "website development",
        "WordPress development",
        "eCommerce website",
        "React development",
        "Next.js development",
        "Shopify store development",
        "responsive web design",
        "custom website development",
        "frontend development",
        "UI/UX design services",
        "web application development",
        "full stack development",
        "website maintenance",
        "website optimization",
        "performance optimization",
        "SEO-friendly websites",
        "mobile-friendly websites",
        "business website development",
        "professional web services",
        "affordable web development",
        "expert web developer",
        "mdalamin services",
        "mdalamin75 services",
        "hire web developer",
        "freelance developer services"
    ];

    // Add actual service names to keywords if available
    const allServiceKeywords = servicesList.length > 0 ?
        [...serviceKeywords, ...servicesList].join(", ") :
        serviceKeywords.join(", ");

    return (
        <div>
            <SEO
                title="Professional Web Development Services | MD. AL AMIN"
                description="Expert web development services by MD. AL AMIN. Specializing in custom websites, WordPress development, e-commerce solutions, React/Next.js applications, and responsive design. Hire a professional developer for your next project."
                keywords={allServiceKeywords}
                ogImage="/services-banner.jpg"
            />

            {/* Structured Data for Services */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Web Development Services",
                        "provider": {
                            "@type": "Person",
                            "name": "MD. AL AMIN",
                            "url": "https://mdalamin.com"
                        },
                        "description": "Professional web development services including custom website development, WordPress solutions, e-commerce websites, and more.",
                        "offers": {
                            "@type": "Offer",
                            "availability": "https://schema.org/InStock"
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "Worldwide"
                        }
                    })
                }}
            />

            {/* Professional Services Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "MD. AL AMIN Web Development Services",
                        "url": "https://mdalamin.com/service",
                        "logo": "https://mdalamin.com/logo.png",
                        "description": "Professional web development services for businesses and individuals. Expert in WordPress, React, Next.js, and e-commerce solutions.",
                        "telephone": "+880-000-000000",
                        "email": "mdalamiin75@gmail.com",
                        "priceRange": "$$",
                        "serviceArea": "Worldwide",
                        "knowsAbout": [
                            "Web Development",
                            "WordPress",
                            "E-commerce",
                            "React.js",
                            "Next.js",
                            "Shopify",
                            "Frontend Development",
                            "UI/UX Design"
                        ],
                        "makesOffer": servicesList.length > 0 ?
                            servicesList.map(service => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": service
                                }
                            })) :
                            [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Website Development"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "WordPress Development"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "E-commerce Solutions"
                                    }
                                }
                            ]
                    })
                }}
            />

            <section id="service" className="relative pt-32 pb-20">
                <div className="container mx-auto px-3 md:px-5">
                    <div className="service_head">
                        <h1
                            className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-slate-100 drop-shadow-2xl">
                            Services
                        </h1>
                        <p className="font-titillium text-lg text-center py-3">
                            Secure your seat, fasten your seatbelt, and join us on an interstellar journey to turn your <br /> web vision into a next level reality.
                        </p>
                    </div>
                    <div className="services py-10">
                        <Services initialData={initialData} />
                    </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_06"></div>
            </section>
        </div>
    )
}

// Rename the function to match the capitalization of the export
export default Service

// Add getServerSideProps to fetch initial data
export async function getServerSideProps() {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // Fetch service data
        const response = await fetch(`${base}/api/service`);
        if (!response.ok) throw new Error('Failed to fetch service data');
        const initialData = await response.json();

        return { props: { initialData } };
    } catch (error) {
        console.error('Error fetching service data:', error);
        return { props: { initialData: null } };
    }
}
