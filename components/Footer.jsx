import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] text-gray-700 p-10  ">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 p-4">
        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Services</h6>
          <a className="block hover:underline">Branding</a>
          <a className="block hover:underline">Design</a>
          <a className="block hover:underline">Marketing</a>
          <a className="block hover:underline">Advertisement</a>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Company</h6>
          <a className="block hover:underline">About us</a>
          <a className="block hover:underline">Contact</a>
          <a className="block hover:underline">Jobs</a>
          <a className="block hover:underline">Press kit</a>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Legal</h6>
          <a className="block hover:underline">Terms of use</a>
          <a className="block hover:underline">Privacy policy</a>
          <a className="block hover:underline">Cookie policy</a>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Social</h6>
          <a className="block hover:underline">Twitter</a>
          <a className="block hover:underline">Instagram</a>
          <a className="block hover:underline">Facebook</a>
          <a className="block hover:underline">GitHub</a>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Explore</h6>
          <a className="block hover:underline">Features</a>
          <a className="block hover:underline">Enterprise</a>
          <a className="block hover:underline">Security</a>
          <a className="block hover:underline">Pricing</a>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Apps</h6>
          <a className="block hover:underline">Mac</a>
          <a className="block hover:underline ">Windows</a>
          <a className="block hover:underline">iPhone</a>
          <a className="block hover:underline ">Android</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
