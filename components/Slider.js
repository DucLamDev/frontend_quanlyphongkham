'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const slides = [
    {
      id: 1,
      image: '/img/banner.jpg',
      title: 'Phòng Khám Đa Khoa Minh Giang',
      subtitle: 'Ứng dụng kỹ thuật cao trong khám chữa bệnh',
      description: 'Đơn vị tiên phong ứng dụng công nghệ hiện đại tại Điện Biên Phủ',
      buttonText: 'Đặt Lịch Ngay',
      buttonLink: '#appointment'
    },
    {
      id: 2,
      image: '/img/banner5.jpg',
      title: 'Công Nghệ Y Tế Hiện Đại',
      subtitle: 'Trang thiết bị tiên tiến',
      description: 'Đầu tư trang thiết bị y tế hiện đại để phục vụ tốt nhất cho bệnh nhân',
      buttonText: 'Khám Phá',
      buttonLink: '#about'
    },
    {
      id: 3,
      image: '/img/banner.jpg',
      title: 'Phòng Khám Đa Khoa Minh Giang',
      subtitle: 'Ứng dụng kỹ thuật cao trong khám chữa bệnh',
      description: 'Đơn vị tiên phong ứng dụng công nghệ hiện đại tại Điện Biên Phủ',
      buttonText: 'Đặt Lịch Ngay',
      buttonLink: '#appointment'
    },
    {
      id: 4,
      image: '/img/banner5.jpg',
      title: 'Công Nghệ Y Tế Hiện Đại',
      subtitle: 'Trang thiết bị tiên tiến',
      description: 'Đầu tư trang thiết bị y tế hiện đại để phục vụ tốt nhất cho bệnh nhân',
      buttonText: 'Khám Phá',
      buttonLink: '#about'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover brightness-110 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-black/10 to-primary-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-10 h-2 bg-white rounded-full'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-primary-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </section>
  )
}

export default Slider
