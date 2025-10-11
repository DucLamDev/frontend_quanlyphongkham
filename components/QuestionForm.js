'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MessageSquare, User, Phone, Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const QuestionForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('https://quanlyphongkham-be.onrender.com/api/questions', data)

      if (response.data.success) {
        toast.success('Câu hỏi của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.')
        reset()
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="questions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đặt Câu Hỏi Cho Phòng Khám
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bạn có thắc mắc về dịch vụ hoặc cần tư vấn? Hãy để lại câu hỏi, chúng tôi sẽ giải đáp ngay.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-primary-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <User size={18} />
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Câu hỏi */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <MessageSquare size={18} />
                  Câu hỏi của bạn <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('question', { required: 'Vui lòng nhập câu hỏi' })}
                  rows="6"
                  placeholder="Nhập câu hỏi hoặc nội dung cần tư vấn..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                ></textarea>
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
                )}
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
                    Gửi Câu Hỏi
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Hoặc liên hệ trực tiếp qua:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0378456839"
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-100"
              >
                <Phone size={18} className="text-primary-600" />
                <span className="font-semibold">037 845 6839</span>
              </a>
              <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <MessageSquare size={18} />
                <span className="font-semibold">Chat với chúng tôi</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuestionForm
