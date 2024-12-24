import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-8 pb-4">

<div className="flex justify-center items-center w-full py-6">
  <div className="bg-black text-white flex justify-between items-center w-3/4 px-8 py-6 rounded-md">
    {/* Left Section: Heading */}
    <h2 className="text-2xl font-bold text-left leading-tight">
      STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
    </h2>

    {/* Right Section: Input and Button */}
    <div className="flex flex-col items-center space-y-3 w-1/2">
      <input
        type="email"
        placeholder="Enter your email address"
        className="py-2 px-4 w-full text-gray-800 rounded focus:outline-none"
      />
      <button
        className="bg-gray-300 text-black py-2 px-6 w-full rounded-md hover:bg-gray-400"
      >
        Subscribe to Newsletter
      </button>
    </div>
  </div>
</div>


      {/* Footer Links */}
      <div
        className="mx-auto px-4 py-8 bg-gray-100 text-gray-700"
        style={{ width: "1240px", height: "177px" }}
      >
        <div className="flex justify-between gap-0">
          {/* Logo and About */}
          <div className="w-1/5">
            <h3 className="text-xl font-bold mb-2">SHOP.CO</h3>
            <p className="text-xs leading-relaxed">
              We have clothes that suit your style and <br /> which you're proud to
              wear. From <br /> women to men.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-black">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-1/5">
            <h4 className="text-sm font-semibold mb-2">COMPANY</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-black">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Features</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Career</a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="w-1/5">
            <h4 className="text-sm font-semibold mb-2">HELP</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-black">Customer Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Delivery Details</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="w-1/5">
            <h4 className="text-sm font-semibold mb-2">FAQ</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-black">Account</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Manage Deliveries</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Orders</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Payments</a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="w-1/5">
            <h4 className="text-sm font-semibold mb-2">RESOURCES</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-black">Free eBooks</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Development Tutorial</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">How to - Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">YouTube Playlist</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>&copy; SHOP.CO 2000-2023. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
