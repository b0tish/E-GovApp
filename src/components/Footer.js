import { FaYoutube, FaXTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-30 text-center">
      <div className="container mx-auto px-5 pt-5">
        <h2 className="text-2xl font-bold">Nepal Budget Allocation System</h2>
        <p className="mt-2 text-gray-300">
          Ensuring transparency in government spending for a prosperous Nepal.
        </p>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white"><FaYoutube size={24} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaXTwitter size={24} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaFacebook size={24} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaGithub size={24} /></a>
          <a href="#" className="text-gray-300 hover:text-white"><FaLinkedin size={24} /></a>
        </div>

        {/* Footer Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
          <div>
            <h3 className="font-semibold pb-2">ABOUT</h3>
            <a href="#" className="hover:text-white block text-sm">Mission</a>
          </div>
          <div>
            <h3 className="font-semibold pb-2" >HELP</h3>
            <a href="#" className="hover:text-white block text-sm">FAQs</a>
            <a href="#" className="hover:text-white block text-sm">Community</a>
            <a href="#" className="hover:text-white block text-sm">Contact Us</a>
          </div>
          <div>
            <h3 className="font-semibold pb-2">RELATED SITES</h3>
            <a href="#" className="hover:text-white block text-sm">National Planning Commission</a>
            <a href="#" className="hover:text-white block text-sm">Ministry of Finance</a>
          </div>
        </div>

        {/* Policies */}
        <div className="mt-8 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">Accessibility</a> |
          <a href="#" className="hover:text-white">Privacy Policy</a> |
          <a href="#" className="hover:text-white">Right to Information</a> |
          <a href="#" className="hover:text-white">D&B Information</a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-gray-400">&copy; 2025 Nepal Budget Allocation System</p>
      </div>
    </footer>
  );
}
