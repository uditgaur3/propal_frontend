'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/">
                <img
                  src="/logo.webp"
                  alt="Company Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              Your trusted platform for comprehensive proposal management solutions. 
              Streamline your business processes with our innovative tools and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin-login-demo" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Admin Demo
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* flattened grid */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Email</h4>
              <p className="text-gray-300 text-sm">support@yourcompany.com</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Phone</h4>
              <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Address</h4>
              <p className="text-gray-300 text-sm">
                123 Business Ave, Suite 100<br />
                Business City, BC 12345
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
