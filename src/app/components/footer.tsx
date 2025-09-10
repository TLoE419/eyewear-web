"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="bg-[rgb(38,38,38)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <h3 className="text-base md:text-lg lg:text-xl font-playfair font-semibold text-[rgb(227,208,165)]">
              視寶眼鏡
            </h3>
            <p className="text-[rgb(227,208,165)] text-xs md:text-sm leading-relaxed">
              專業的眼鏡配鏡服務，為您打造最適合的視覺體驗。
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="https://www.facebook.com/sibao.optician/?locale=zh_TW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
              >
                <Facebook size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.instagram.com/sibao_eyewear/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
              >
                <Instagram size={16} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-2 md:mb-3 lg:mb-4">
              快速連結
            </h3>
            <ul className="flex flex-wrap gap-2 md:flex-col md:space-y-1.5 lg:space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors text-xs md:text-sm lg:text-base"
                >
                  關於視寶
                </Link>
              </li>
              <li>
                <Link
                  href="/lenses"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors text-xs md:text-sm lg:text-base"
                >
                  鏡片品牌
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors text-xs md:text-sm lg:text-base"
                >
                  鏡框品牌
                </Link>
              </li>
              <li>
                <a
                  href="#photo-grid"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors text-xs md:text-sm lg:text-base"
                >
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-2 md:mb-3 lg:mb-4">
              聯絡資訊
            </h3>
            <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
              <li className="flex items-start space-x-2 text-[rgb(227,208,165)]">
                <MapPin
                  size={14}
                  className="flex-shrink-0 mt-0.5 md:mt-0 md:w-[18px] md:h-[18px]"
                />
                <span className="text-xs md:text-sm">
                  台南市新營區三民路 121 之 6 號
                </span>
              </li>
              <li className="flex items-center space-x-2 text-[rgb(227,208,165)]">
                <Phone size={14} className="md:w-[18px] md:h-[18px]" />
                <span className="text-xs md:text-sm">06-633-1141</span>
              </li>
              <li className="flex items-start space-x-2 text-[rgb(227,208,165)]">
                <Mail
                  size={14}
                  className="flex-shrink-0 mt-0.5 md:mt-0 md:w-[18px] md:h-[18px]"
                />
                <span className="text-xs md:text-sm break-all">
                  si.bao066982496@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-2 md:mb-3 lg:mb-4">
              營業時間
            </h3>
            <ul className="space-y-1 md:space-y-1.5 lg:space-y-2 text-[rgb(227,208,165)]">
              <li className="text-xs md:text-sm">週一至週日: 10:00 - 21:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 lg:mt-12 pt-4 md:pt-6 lg:pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-[rgb(227,208,165)] text-xs md:text-sm text-center md:text-left">
              © {currentYear} 視寶眼鏡. All rights reserved.
            </p>
            <div className="flex space-x-3 md:space-x-4 lg:space-x-6">
              <Link
                href="/privacy"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] text-xs md:text-sm transition-colors"
              >
                隱私權政策
              </Link>
              <Link
                href="/terms"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] text-xs md:text-sm transition-colors"
              >
                使用條款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
