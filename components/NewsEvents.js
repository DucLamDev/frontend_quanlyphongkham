'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowRight, Newspaper, CalendarDays } from 'lucide-react'
import Image from 'next/image'

const NewsEvents = () => {
  const news = [
    {
      id: 1,
      title: 'Phòng Khám Minh Giang Triển Khai Dịch Vụ Khám Online',
      excerpt: 'Ứng dụng công nghệ hiện đại để phục vụ bệnh nhân từ xa một cách hiệu quả và an toàn.',
      image: '/img/dichvu1.jpg',
      date: '15/01/2025',
      category: 'Tin tức',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Chương Trình Khám Sức Khỏe Miễn Phí Cho Người Cao Tuổi',
      excerpt: 'Tổ chức khám sức khỏe định kỳ miễn phí cho người cao tuổi trong cộng đồng.',
      image: '/img/dichvu2.jpg',
      date: '12/01/2025',
      category: 'Sự kiện',
      readTime: '3 phút đọc'
    },
    {
      id: 3,
      title: 'Đầu Tư Trang Thiết Bị Y Tế Hiện Đại',
      excerpt: 'Nâng cấp hệ thống trang thiết bị y tế để phục vụ tốt hơn cho bệnh nhân.',
      image: '/img/dichvu3.jpg',
      date: '10/01/2025',
      category: 'Tin tức',
      readTime: '4 phút đọc'
    }
  ]

  const events = [
    {
      id: 1,
      title: 'Hội Thảo Sức Khỏe Tim Mạch',
      description: 'Chia sẻ kiến thức về phòng ngừa và điều trị bệnh tim mạch',
      date: '25/01/2025',
      time: '14:00 - 16:00',
      location: 'Phòng hội thảo Phòng Khám Minh Giang',
      attendees: 50,
      type: 'Hội thảo'
    },
    {
      id: 2,
      title: 'Khám Sức Khỏe Miễn Phí',
      description: 'Chương trình khám sức khỏe miễn phí cho cộng đồng',
      date: '30/01/2025',
      time: '08:00 - 17:00',
      location: 'Phòng Khám Minh Giang',
      attendees: 100,
      type: 'Sự kiện cộng đồng'
    },
    {
      id: 3,
      title: 'Tư Vấn Dinh Dưỡng Cho Phụ Nữ Mang Thai',
      description: 'Hướng dẫn chế độ dinh dưỡng khoa học cho phụ nữ mang thai',
      date: '05/02/2025',
      time: '09:00 - 11:00',
      location: 'Phòng tư vấn Phòng Khám Minh Giang',
      attendees: 30,
      type: 'Tư vấn'
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tin Tức & Sự Kiện
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về hoạt động và sự kiện của phòng khám
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* News Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Tin Tức Mới Nhất</h3>
            </div>

            <div className="space-y-6">
              {news.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.category === 'Tin tức' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                          Đọc thêm
                        </span>
                        <ArrowRight size={16} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center pt-6"
            >
              <a
                href="#"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all hover:shadow-xl inline-flex items-center gap-2"
              >
                Xem Tất Cả Tin Tức
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Events Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Sự Kiện Sắp Tới</h3>
            </div>

            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 hover:shadow-xl transition-all group cursor-pointer border border-primary-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.type === 'Hội thảo' 
                            ? 'bg-blue-100 text-blue-700' 
                            : event.type === 'Sự kiện cộng đồng'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {event.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-primary-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-primary-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                      <MapPin size={16} className="text-primary-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="text-primary-500" />
                      <span>{event.attendees} người tham gia</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary-200">
                    <span className="text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                      Đăng ký tham gia
                    </span>
                    <ArrowRight size={16} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center pt-6"
            >
              <a
                href="#"
                className="bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-700 transition-all hover:shadow-xl inline-flex items-center gap-2"
              >
                Xem Tất Cả Sự Kiện
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* YouTube Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video Giới Thiệu Lĩnh Vực Y Tế
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tìm hiểu thêm về các công nghệ y tế hiện đại và quy trình chăm sóc sức khỏe chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/-EcrCxlXYGA"
                  title="Công nghệ y tế hiện đại"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Công Nghệ Y Tế Hiện Đại
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Khám phá những tiến bộ mới nhất trong lĩnh vực công nghệ y tế và ứng dụng trong chẩn đoán điều trị
                </p>
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qRj10HIMNdA"
                  title="Chăm sóc sức khỏe"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Chăm Sóc Sức Khỏe Toàn Diện
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Tìm hiểu về quy trình chăm sóc sức khỏe chuyên nghiệp và các dịch vụ y tế chất lượng cao
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsEvents
