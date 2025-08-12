import React from "react";
import { FaFacebookF, FaInstagram, FaLine } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaFacebookF size={40} />,
    url: "https://www.facebook.com/sibao.optician/?locale=zh_TW",
    label: "Facebook",
  },
  {
    icon: <FaInstagram size={40} />,
    url: "https://www.instagram.com/sibao_eyewear/",
    label: "Instagram",
  },
  {
    icon: <FaLine size={40} />,
    url: "https://line.me",
    label: "Line",
  },
];

const FloatingSocialButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
    {socialLinks.map((item) => (
      <a
        key={item.label}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] hover:bg-[rgb(38,38,38)] hover:text-[rgb(227,208,165)] shadow-lg rounded-full p-1.5 transition-colors duration-200 flex items-center justify-center border-4 border-[rgb(38,38,38)]"
      >
        {item.icon}
      </a>
    ))}
  </div>
);

export default FloatingSocialButtons;
