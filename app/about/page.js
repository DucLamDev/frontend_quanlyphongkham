'use client'

import { motion } from 'framer-motion'
import { Award, Users, Clock, Shield, Heart, Target, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  const stats = [
    { number: '10+', label: 'Năm Kinh Nghiệm', icon: <Clock className="w-8 h-8" /> },
    { number: '50K+', label: 'Bệnh Nhân', icon: <Users className="w-8 h-8" /> },
    { number: '20+', label: 'Bác Sĩ', icon: <Award className="w-8 h-8" /> },
    { number: '50+', label: 'Dịch Vụ', icon: <Heart className="w-8 h-8" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Chăm Sóc Tận Tâm',
      description: 'Đặt sức khỏe và sự hài lòng của bệnh nhân lên hàng đầu trong mọi hoạt động'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Chất Lượng Cao',
      description: 'Cam kết cung cấp dịch vụ y tế chất lượng cao với trang thiết bị hiện đại'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Đội Ngũ Chuyên Nghiệp',
      description: 'Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo chuyên sâu'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'An Toàn & Tin Cậy',
      description: 'Tuân thủ nghiêm ngặt các quy định y tế và đảm bảo an toàn cho bệnh nhân'
    }
  ]

  const achievements = [
    {
      year: '2015',
      title: 'Thành Lập Phòng Khám',
      description: 'Phòng Khám Minh Giang được thành lập với mục tiêu mang đến dịch vụ y tế chất lượng cao'
    },
    {
      year: '2018',
      title: 'Đầu Tư Trang Thiết Bị',
      description: 'Đầu tư hệ thống trang thiết bị y tế hiện đại, tiên tiến nhất khu vực'
    },
    {
      year: '2020',
      title: 'Mở Rộng Dịch Vụ',
      description: 'Mở rộng thêm nhiều chuyên khoa và dịch vụ y tế chuyên sâu'
    },
    {
      year: '2023',
      title: 'Ứng Dụng Công Nghệ',
      description: 'Triển khai hệ thống quản lý bệnh viện hiện đại và dịch vụ khám online'
    }
  ]

  const team = [
  {
      name: 'BS. Nguyễn Trung Chính',
      title: 'PGS. TS.BS',
      specialty: 'Giám đốc chuyên môn Bệnh viện Đa Khoa Phương Đông',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/thumbs/350x0/bs-nguyen-trung-chinh_4.png',
      experience: '30+ năm',
    },
    {
      name: 'BS. Hàn Văn Ba',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nội',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/thumbs/350x0/bs-han-van-ba_2.png',
      experience: '15+ năm',
    },
    {
      name: 'BS. Trần Đình Hà',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nội',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/tran-dinh-ha/tran-dinh-ha.png',
      experience: '12+ năm',
    },
    {
      name: 'BS. Đồng Khắc Hùng',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nhi',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/bs-dong-khac-hung.png',
      experience: '10+ năm',
    },
  ]

  

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Về <span className="text-primary-600">Phòng Khám Minh Giang</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Đơn vị tiên phong ứng dụng kỹ thuật cao trong khám chữa bệnh tại Điện Biên Phủ. 
              Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao với đội ngũ bác sĩ chuyên nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sứ Mệnh & Tầm Nhìn
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-primary-600" />
                    <h3 className="text-xl font-bold text-gray-900">Sứ Mệnh</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Mang đến dịch vụ y tế chất lượng cao, an toàn và hiệu quả cho cộng đồng. 
                    Ứng dụng công nghệ hiện đại để nâng cao chất lượng khám chữa bệnh.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-secondary-600" />
                    <h3 className="text-xl font-bold text-gray-900">Tầm Nhìn</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Trở thành phòng khám đa khoa hàng đầu tại Điện Biên, được tin tưởng 
                    bởi chất lượng dịch vụ và sự chuyên nghiệp trong chăm sóc sức khỏe.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="./img/dichvu4.jpg"
                  alt="Phòng Khám Minh Giang"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng cho mọi hoạt động và quyết định của chúng tôi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="text-primary-600 mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong quá trình phát triển của phòng khám
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 rounded-full"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <div className="text-primary-600 font-bold text-lg mb-2">{achievement.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 relative">
                    {index + 1}
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đội Ngũ Lãnh Đạo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những bác sĩ giàu kinh nghiệm và tâm huyết với nghề
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
              >
                  <div className="absolute inset-0 flex items-end justify-center">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  width={200}
                                  height={220}
                                  className="object-contain object-bottom h-full w-auto"
                                  unoptimized
                                />
                              </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{member.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                  <p className="text-sm text-gray-500">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Đặt Lịch Khám Ngay Hôm Nay
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trải nghiệm dịch vụ y tế chất lượng cao với đội ngũ bác sĩ chuyên nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#appointment"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Đặt Lịch Ngay
              </a>
              <a
                href="tel:0378456839"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-400 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Users size={20} />
                Gọi: 037 845 6839
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
