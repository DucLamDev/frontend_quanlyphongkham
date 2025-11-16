'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subjectOptions = [
    { value: 'appointment', label: 'Đặt lịch khám' },
    { value: 'consultation', label: 'Tư vấn sức khỏe' },
    { value: 'service', label: 'Hỏi về dịch vụ' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'other', label: 'Khác' }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const subjectLabel = subjectOptions.find(option => option.value === formData.subject)?.label || 'Liên hệ'
      await axios.post('http://localhost:5000/api/questions', {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        question: `[${subjectLabel}] ${formData.message}`
      })
      toast.success('Tin nhắn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error(error.response?.data?.message || 'Không thể gửi tin nhắn, vui lòng thử lại!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Hotline',
      content: '037 845 6839',
      description: 'Hỗ trợ 24/7',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      content: 'info@phongkhamminggiang.vn',
      description: 'Phản hồi trong 24h',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Địa chỉ',
      content: 'Khu đô thị Pom La, Điện Biên Phủ',
      description: 'Tỉnh Điện Biên',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Giờ làm việc',
      content: 'T2 - CN: 7:00 - 20:00',
      description: 'Cấp cứu: 24/24',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const departments = [
    {
      name: 'Khám Tổng Quát',
      phone: '037 845 6839',
      email: 'tongquat@phongkhamminggiang.vn',
      hours: '7:00 - 20:00'
    },
    {
      name: 'Sản - Phụ Khoa',
      phone: '037 845 6840',
      email: 'sanphukhoa@phongkhamminggiang.vn',
      hours: '7:00 - 18:00'
    },
    {
      name: 'Tim Mạch',
      phone: '037 845 6841',
      email: 'timmach@phongkhamminggiang.vn',
      hours: '8:00 - 17:00'
    },
    {
      name: 'Nhi Khoa',
      phone: '037 845 6842',
      email: 'nhikhoa@phongkhamminggiang.vn',
      hours: '7:00 - 19:00'
    }
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
              <span className="text-primary-600">Liên Hệ</span> Với Chúng Tôi
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi 
              để được tư vấn và hỗ trợ tốt nhất.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <p className="text-lg font-semibold text-primary-600 mb-2">{info.content}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Gửi Tin Nhắn</h2>
                <p className="text-gray-600">
                  Điền thông tin vào form bên dưới, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chủ đề *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Chọn chủ đề</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Gửi Tin Nhắn
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Google Maps */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.8!2d103.0167!3d21.3833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDIyJzU5LjkiTiAxMDPCsDAxJzAwLjEiRQ!5e0!3m2!1svi!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí Phòng Khám Minh Giang"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Liên Hệ Nhanh</h3>
                <div className="space-y-4">
                  <a
                    href="tel:0378456839"
                    className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Gọi ngay</p>
                      <p className="text-sm text-gray-600">037 845 6839</p>
                    </div>
                  </a>

                  <a
                    href="#appointment"
                    className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Đặt lịch khám</p>
                      <p className="text-sm text-gray-600">Đặt lịch trực tuyến</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@phongkhamminggiang.vn"
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Gửi email</p>
                      <p className="text-sm text-gray-600">info@phongkhamminggiang.vn</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
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
              Liên Hệ Theo Chuyên Khoa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Liên hệ trực tiếp với các khoa chuyên môn để được tư vấn chi tiết
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">{dept.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary-600" />
                    <a href={`tel:${dept.phone}`} className="text-primary-600 hover:text-primary-700 font-semibold">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primary-600" />
                    <a href={`mailto:${dept.email}`} className="text-primary-600 hover:text-primary-700 text-sm">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary-600" />
                    <span className="text-gray-600 text-sm">{dept.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những câu hỏi phổ biến về dịch vụ và quy trình khám chữa bệnh
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Làm thế nào để đặt lịch khám?",
                answer: "Bạn có thể đặt lịch khám qua hotline 037 845 6839, website hoặc đến trực tiếp phòng khám. Chúng tôi hỗ trợ đặt lịch 24/7."
              },
              {
                question: "Phòng khám có nhận bảo hiểm y tế không?",
                answer: "Có, chúng tôi liên kết với nhiều công ty bảo hiểm uy tín. Bạn có thể sử dụng thẻ bảo hiểm để thanh toán chi phí khám chữa bệnh."
              },
              {
                question: "Giờ làm việc của phòng khám?",
                answer: "Phòng khám mở cửa từ 7:00 - 20:00 (Thứ 2 - Thứ 6), 7:00 - 18:00 (Thứ 7), 8:00 - 17:00 (Chủ nhật). Dịch vụ cấp cứu hoạt động 24/24."
              },
              {
                question: "Có dịch vụ khám online không?",
                answer: "Có, chúng tôi cung cấp dịch vụ tư vấn sức khỏe online qua video call với các bác sĩ chuyên khoa."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
