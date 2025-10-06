import { useParams, Link } from "react-router";
import { newsList } from "./newsData";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsDetails = () => {
  const { id } = useParams();
  const newsItem = newsList.find((n) => n.id === parseInt(id));

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">News Article Not Found</h2>
          <Link
            to="/news"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  // Generate related news (excluding current news)
  const relatedNews = newsList
    .filter(news => news.id !== parseInt(id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 truncate">{newsItem.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              data-aos="fade-in"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-32"></div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500" data-aos="fade-up">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {newsItem.date}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {newsItem.author || "Career Guidance Team"}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                {newsItem.category || "Career Guidance"}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {newsItem.readTime || "5 min read"}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-aos="fade-up">
              {newsItem.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-600 pl-4 italic" data-aos="fade-up">
              {newsItem.summary}
            </p>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-8" data-aos="fade-up">
              <p className="mb-6 leading-relaxed">
                {newsItem.details || "Education is the foundation for a successful future. Career guidance plays a vital role in helping students find their passion and achieve their goals."}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why Career Guidance Matters</h2>
              <p className="mb-6 leading-relaxed">
                In today's competitive world, making informed career decisions is more important than ever. Proper guidance helps students navigate the complex landscape of educational and career opportunities, ensuring they make choices aligned with their strengths and aspirations.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg my-8 border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Key Benefits:</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-800">
                  <li>Personalized career path recommendations</li>
                  <li>Access to exclusive scholarship opportunities</li>
                  <li>Mentorship from industry professionals</li>
                  <li>Internship and job placement assistance</li>
                  <li>Continuous support throughout your educational journey</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Success Stories</h2>
              <p className="mb-6 leading-relaxed">
                Thousands of students have transformed their lives through proper career guidance. From discovering hidden talents to securing dream jobs, our platform has been instrumental in helping individuals achieve their full potential.
              </p>

              <blockquote className="border-l-4 border-green-500 pl-6 my-8 italic text-gray-600 text-lg">
                "The career assessment helped me discover my passion for data science. Today, I'm working at my dream company thanks to the guidance I received."
                <footer className="mt-2 text-base font-semibold text-gray-800">- Sarah Johnson, Data Analyst</footer>
              </blockquote>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Looking Ahead</h2>
              <p className="mb-6 leading-relaxed">
                As the job market continues to evolve, we remain committed to providing up-to-date resources and personalized advice. Our platform continuously expands its network of educational institutions and industry partners to bring you the best opportunities.
              </p>

              <p className="mb-6 leading-relaxed">
                Stay connected for more updates, success stories, and empowering content designed to help you navigate your educational and career journey with confidence.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8" data-aos="fade-up">
              {newsItem.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              )) || (
                <>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#CareerGuidance</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#Education</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">#SuccessStories</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-10" data-aos="fade-up">
              <Link
                to="/news"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to News
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </article>

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related News</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {news.date}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {news.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for the latest career guidance tips, success stories, and educational opportunities.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;