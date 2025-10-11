'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Instagram, MessageCircle, Calendar, Shield, Award, Users } from 'lucide-react'

const Footer = () => {
  const insurancePartners = [
    { name: 'Blue Cross', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/blue-cross.jpg' },
    { name: 'Dai-ichi Life', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/dai-ichi-life.png' },
    { name: 'Allianz', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/allianz.jpg' },
    { name: 'AXA', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/axa.png' },
    { name: 'Pacific Cross', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/pacific-cross.jpg' },
    { name: 'AIG', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/aig.png' },
    { name: 'FWD', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/fwd.png' }
  ]

  const quickLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Đội ngũ bác sĩ', href: '#doctors' },
    { label: 'Tin tức', href: '#news' },
    { label: 'Đặt lịch khám', href: '#appointment' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Tuyển dụng', href: '/recruitment' },
  ]

  const services = [
    { label: 'Khám sức khỏe tổng quát', href: '#services' },
    { label: 'Sản - Phụ khoa', href: '#services' },
    { label: 'Tim mạch', href: '#services' },
    { label: 'Chẩn đoán hình ảnh', href: '#services' },
    { label: 'Xét nghiệm', href: '#services' },
    { label: 'Tiêm chủng', href: '#services' },
  ]

  const workingHours = [
    { day: 'Thứ 2 - Thứ 6', time: '7:00 - 20:00' },
    { day: 'Thứ 7', time: '7:00 - 18:00' },
    { day: 'Chủ nhật', time: '8:00 - 17:00' },
    { day: 'Cấp cứu', time: '24/24' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* About & Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <div className="text-primary-600 font-bold text-lg">MG</div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Phòng Khám Minh Giang</h3>
                <p className="text-sm text-gray-300">Tỉnh Điện Biên</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Phòng khám đa khoa ứng dụng kỹ thuật cao đầu tiên tại thành phố Điện Biên Phủ. 
              Cam kết mang đến dịch vụ y tế chất lượng cao với đội ngũ bác sĩ chuyên nghiệp.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 text-white transition-all hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-red-600 text-white transition-all hover:scale-110"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-pink-600 text-white transition-all hover:scale-110"
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* Certifications */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-semibold text-white">Chứng nhận</span>
              </div>
              <p className="text-xs text-gray-300">
                Được cấp phép hoạt động bởi Sở Y tế tỉnh Điện Biên
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Liên Kết Nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Dịch Vụ</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Liên Hệ</h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Hotline</p>
                  <a href="tel:0378456839" className="text-white hover:text-primary-400 font-semibold">
                    037 845 6839
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:info@phongkhamminggiang.vn" className="text-white hover:text-primary-400 text-sm">
                    info@phongkhamminggiang.vn
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Địa chỉ</p>
                  <p className="text-white text-sm">Khu đô thị Pom La, Điện Biên Phủ</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-semibold text-white">Giờ làm việc</span>
              </div>
              <div className="space-y-2">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-white">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insurance Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary-400" />
            <h3 className="font-bold text-lg text-white">Đối Tác Bảo Hiểm</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {insurancePartners.map((partner, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={partner.url} 
                  alt={partner.name}
                  className="w-full h-12 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Đăng Ký Nhận Tin Tức</h3>
            <p className="text-primary-100 mb-6">
              Nhận thông tin về các chương trình khuyến mãi và sự kiện sức khỏe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>
              © 2025 Phòng Khám Đa Khoa Minh Giang. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons - Professional Design */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.a
          href="tel:0378456839"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all"
        >
          <Phone size={26} className="text-white" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Gọi ngay
          </div>
        </motion.a>
        
        <motion.a
          href="#appointment"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-orange-500/50 transition-all"
        >
          <Calendar size={26} className="text-white" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Đặt lịch khám
          </div>
        </motion.a>
        
        <motion.a
          href="https://zalo.me/0378456839"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-600/50 transition-all"
        >
          <MessageCircle size={26} className="text-white" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat Zalo
          </div>
        </motion.a>
      </div>
    </footer>
  )
}

export default Footer
