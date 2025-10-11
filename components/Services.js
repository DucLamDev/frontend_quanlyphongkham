'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const containerRef = useRef(null)

  const services = [
    {
      id: 1,
      image: '/img/dichvu1.jpg',
      title: 'Khám Sức Khỏe Tổng Quát',
      description: 'Khám và kiểm tra sức khỏe toàn diện với trang thiết bị hiện đại',
      features: ['Khám tổng quát', 'Xét nghiệm cơ bản', 'Tư vấn sức khỏe']
    },
    {
      id: 2,
      image: '/img/dichvu2.jpg',
      title: 'Sản - Phụ Khoa',
      description: 'Chăm sóc sức khỏe phụ nữ và thai sản với đội ngũ bác sĩ giàu kinh nghiệm',
      features: ['Khám thai định kỳ', 'Siêu âm thai', 'Tư vấn dinh dưỡng']
    },
    {
      id: 3,
      image: '/img/dichvu3.jpg',
      title: 'Tim Mạch',
      description: 'Khám và điều trị các bệnh về tim mạch, huyết áp với trang thiết bị hiện đại',
      features: ['Điện tâm đồ', 'Siêu âm tim', 'Theo dõi huyết áp']
    },
    {
      id: 4,
      image: '/img/dichvu4.jpg',
      title: 'Chẩn Đoán Hình Ảnh',
      description: 'Siêu âm, X-quang, CT với thiết bị hiện đại và đội ngũ chuyên nghiệp',
      features: ['Siêu âm 4D', 'X-quang kỹ thuật số', 'CT Scanner']
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cung cấp đa dạng các dịch vụ y tế chất lượng cao với trang thiết bị hiện đại
          </p>
        </motion.div>

        {/* Services Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                  {/* Image Section */}
                  <div className="relative h-[300px] lg:h-auto overflow-hidden group">
                    <Image
                      src={services[currentIndex].image}
                      alt={services[currentIndex].title}
                      fill
                      className="object-cover brightness-110 contrast-105 group-hover:scale-110 transition-transform duration-700"
                      priority={currentIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 via-primary-500/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                  </div>

                  {/* Content Section */}
                  <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          {services[currentIndex].title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {services[currentIndex].description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Dịch vụ bao gồm:</h4>
                        <ul className="space-y-2">
                          {services[currentIndex].features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-600">
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <motion.a
                          href="#appointment"
                          className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all hover:shadow-2xl btn-ripple btn-shine inline-flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Đặt Lịch Ngay
                        </motion.a>
                        <motion.a
                          href="#contact"
                          className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all hover:shadow-2xl inline-flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05, borderColor: "#096dd9" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Tư Vấn Chi Tiết
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-primary-600 transition-all hover:bg-primary-50"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-primary-600 transition-all hover:bg-primary-50"
            >
              <ChevronRight size={24} />
            </button>

            {/* Auto Play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-primary-600 transition-all hover:bg-primary-50 ml-4"
            >
              {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
              Cần Tư Vấn Về Dịch Vụ?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ phù hợp
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#appointment"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
            >
              Đặt Lịch Ngay
            </a>
            <a
              href="tel:0378456839"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-400 transition-colors shadow-lg inline-block"
            >
              Gọi Ngay: 037 845 6839
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
