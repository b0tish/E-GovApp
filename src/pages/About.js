import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Abik Maharjan",
    role: "Fuchey",
    image: "https://via.placeholder.com/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dipesh Shrestha",
    role: "Arko Fuchey",
    image: "https://via.placeholder.com/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Loozala Bajracharya",
    role: "Fuchi",
    image: "https://via.placeholder.com/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Saugat Maharjan",
    role: "Fuchey no. 3",
    image: "https://via.placeholder.com/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Urjala Pariyar",
    role: "Arko Fuchi",
    image: "https://via.placeholder.com/150",
    social: { facebook: "#", linkedin: "#", instagram: "#" }
  }
];

const About = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 text-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-48 mx-auto flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h4 className="text-sm font-semibold text-gray-800 text-center">
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
  );
};

export default About;
