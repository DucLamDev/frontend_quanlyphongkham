'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Microscope, Heart, Eye, Brain, Shield, Zap, Award, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const ModernEquipment = () => {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true })
  const [counts, setCounts] = useState({ stat0: 0, stat1: 0, stat2: 0, stat3: 0 })

  useEffect(() => {
    if (isInView) {
      const targets = [50, 99.9, 24, 100]
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      targets.forEach((target, index) => {
        let current = 0
        const increment = target / steps
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setCounts(prev => ({ ...prev, [`stat${index}`]: current }))
        }, interval)
      })
    }
  }, [isInView])

  const equipment = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: 'Máy Xét Nghiệm Tự Động',
      description: 'Hệ thống xét nghiệm tự động với độ chính xác cao',
      features: ['Kết quả nhanh chóng', 'Độ chính xác 99.9%', 'Tự động hóa hoàn toàn'],
      image: '/img/mayxetnghiemtudong.jpg'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Máy Siêu Âm 4D',
      description: 'Công nghệ siêu âm 4D tiên tiến nhất',
      features: ['Hình ảnh 3D rõ nét', 'Theo dõi thai nhi', 'Chẩn đoán chính xác'],
      image: '/img/sieuam4d.jpg'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Máy CT Scanner',
      description: 'Máy chụp cắt lớp vi tính hiện đại',
      features: ['Độ phân giải cao', 'Thời gian chụp nhanh', 'An toàn cho bệnh nhân'],
      image: '/img/ct.jpg'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Máy MRI',
      description: 'Máy cộng hưởng từ hiện đại',
      features: ['Không bức xạ', 'Hình ảnh chi tiết', 'Chẩn đoán chính xác'],
      image: '/img/MRI.jpg'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Máy X-Quang Số',
      description: 'Hệ thống X-quang kỹ thuật số',
      features: ['Giảm bức xạ', 'Kết quả tức thì', 'Lưu trữ điện tử'],
      image: '/img/xquang2.jpg'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Máy Điện Tim',
      description: 'Máy đo điện tim 12 chuyển đạo',
      features: ['Theo dõi liên tục', 'Phát hiện sớm', 'Báo động tự động'],
      image: '/img/conghuong.jpg'
    }
  ]

  const stats = [
    { number: '50+', label: 'Thiết Bị Hiện Đại' },
    { number: '99.9%', label: 'Độ Chính Xác' },
    { number: '24/7', label: 'Vận Hành' },
    { number: '100%', label: 'An Toàn' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trang Thiết Bị Hiện Đại
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Đầu tư trang thiết bị y tế hiện đại bậc nhất để mang đến dịch vụ chẩn đoán và điều trị tốt nhất cho bệnh nhân
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {index === 0 && `${Math.round(counts.stat0)}+`}
                {index === 1 && `${counts.stat1.toFixed(1)}%`}
                {index === 2 && `${Math.round(counts.stat2)}/7`}
                {index === 3 && `${Math.round(counts.stat3)}%`}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {equipment.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
            >
              {/* Equipment Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-primary-600">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Tính năng nổi bật:</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Đầu Tư Trang Thiết Bị Hiện Đại
              </h3>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Chúng tôi không ngừng đầu tư và nâng cấp trang thiết bị y tế để mang đến 
                dịch vụ chẩn đoán và điều trị tốt nhất. Tất cả thiết bị đều được nhập khẩu 
                từ các nhà sản xuất uy tín trên thế giới.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold">Chứng nhận quốc tế</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">An toàn tuyệt đối</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Hiệu suất cao</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-80">Thiết bị hiện đại</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-sm opacity-80">Độ chính xác</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-80">Vận hành</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-80">An toàn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trải Nghiệm Dịch Vụ Y Tế Hiện Đại
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Với trang thiết bị hiện đại và đội ngũ chuyên gia giàu kinh nghiệm, 
            chúng tôi cam kết mang đến dịch vụ y tế tốt nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#appointment"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Đặt Lịch Khám
            </a>
            <a
              href="/contact"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              <Award size={20} />
              Tìm Hiểu Thêm
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ModernEquipment
