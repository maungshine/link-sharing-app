"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TestimonialSection from "./TestimonialSection";
import HeroSection from "./Hero";
import FeatureSection from "./FeatureSection";
import HowItWorksSection from "./HowItWorks";

import IconLogo from "../svg/IconLogo";
import { User } from "@prisma/client";

function LandingPage({ user }: { user: User | null }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 shadow-md z-50">
        <div className="max-w-screen-xl mx-auto sm:px-8 px-2 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold sm:w-40 w-36">
            <IconLogo className={""} />
          </Link>
          {!user ? (
            <div className="flex items-center">
              <Link
                href="/login"
                className="mx-2 text-lg hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="mx-2 sm:text-lg text-nowrap  bg-yellow-400 text-indigo-600 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-yellow-500 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                href="/links"
                className="mx-2 sm:text-lg text-nowrap  bg-yellow-400 text-indigo-600 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-yellow-500 hover:scale-105"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* How it works section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* FAQ 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold mb-2">
                How do I create a DevLink profile?
              </h4>
              <p className="text-gray-600">
                Sign up for an account and follow the steps to create your
                personalized profile.
              </p>
            </motion.div>
            {/* FAQ 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold mb-2">
                Is DevLink free to use?
              </h4>
              <p className="text-gray-600">
                Yes, DevLink offers a free plan with essential features. Premium
                plans are available for advanced features.
              </p>
            </motion.div>
            {/* FAQ 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold mb-2">
                Can I track who views my profile?
              </h4>
              <p className="text-gray-600">
                Yes, with our built-in analytics, you can track profile views
                and link clicks.
              </p>
            </motion.div>
            {/* FAQ 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <h4 className="text-lg font-semibold mb-2">
                Can I customize my profile?
              </h4>
              <p className="text-gray-600">
                Absolutely! You can choose from various themes and colors to
                match your personal brand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-primary text-white text-center">
        <p>&copy; 2024 DevLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
