"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[rgb(38,38,38)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-semibold text-[rgb(227,208,165)]">
              視寶眼鏡
            </h3>
            <p className="text-[rgb(227,208,165)] text-sm">
              專業的眼鏡配鏡服務，為您打造最適合的視覺體驗。
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-4">
              快速連結
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
                >
                  關於視寶
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
                >
                  鏡片品牌
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
                >
                  鏡框品牌
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] transition-colors"
                >
                  聯絡眼鏡
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-4">
              聯絡資訊
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-[rgb(227,208,165)]">
                <MapPin size={18} />
                <span>台北市信義區信義路五段7號</span>
              </li>
              <li className="flex items-center space-x-2 text-[rgb(227,208,165)]">
                <Phone size={18} />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-center space-x-2 text-[rgb(227,208,165)]">
                <Mail size={18} />
                <span>contact@eyewear.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-playfair font-semibold text-[rgb(227,208,165)] mb-4">
              營業時間
            </h3>
            <ul className="space-y-2 text-[rgb(227,208,165)]">
              <li>週一至週五: 10:00 - 21:00</li>
              <li>週六: 10:00 - 20:00</li>
              <li>週日: 11:00 - 19:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[rgb(227,208,165)] text-sm">
              © {new Date().getFullYear()} 視寶眼鏡. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] text-sm transition-colors"
              >
                隱私權政策
              </Link>
              <Link
                href="/terms"
                className="text-[rgb(227,208,165)] hover:text-[rgb(136,99,64)] text-sm transition-colors"
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
