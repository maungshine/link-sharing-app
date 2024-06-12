"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["DevLink", "Ease", "One Click"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block">Simplify your online presence with</span>
          <span className="block h-20">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                initial={{ x: "0%", opacity: 0 }}
                animate={{ x: 20, opacity: 1 }}
                exit={{ x: "-20%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"
              >
                {texts[currentText]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl mb-8"
        >
          Share all your important links and social profiles with just one link.
        </motion.p>
        <Link href="/register">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white inline-block text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out"
          >
            Get Started
          </motion.span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
