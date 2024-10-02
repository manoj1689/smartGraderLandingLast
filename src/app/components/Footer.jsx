"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaWindowClose,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const companyEmail = "info@smartgrader.in";
  const companyAddress =
    "Flat No: 3302, Tower 5, Hero Homes, sector 104, Dwarka Expressway, Gurugram.122001";
  const companyPhoneNumber = "+91-8920964502";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const sectionVariants = (direction) => ({
    hidden: {
      opacity: 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  });

  return (
    <footer className="bg-gray-900 py-6 text-white">
      <motion.div
        className="container mx-auto px-4 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row">
          <motion.div
            className="w-full lg:w-1/2 flex flex-col md:flex-row "
            variants={sectionVariants("left")}
          >
            <div className="flex flex-col p-2 w-full">
              <div className="flex flex-row md:flex-col gap-5">
                <div className="flex w-1/2 md:w-full flex-col">
                  <span className="text-lg font-semibold text-gray-300">
                    USEFUL LINKS
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="self-start text-gray-400">
                      Help & Support
                    </span>
                    <span className="self-start text-gray-400">Blog</span>
                    <span className="self-start text-gray-400">About Us</span>
                  </div>
                </div>
                <div className="flex w-1/2 md:w-full flex-col mb-8">
                  <span className="text-lg font-semibold text-gray-300">
                    EMAIL US
                  </span>
                  <span>
                    <a
                      href={`mailto:${companyEmail}`}
                      className="text-gray-400 hover:text-gray-200 transition duration-300"
                    >
                      {companyEmail}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col p-2">
              <div className="flex flex-row md:flex-col">
                <div className="flex w-1/2 sm:full flex-col mb-8">
                  <span className="text-lg font-semibold text-gray-300">
                    LET&apos;S TALK
                  </span>
                  <p className="text-gray-400">{companyPhoneNumber}</p>
                </div>
                <div className="flex w-1/2 md:full flex-col mb-8">
                  <span className="text-lg font-semibold text-gray-300 mb-2">
                    WRITE TO US
                  </span>
                  <span>
                    <p className="text-gray-400">{companyAddress}</p>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2  flex flex-col "
            variants={sectionVariants("right")}
          >
            <div className="p-2 ">
              <span className="text-lg font-semibold text-gray-300">
                GOOGLE MAP
              </span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8566018495253!2d76.99280807631855!3d28.48386487574639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1766255a6705%3A0xb2df0b0641c2d6d4!2sHero%20Homes%20104%20Gurugram!5e0!3m2!1sen!2sin!4v1722251107436!5m2!1sen!2sin"
                width="100%"
                height={200}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-sm pt-2"
              ></iframe>
            </div>
            <div className="mb-4 md:mb-0 w-full flex flex-col p-2">
              <div className="h-full flex flex-row items-start pt-4">
                <div className="flex w-full">
                  <div className="flex flex-row w-1/2 justify-around gap-3">
                    <div>
                      <a href="https://www.facebook.com/pages/creation/?ref_type=comet_home">
                        <FaFacebookF className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                    <div>
                      <a href="https://www.youtube.com/channel/UCftfkcIZ12QjtOarvNepG8g">
                        <FaYoutube className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                    <div>
                      <a href={`mailto:${companyEmail}`}>
                        <SiGmail className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-row w-1/2 justify-around">
                    <div>
                      <a href="https://www.instagram.com/smart_grader/">
                        <FaInstagram className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                    <div>
                      <a href="https://www.linkedin.com/in/smart-grader-a36536311/">
                        <FaLinkedinIn className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                    <div>
                      <a href="https://x.com/smart_grader">
                        <FaWindowClose className="cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-200 transition duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col justify-between mb-2"
          variants={sectionVariants("bottom")}
        >
          <div className="w-full pt-2">
            <div className="border-t border-gray-600 flex justify-center pt-2">
              <p className="text-sm font-light text-gray-400 leading-5">
                © 2024 Smart Graders. All Rights Reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
