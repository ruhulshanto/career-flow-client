

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import satisfaction from '../../../assets/Satisfaction.webp'; 
import { Link } from 'react-router';

const Banner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    return (
        <section
            className="bg-cover bg-center bg-no-repeat text-white"
            style={{
                backgroundImage: `url(${satisfaction})`,
            }}
        >
            <div className="bg-black/60 w-full h-full">
                <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    {/* Left Content */}
                    <div className="space-y-6 z-10">
                        <button 
                            className="px-5 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur"
                            data-aos="fade-down"
                            data-aos-delay="100"
                        >
                            We are
                        </button>
                        
                        <h1 
                            className="text-4xl md:text-5xl font-extrabold leading-tight"
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            Shape Your Future with <br />
                            <span className="text-white">CAREER GUIDELINE</span>
                        </h1>
                        
                        <p 
                            className="text-white/90 text-base md:text-lg max-w-md"
                            data-aos="fade-right"
                            data-aos-delay="300"
                        >
                            Expert Guidance for Global Education – From University Selection to Campus Arrival, We're with You Every Step of the Way.
                        </p>

                        {/* Buttons */}
                        <div 
                            className="flex flex-wrap gap-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <Link to="/roadLayout/roadmap" className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition hover:scale-105 transform duration-300">
                                Explore Your Path <span className="text-xl font-bold">+</span>
                            </Link>
                        </div>
                    </div>

                    
                    <div 
                        className="hidden md:flex justify-center"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-purple-400 rounded-full opacity-30 blur-lg animate-pulse"></div>
                            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                <h3 className="text-xl font-bold mb-4 text-center">Your Journey Starts Here</h3>
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-white/80 text-center">Personalized career guidance tailored just for you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;