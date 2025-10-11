'use client'

import { motion } from 'framer-motion'
import { Calendar, MessageSquare, Heart, Award, Users, Clock } from 'lucide-react'

const Hero = () => {
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Đặt Lịch Online',
      description: 'Đặt lịch khám nhanh chóng, tiện lợi'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Tư Vấn 24/7',
      description: 'Chatbot AI hỗ trợ tư vấn mọi lúc'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Đội Ngũ Chuyên Nghiệp',
      description: 'Bác sĩ giàu kinh nghiệm'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Chăm Sóc Tận Tâm',
      description: 'Phục vụ tận tình, chu đáo'
    }
  ]

  const stats = [
    { number: '10+', label: 'Năm Kinh Nghiệm' },
    { number: '50K+', label: 'Bệnh Nhân' },
    { number: '20+', label: 'Bác Sĩ' },
    { number: '50+', label: 'Dịch Vụ' }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 pt-10 pb-20">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Ứng Dụng Kỹ Thuật Cao
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Phòng Khám Đa Khoa{' '}
                <span className="gradient-text">Minh Giang</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600"
              >
                Đơn vị tiên phong ứng dụng kỹ thuật cao trong khám chữa bệnh tại Điện Biên Phủ. 
                Cam kết mang đến dịch vụ y tế chất lượng cao với đội ngũ bác sĩ chuyên nghiệp.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#appointment"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all hover:shadow-xl btn-ripple inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Đặt Lịch Ngay
              </a>
              <a
                href="#services"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all hover:shadow-xl inline-flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Tìm Hiểu Thêm
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{stat.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-20 h-20 bg-primary-200 rounded-full opacity-50 hidden xl:block"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-16 h-16 bg-secondary-200 rounded-full opacity-50 hidden xl:block"
        />
      </div>
    </section>
  )
}

export default Hero
