
// import { Link } from 'react-router';
// import careerLogo from '../../../assets/logo.png'

// const CareerLogo = () => {
//     return (
//         <Link to="/">
//             <div className='flex justify-center items-center p-2'>
//                 <img data-aos="fade-up"
//                     data-aos-duration="1000"
//                     className='mb-4' src={careerLogo} alt="" />
//                 <p className='text-3xl font-extrabold -ml-2'>Career Flow</p>
//             </div>
//         </Link>
//     );
// };

// export default CareerLogo;


import { Link } from 'react-router';

const CareerLogo = () => {
    return (
        <Link to="/" className="flex items-center gap-3 p-2 hover:scale-105 transition-transform duration-300">
            <div 
                className="flex-shrink-0"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <svg 
                    width="42" 
                    height="42" 
                    viewBox="0 0 42 42" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Background circle for better visual appeal */}
                    <circle cx="21" cy="21" r="20" fill="url(#bgGradient)" stroke="#E5E7EB" strokeWidth="0.5"/>
                    
                    {/* Career steps with gradient and shadows */}
                    <rect 
                        x="9" y="26" width="18" height="5" rx="2" 
                        fill="url(#step3)" 
                        filter="url(#shadow)"
                        data-aos="fade-up" 
                        data-aos-delay="300"
                    />
                    <rect 
                        x="12" y="19" width="18" height="5" rx="2" 
                        fill="url(#step2)" 
                        filter="url(#shadow)"
                        data-aos="fade-up" 
                        data-aos-delay="400"
                    />
                    <rect 
                        x="15" y="12" width="18" height="5" rx="2" 
                        fill="url(#step1)" 
                        filter="url(#shadow)"
                        data-aos="fade-up" 
                        data-aos-delay="500"
                    />
                    
                    {/* Animated growth arrow */}
                    <g data-aos="zoom-in" data-aos-delay="700">
                        <path 
                            d="M25 8V11M25 8L22 11M25 8L28 11" 
                            stroke="url(#arrowGradient)" 
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Arrow head highlight */}
                        <path 
                            d="M25 8L28 11" 
                            stroke="white" 
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </g>

                    {/* Subtle progress dots */}
                    <circle 
                        cx="18" cy="28" r="1" 
                        fill="#FFFFFF" 
                        opacity="0.8"
                        data-aos="fade-in" 
                        data-aos-delay="600"
                    />
                    <circle 
                        cx="21" cy="21" r="1" 
                        fill="#FFFFFF" 
                        opacity="0.8"
                        data-aos="fade-in" 
                        data-aos-delay="650"
                    />
                    <circle 
                        cx="24" cy="14" r="1" 
                        fill="#FFFFFF" 
                        opacity="0.8"
                        data-aos="fade-in" 
                        data-aos-delay="700"
                    />

                    <defs>
                        {/* Background gradient */}
                        <linearGradient id="bgGradient" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F8FAFC"/>
                            <stop offset="1" stopColor="#F1F5F9"/>
                        </linearGradient>

                        {/* Step gradients - getting progressively brighter */}
                        <linearGradient id="step1" x1="15" y1="12" x2="33" y2="17" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6"/>
                            <stop offset="1" stopColor="#1D4ED8"/>
                        </linearGradient>
                        
                        <linearGradient id="step2" x1="12" y1="19" x2="30" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6"/>
                            <stop offset="0.5" stopColor="#2563EB"/>
                            <stop offset="1" stopColor="#1D4ED8"/>
                        </linearGradient>
                        
                        <linearGradient id="step3" x1="9" y1="26" x2="27" y2="31" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6"/>
                            <stop offset="0.7" stopColor="#2563EB"/>
                            <stop offset="1" stopColor="#1E40AF"/>
                        </linearGradient>

                        {/* Arrow gradient */}
                        <linearGradient id="arrowGradient" x1="22" y1="8" x2="28" y2="11" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1E40AF"/>
                            <stop offset="1" stopColor="#1D4ED8"/>
                        </linearGradient>

                        {/* Shadow filter */}
                        <filter id="shadow" x="-2" y="-2" width="46" height="46" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1E40AF" floodOpacity="0.15"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            
            <div 
                className="flex flex-col"
                data-aos="fade-left"
                data-aos-delay="200"
            >
                <span 
                    className="text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight"
                    data-aos="fade-down"
                    data-aos-delay="300"
                >
                    CareerFlow
                </span>
                <span 
                    className="text-xs font-medium text-gray-600 -mt-1 tracking-wide"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Ascend Your Career
                </span>
            </div>
        </Link>
    );
};

export default CareerLogo;