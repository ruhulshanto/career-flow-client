import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useScrollToTop } from "../../hook/useScrollToTop";

// Developer Data
const teamMembers = [
    {
        id: 1,
        name: "Ruhul Amin Shanto",
        role: "MERN Stack Developer",
        image: "https://i.ibb.co.com/Tqv068Cd/shanto-Img.webp",
        description: "Passionate full-stack developer specializing in modern web technologies",
        expertise: ["Node.js", "React.js", "Next.js", "MongoDB", "Express.js", "JavaScript", "Tailwind CSS"]
    }
];

// Statistics data
const statistics = [
    { number: "50+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "10+", label: "Technologies" }
];

const AboutUs = () => {
    useScrollToTop();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Section */}
            <section className="relative py-16 md:py-24 lg:py-32 text-white overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://i.ibb.co.com/VcLV2f6K/Satisfaction.webp")'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-6 border border-white/20">
                        <span className="text-yellow-300 font-semibold text-sm sm:text-lg">About Career Flow</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6" data-aos="fade-up">
                        About <span className="text-yellow-300">Us</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                        Empowering Students to Navigate Their Career Journey with Confidence and Clarity
                    </p>
                    <div className="w-24 sm:w-32 h-1 bg-yellow-300 mx-auto mb-6 sm:mb-8 rounded-full" data-aos="fade-up" data-aos-delay="200"></div>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="300">
                        <button className="bg-yellow-400 text-blue-900 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                            Get Started
                        </button>
                        <button className="border-2 border-white text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                            Our Services
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2" data-aos="fade-up" data-aos-delay="400">
                    <div className="animate-bounce">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                        {/* Mission Card */}
                        <div
                            className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border-l-4 border-blue-500 transform hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-300"
                            data-aos="fade-right"
                        >
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                    Our <span className="text-blue-600">Mission</span>
                                </h2>
                            </div>
                            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                                To bridge the gap between education and employment by providing comprehensive career guidance
                                that helps students discover their true potential and navigate the complex world of career choices.
                            </p>
                            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                                We believe every student deserves access to quality career counseling that considers their
                                unique strengths, interests, and aspirations in today's dynamic job market.
                            </p>
                            <div className="space-y-2 md:space-y-3">
                                {["Personalized career path recommendations", "Real-time industry insights and trends", "Continuous mentorship and support"].map((item, index) => (
                                    <div key={index} className="flex items-center bg-blue-50 p-2 md:p-3 rounded-lg">
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                                        <span className="text-sm md:text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div
                            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border-l-4 border-purple-500 transform hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-300"
                            data-aos="fade-left"
                        >
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                    Our <span className="text-purple-600">Vision</span>
                                </h2>
                            </div>
                            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                                To become the leading global platform that transforms how students approach career planning,
                                making informed career decisions accessible to everyone regardless of their background.
                            </p>
                            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                                We envision a world where every student can confidently pursue careers that align with
                                their passions and contribute meaningfully to society.
                            </p>
                            <div className="bg-white/80 p-4 md:p-6 rounded-lg border-l-4 border-purple-600 backdrop-blur-sm">
                                <h3 className="text-lg md:text-xl font-semibold text-purple-900 mb-2 md:mb-3">🌟 Our Promise</h3>
                                <p className="text-purple-800 italic text-sm md:text-base">
                                    "To guide each student with integrity, provide evidence-based advice, and support them
                                    at every step of their career journey."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                            My <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto">
                            Numbers that reflect my dedication and expertise in web development
                        </p>
                        <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 md:mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {statistics.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-transform duration-300"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 md:mb-3">
                                    {stat.number}
                                </div>
                                <div className="text-gray-700 font-semibold text-sm md:text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Developer Profile Section */}
            <section id="team" className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                            Meet Our Responsive <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Developer</span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                            Passionate about creating amazing web experiences
                        </p>
                        <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 md:mt-6 rounded-full"></div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className="group bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                                            <div className="text-white w-full">
                                                <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Expertise:</h4>
                                                <div className="flex flex-wrap gap-1 md:gap-2">
                                                    {member.expertise.map((skill, idx) => (
                                                        <span key={idx} className="text-xs bg-blue-500/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-medium">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-6 text-center">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{member.name}</h3>
                                        <p className="text-blue-600 font-semibold mb-2 md:mb-3 text-sm md:text-base">{member.role}</p>
                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.description}</p>

                                        {/* Social Links */}
                                        <div className="flex justify-center gap-4 mt-4 md:mt-6 text-xl text-gray-600">
                                            <a href="#" className="hover:text-blue-500 transition-colors"><FaTwitter /></a>
                                            <a href="#" className="hover:text-blue-700 transition-colors"><FaLinkedin /></a>
                                            <a href="#" className="hover:text-gray-900 transition-colors"><FaGithub /></a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" data-aos="fade-up">
                        Ready to Transform Your Career?
                    </h2>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                        Join thousands of successful students who have discovered their true potential with our guidance
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
                        <button className="bg-yellow-400 text-blue-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Get Free Consultation
                        </button>
                        <button className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Explore Services
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;