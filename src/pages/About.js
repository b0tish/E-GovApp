import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Abik Maharjan",
    role: "Fuchey",
    image: "https://picsum.photos/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Dipesh Shrestha",
    role: "Arko Fuchey",
    image: "https://picsum.photos/151",
    social: { facebook: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Loozala Bajracharya",
    role: "Fuchi",
    image: "https://picsum.photos/152",
    social: { facebook: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Saugat Maharjan",
    role: "Fuchey no. 3",
    image:"https://picsum.photos/153",
    social: { facebook: "#", linkedin: "#", instagram: "#" },
  },
  {
    name: "Urjala Pariyar",
    role: "Arko Fuchi",
    image: "https://picsum.photos/154",
    social: { facebook: "#", linkedin: "#", instagram: "#" },
  },
];

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16 lg:px-24">
      {/* About Us Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg mb-8">
          The <span className="font-semibold">Arthik Upanyaas</span> is an advanced digital solution designed to modernize and streamline Nepal's financial management. This platform enables efficient budget allocation, promotes transparency, and supports Nepal's vision for effective e-Governance.
        </p>
      </div>

      {/* Mission and Features Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to enhance the financial management system in Nepal by implementing a transparent, data-driven, and accountable budget allocation system. This initiative aligns with the  Digital Nepal Framework and aims to create a more efficient and corruption-free governance model.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
          <ul className="text-gray-600 list-disc pl-5 space-y-2">
            <li>Real-time Budget Tracking with Data Analytics</li>
            <li>Automated Allocation Based on Priority Sectors</li>
            <li>Role-Based Access for Government Officials</li>
            <li>Comprehensive Compliance and Reporting Tools</li>
            <li>Integration with Nepal's Financial Information System</li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
        <p className="text-gray-700 text-lg">
          Nepal is undergoing rapid digital transformation, and <strong>efficient e-Governance</strong> is crucial for sustainable development. Our system ensures <strong>fiscal discipline, transparency, and improved resource utilization</strong>, empowering government agencies to make better financial decisions.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Team</h3>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 w-48 mx-auto flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 border border-gray-200 rounded-full mb-3"
              />
              <h4 className="text-base font-semibold text-gray-800 text-center">
                {member.name}
              </h4>
              <p className="text-gray-600 text-sm text-center">{member.role}</p>
              <div className="flex justify-center gap-4 mt-3">
                <a href={member.social.facebook} className="text-blue-600 hover:text-blue-800">
                  <FaFacebook size={18} />
                </a>
                <a href={member.social.linkedin} className="text-blue-700 hover:text-blue-900">
                  <FaLinkedin size={18} />
                </a>
                <a href={member.social.instagram} className="text-pink-500 hover:text-pink-700">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
