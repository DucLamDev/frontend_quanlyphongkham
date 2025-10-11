'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle, Star, Award, Users, Phone } from 'lucide-react'
import Image from 'next/image'

const InsurancePartners = () => {
  const partners = [
    {
      name: 'Blue Cross Vietnam',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/blue-cross.jpg',
      description: 'Bảo hiểm y tế quốc tế'
    },
    {
      name: 'Dai-ichi Life',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/dai-ichi-life.png',
      description: 'Gắn bó dài lâu'
    },
    {
      name: 'Allianz',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/allianz.jpg',
      description: 'Bảo hiểm toàn cầu'
    },
    {
      name: 'AXA',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/axa.png',
      description: 'Bảo hiểm uy tín'
    },
    {
      name: 'Pacific Cross',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/pacific-cross.jpg',
      description: 'Bảo hiểm khu vực'
    },
    {
      name: 'AIG',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/aig.png',
      description: 'Bảo hiểm quốc tế'
    },
    {
      name: 'FWD',
      logo: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/fwd.png',
      description: 'Bảo hiểm hiện đại'
    }
  ]

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Thanh Toán Trực Tiếp',
      description: 'Không cần thanh toán trước, bảo hiểm chi trả trực tiếp'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Quy Trình Đơn Giản',
      description: 'Thủ tục nhanh chóng, chỉ cần thẻ bảo hiểm và CMND'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Dịch Vụ Chất Lượng',
      description: 'Được hưởng dịch vụ y tế chất lượng cao với chi phí tối ưu'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Mạng Lưới Rộng',
      description: 'Liên kết với nhiều công ty bảo hiểm uy tín trên toàn quốc'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đối Tác Bảo Hiểm
          </h2>
          <div className="w-20 h-1 bg-primary-600 rounded-full"></div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group cursor-pointer border border-gray-200"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-16">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === 0 ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Lợi Ích Khi Sử Dụng Bảo Hiểm
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tận hưởng những ưu đãi và tiện ích khi khám chữa bệnh với bảo hiểm y tế
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary-600">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InsurancePartners
