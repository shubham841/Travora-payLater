import { Mail, Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white px-4 sm:px-6 md:px-12 py-10 mt-24">
      <div className="w-full mx-auto space-y-10">
        {/* Top section: Logo + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-gray-500 pb-8">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>LOGO</span>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md">
            <form className="flex flex-col sm:flex-row w-full">
              <input
                type="email"
                placeholder="Enter your email to get the latest news..."
                className="w-full px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-tr-none text-black focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle section: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-500 pb-8">
          {/* Column One */}
          <div>
            <h3 className="font-semibold mb-2">Column One</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Twenty One</li>
              <li>Thirty Two</li>
              <li>Fourty Three</li>
              <li>Fifty Four</li>
            </ul>
          </div>

          {/* Column Two */}
          <div>
            <h3 className="font-semibold mb-2">Column Two</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Sixty Five</li>
              <li>Seventy Six</li>
              <li>Eighty Seven</li>
              <li>Ninety Eight</li>
            </ul>
          </div>

          {/* Column Three */}
          <div>
            <h3 className="font-semibold mb-2">Column Three</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>One Two</li>
              <li>Three Four</li>
              <li>Five Six</li>
              <li>Seven Eight</li>
            </ul>
          </div>

          {/* Column Four */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Column Four</h3>
              <div className="flex flex-wrap gap-2 -ml-2">
                <Image
                  src="/appStore.png"
                  alt="App Store"
                  width={120}
                  height={40}
                />
                <Image
                  src="/playStore.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Join Us</h3>
              <div className="flex gap-3 flex-wrap text-white">
                <Youtube className="w-5 h-5" />
                <Facebook className="w-5 h-5" />
                <Twitter className="w-5 h-5" />
                <Instagram className="w-5 h-5" />
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-300 gap-4">
          <p className="text-center md:text-left">CompanyName © 202X. All rights reserved.</p>
          <div className="flex gap-4 text-center md:text-right">
            <span>Eleven</span>
            <span>Twelve</span>
            <span>Thirteen</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
