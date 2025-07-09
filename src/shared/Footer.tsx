import { FacebookIcon, InstagramIcon, LinkedinIcon, X } from "lucide-react";
import React from "react";


const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold tracking-widest mb-4">
            Qtec Solution Limited
          </h1>
          <p className="text-sm text-white/70">
            Your trusted source for high-quality bicycles and gear. Ride with
            comfort, style, and confidence.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="hover:text-white transition">
              <a href="/shop">Shop</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/about">About Us</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/contact">Contact</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Email: rifatswd@gmail.com</li>
            <li>Phone: +880 123-456-789</li>
            <li>Hours: 9 AM – 6 PM (Mon–Fri)</li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-white transition">
              <FacebookIcon />
            </a>
            <a href="#" className="hover:text-white transition">
              <X />
            </a>
            <a href="#" className="hover:text-white transition">
              <InstagramIcon />
            </a>
            <a href="#" className="hover:text-white transition">
              <LinkedinIcon />
            </a>
          </div>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="px-3 py-2 w-full rounded-md text-black text-sm outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black rounded-md text-sm hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-6 text-sm text-white/50 text-center">
        © {new Date().getFullYear()} Cyclify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
