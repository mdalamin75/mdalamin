import React from 'react'
import Services from '../components/Services'
import Head from 'next/head'

const service = () => {
    return (
        <div>
            <Head>
                <title>Services</title>
            </Head>
            <section id="service" className="relative pt-32 pb-20">
                <div className="container mx-auto px-3 md:px-5">
                    <div className="service_head">
                        <h1
                            className="font-josefin uppercase text-center text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-slate-100 drop-shadow-2xl">
                            Service
                        </h1>
                        <p className="font-titillium text-lg text-center py-3">
                            Secure your seat, fasten your seatbelt, and join us on an interstellar journey to turn your <br /> web vision into a next level reality.
                        </p>
                    </div>
                    <div className="services py-10">
                        <Services />
                    </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-bottom bg-no-repeat shadow_06"></div>
            </section>
        </div>
    )
}

export default service
