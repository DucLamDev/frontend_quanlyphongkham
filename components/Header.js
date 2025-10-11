'use client'

import { useState, useEffect } from 'react'
import { Phone, Search, Menu, X, MessageCircle, PhoneCall } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Đội ngũ', href: '#doctors' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Tuyển dụng', href: '/recruitment' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone size={16} />
                <span className="font-semibold">Hotline: 037 845 6839</span>
              </span>
              <span className="hidden md:block">
                Khu đô thị Pom La, Điện Biên Phủ, Vietnam
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:block">2,8K người theo dõi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group">
                <Image
                  src="/img/logo.jpg"
                  alt="Logo Phòng Khám Minh Giang"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight hover:text-primary-600 transition-colors duration-300">
                  Phòng Khám Đa Khoa Minh Giang
                </h1>
                <p className="text-sm text-gray-600">Tỉnh Điện Biên</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors btn-ripple"
                onClick={() => window.location.href = '#question-form'}
              >
                <MessageCircle size={18} />
                Gửi câu hỏi
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
                onClick={() => window.location.href = 'tel:0378456839'}
              >
                <PhoneCall size={18} />
                Gọi cấp cứu
              </motion.button>

              <button
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <button 
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium"
                    onClick={() => window.location.href = '#question-form'}
                  >
                    <MessageCircle size={18} />
                    Gửi câu hỏi
                  </button>
                  <button 
                    className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium"
                    onClick={() => window.location.href = 'tel:0378456839'}
                  >
                    <PhoneCall size={18} />
                    Gọi cấp cứu
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Header
