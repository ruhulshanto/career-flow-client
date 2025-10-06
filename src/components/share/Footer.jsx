import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { CiCircleChevRight } from "react-icons/ci";
import { Link } from "react-router";
import { HashLink } from "react-router-hash-link";

// Sample Events
const eventsData = [
  { id: 1, day: "27", month: "Dec", title: "Learning Management", time: "10am - 5pm", place: "Gpur Academy" },
  { id: 2, day: "19", month: "Dec", title: "Learn Courses Online", time: "10am - 5pm", place: "Gpur Academy" },
  { id: 3, day: "07", month: "Dec", title: "Courses for Free GED", time: "10am - 5pm", place: "Gpur Academy" },
  { id: 4, day: "15", month: "Jan", title: "Career Development Workshop", time: "9am - 1pm", place: "Career Hub" },
  { id: 5, day: "21", month: "Jan", title: "Resume Building Session", time: "2pm - 6pm", place: "Online" },
  { id: 6, day: "05", month: "Feb", title: "Mock Interview Practice", time: "11am - 4pm", place: "Career Flow HQ" },
];

export default function Footer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % eventsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleEvents = eventsData.slice(currentIndex, currentIndex + 3);

  return (
    <footer className="relative pt-16 pb-10 text-gray-800 bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-100 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">About Career Flow</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            <span className="text-blue-600 font-extrabold text-5xl float-left mr-2">C</span>
            areer Flow Guideline helps students align their goals through guided learning, mentoring, and access to opportunities.
          </p>
          <ul className="space-y-2 mt-4">
            <li>
              <Link to="/about" className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                <CiCircleChevRight className="text-blue-500" /> About Us
              </Link>
            </li>
            <li>
              <HashLink smooth to="/about#team" className="flex items-center gap-2 hover:text-blue-600 transition">
                <CiCircleChevRight className="text-blue-500" /> Meet the Team
              </HashLink>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-500 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-400 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-700 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-blue-100 text-pink-600 p-3 rounded-full hover:bg-pink-500 hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-4 bg-white shadow-sm p-3 rounded-lg">
              <MdEmail className="text-blue-500 text-xl" />
              help@careerflow.com
            </li>
            <li className="flex items-center gap-4 bg-white shadow-sm p-3 rounded-lg">
              <MdPhone className="text-blue-500 text-xl" />
              +880 8282 8282
            </li>
            <li className="flex items-center gap-4 bg-white shadow-sm p-3 rounded-lg">
              <MdLocationOn className="text-blue-500 text-xl" />
              Edine Road, 1234 Plot/RS, CA
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              "Courses",
              "News / Blog",
              "Events",
              "Privacy Policy",
              "Support",
              "Teachers",
              "FAQ",
              "Testimonials",
            ].map((link, idx) => (
              <a
                key={idx}
                href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-blue-600 transition"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Latest Events */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Latest Events</h3>
          <div className="space-y-4">
            {visibleEvents.map((event) => (
              <div key={event.id} className="flex gap-4 items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="bg-blue-500 text-white text-center px-3 py-2 rounded-md">
                  <p className="text-lg font-bold">{event.day}</p>
                  <p className="text-xs uppercase">{event.month}</p>
                </div>
                <div className="text-sm">
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-gray-500">{event.time} | {event.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Career Flow Guideline. Designed by{" "}
        <span className="text-blue-500 font-medium">Sh@nto</span>
      </div>
    </footer>
  );
}
