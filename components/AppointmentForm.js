'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Calendar, Clock, User, Phone, Mail, FileText, Send, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import VoucherPopup from './VoucherPopup'

const AppointmentForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVoucher, setShowVoucher] = useState(false)

  const specialties = [
    'Tư vấn khám',
    'Trả lời bệnh',
    'Bằng giá',
    'Hỏi giáp bác sĩ',
    'Sao răng',
    'Khác'
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('https://quanlyphongkham-be.onrender.com/api/appointments', {
        ...data,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime
      })

      if (response.data.success) {
        reset()
        setShowVoucher(true)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <VoucherPopup 
        isOpen={showVoucher} 
        onClose={() => setShowVoucher(false)}
        voucherCode="KHAM10"
      />
      
      <section id="appointment" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Đặt Lịch Khám Chữa Bệnh
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Điền thông tin vào form dưới đây để đặt lịch khám. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Họ và tên */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <User size={18} />
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Phone size={18} />
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone', {
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: 'Số điện thoại không hợp lệ'
                    }
                  })}
                  type="tel"
                  placeholder="0383015115"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Mail size={18} />
                  Email
                </label>
                <input
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email không hợp lệ'
                    }
                  })}
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Chuyên khoa */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FileText size={18} />
                  Chuyên khoa <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('specialty', { required: 'Vui lòng chọn chuyên khoa' })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                >
                  <option value="">Chọn chuyên khoa</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                {errors.specialty && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <Calendar size={18} />
                    Ngày khám <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('appointmentDate', { required: 'Vui lòng chọn ngày' })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                  />
                  {errors.appointmentDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.appointmentDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <Clock size={18} />
                    Giờ khám <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('appointmentTime', { required: 'Vui lòng chọn giờ' })}
                    type="time"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all duration-300"
                  />
                  {errors.appointmentTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.appointmentTime.message}</p>
                  )}
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <FileText size={18} />
                  Nội dung khám (không bắt buộc)
                </label>
                <textarea
                  {...register('notes')}
                  rows="4"
                  placeholder="Mô tả triệu chứng hoặc lý do khám..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 btn-ripple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Đặt Lịch Khám
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 border-2 border-primary-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6 text-primary-600" />
                Thông Tin Liên Hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Hotline</p>
                    <p className="text-gray-700">037 845 6839</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Giờ làm việc</p>
                    <p className="text-gray-700">Thứ 2 - Chủ nhật: 7:00 - 20:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Địa chỉ</p>
                    <p className="text-gray-700">Khu đô thị Pom La, Điện Biên Phủ, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Đối Tác Bảo Hiểm
                </h3>
              <p className="mb-6 opacity-90">
                Chúng tôi chấp nhận thanh toán bảo hiểm từ các đối tác:
              </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Blue Cross', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/blue-cross.jpg' },
                    { name: 'Dai-ichi Life', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/dai-ichi-life.png' },
                    { name: 'Allianz', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/allianz.jpg' },
                    { name: 'AXA', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/axa.png' },
                    { name: 'Pacific Cross', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/pacific-cross.jpg' },
                    { name: 'AIG', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/aig.png' },
                    { name: 'FWD', url: 'https://benhvienphuongdong.vn/public/uploads/doi-tac/thumbs/350x0/fwd.png' }
                  ].map((insurance, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img 
                        src={insurance.url} 
                        alt={insurance.name}
                        className="w-full h-12 object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AppointmentForm
