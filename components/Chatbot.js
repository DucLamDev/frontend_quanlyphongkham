'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User as UserIcon, Phone, Calendar } from 'lucide-react'
import axios from 'axios'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Xin chào! Tôi là trợ lý ảo của Phòng Khám Minh Giang. Tôi có thể giúp gì cho bạn?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    specialty: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  })
  const [bookingSymptoms, setBookingSymptoms] = useState([])
  const [bookingSpecialties, setBookingSpecialties] = useState([])
  const [doctorOptions, setDoctorOptions] = useState([])
  const [bookingMetaLoading, setBookingMetaLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    'Giờ làm việc',
    'Đặt lịch khám',
    'Dịch vụ',
    'Bác sĩ',
    'Địa chỉ'
  ]

  const symptomOptions = [
    'Khám tổng quát',
    'Đau đầu chóng mặt',
    'Khó thở',
    'Đau ngực',
    'Khám thai',
    'Khám nhi',
    'Kiểm tra sau điều trị'
  ]

  const timePresets = ['07:30', '09:00', '10:30', '13:30', '15:00', '17:30']

  useEffect(() => {
    if (bookingOpen && (!bookingSpecialties.length || !doctorOptions.length)) {
      fetchBookingResources()
    }
  }, [bookingOpen])

  const fetchBookingResources = async () => {
    try {
      setBookingMetaLoading(true)
      const [specialtyRes, doctorRes] = await Promise.all([
        axios.get('http://localhost:5000/api/appointments/specialties'),
        axios.get('http://localhost:5000/api/appointments/providers')
      ])

      if (specialtyRes.data.success) {
        setBookingSpecialties(specialtyRes.data.data)
      }
      if (doctorRes.data.success) {
        setDoctorOptions(doctorRes.data.data)
      }
    } catch (error) {
      console.error('Booking metadata error:', error)
      setBookingError('Không tải được danh sách chuyên khoa/bác sĩ. Vui lòng thử lại sau.')
    } finally {
      setBookingMetaLoading(false)
    }
  }

  const handleBookingInput = (e) => {
    const { name, value } = e.target
    
    // Validate time if date is today - prevent past time selection
    if (name === 'appointmentTime' || name === 'appointmentDate') {
      const selectedDate = name === 'appointmentDate' ? value : bookingData.appointmentDate
      const selectedTime = name === 'appointmentTime' ? value : bookingData.appointmentTime
      
      if (selectedDate && selectedTime) {
        const now = new Date()
        const selected = new Date(`${selectedDate}T${selectedTime}`)
        
        if (selected < now) {
          toast.error('Không thể chọn thời gian trong quá khứ')
          return
        }
      }
    }
    
    setBookingData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleSymptom = (symptom) => {
    setBookingSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    )
  }

  const openBookingForm = () => {
    setBookingError('')
    setBookingOpen(true)
  }

  const closeBookingForm = () => {
    setBookingOpen(false)
    setBookingData({
      fullName: '',
      phone: '',
      email: '',
      specialty: '',
      doctorId: '',
      appointmentDate: '',
      appointmentTime: '',
      notes: ''
    })
    setBookingSymptoms([])
    setBookingError('')
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (bookingLoading) return

    const requiredFields = ['fullName', 'phone', 'specialty', 'appointmentDate', 'appointmentTime']
    const missing = requiredFields.find((field) => !bookingData[field])
    if (missing) {
      setBookingError('Vui lòng điền đầy đủ thông tin bắt buộc trước khi gửi.')
      return
    }

    const noteSegments = []
    if (bookingSymptoms.length) {
      noteSegments.push(`Triệu chứng: ${bookingSymptoms.join(', ')}`)
    }
    if (bookingData.notes) {
      noteSegments.push(bookingData.notes)
    }
    if (bookingData.doctorId) {
      const doctor = doctorOptions.find((doc) => doc._id === bookingData.doctorId)
      if (doctor) {
        noteSegments.push(`Ưu tiên bác sĩ: ${doctor.name}`)
      }
    }

    try {
      setBookingLoading(true)
      setBookingError('')
      await axios.post('http://localhost:5000/api/appointments', {
        fullName: bookingData.fullName,
        phone: bookingData.phone,
        email: bookingData.email,
        specialty: bookingData.specialty,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        notes: noteSegments.join(' | ') || undefined
      })

      const confirmationMessage = `Cảm ơn ${bookingData.fullName}! Tôi đã ghi nhận lịch khám ${new Date(
        bookingData.appointmentDate
      ).toLocaleDateString('vi-VN')} lúc ${bookingData.appointmentTime} cho chuyên khoa ${
        bookingData.specialty
      }. Bộ phận lễ tân sẽ liên hệ xác nhận sớm.`

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: confirmationMessage,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ])
      closeBookingForm()
    } catch (error) {
      console.error('Booking submit error:', error)
      setBookingError(error.response?.data?.message || 'Không thể gửi yêu cầu đặt lịch. Vui lòng thử lại!')
    } finally {
      setBookingLoading(false)
    }
  }

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const newMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      // Call backend chatbot API
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        message: message
      })

      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          text: response.data.reply,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      console.error('Chatbot error:', error)
      setTimeout(() => {
        const errorMessage = {
          type: 'bot',
          text: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng liên hệ hotline 037 845 6839 để được hỗ trợ.',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, errorMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleQuickReply = (reply) => {
    if (reply === 'Đặt lịch khám') {
      openBookingForm()
      return
    }
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-4">
        {/* Chatbot Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            console.log('Chatbot button clicked, isOpen:', isOpen)
            setIsOpen(!isOpen)
          }}
          className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all flex items-center justify-center"
          title="Trò chuyện"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="relative"
              >
                <MessageCircle size={26} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Calendar/Appointment Button */}
        <motion.a
          href="#appointment"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all group flex items-center justify-center"
          title="Đặt lịch khám"
        >
          <Calendar size={26} className="group-hover:rotate-12 transition-transform" />
        </motion.a>

        {/* Phone Button */}
        <motion.a
          href="tel:0378456839"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all group flex items-center justify-center"
          title="Gọi điện"
        >
          <Phone size={26} className="group-hover:rotate-12 transition-transform" />
        </motion.a>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <motion.div
          key="chatbot-window"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-24 right-6 z-[60] w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-visible"
          style={{ display: 'block' }}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Trợ Lý Ảo</h3>
                  <p className="text-xs opacity-90">Phòng Khám Minh Giang</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
              <AnimatePresence>
                {bookingOpen && (
                  <motion.div
                    key="booking-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-4 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Đặt lịch khám nhanh</p>
                        <p className="text-xs text-gray-500">Điền thông tin để chúng tôi giữ chỗ cho bạn</p>
                      </div>
                      <button
                        onClick={closeBookingForm}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                        aria-label="Đóng form đặt lịch"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {bookingMetaLoading ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                        <p className="text-sm">Đang tải dữ liệu...</p>
                      </div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleBookingSubmit}>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-600">Thông tin cá nhân</label>
                          <input
                            type="text"
                            id="booking-fullName"
                            name="fullName"
                            value={bookingData.fullName}
                            onChange={handleBookingInput}
                            placeholder="Họ và tên *"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                          />
                          <input
                            type="tel"
                            id="booking-phone"
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleBookingInput}
                            placeholder="Số điện thoại *"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                          />
                          <input
                            type="email"
                            id="booking-email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleBookingInput}
                            placeholder="Email (không bắt buộc)"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-600">Chọn chuyên khoa *</label>
                          <div className="flex flex-wrap gap-2">
                            {bookingSpecialties.map((specialty) => (
                              <button
                                type="button"
                                key={specialty}
                                onClick={() =>
                                  setBookingData((prev) => ({
                                    ...prev,
                                    specialty,
                                    doctorId: ''
                                  }))
                                }
                                className={`px-3 py-1 rounded-full text-xs border ${
                                  bookingData.specialty === specialty
                                    ? 'bg-primary-600 text-white border-primary-600'
                                    : 'bg-white text-gray-600 border-gray-200'
                                }`}
                              >
                                {specialty}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-600">Ưu tiên bác sĩ</label>
                          <select
                            id="booking-doctorId"
                            name="doctorId"
                            value={bookingData.doctorId}
                            onChange={handleBookingInput}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none bg-white"
                          >
                            <option value="">Không yêu cầu</option>
                            {doctorOptions
                              .filter((doctor) =>
                                bookingData.specialty ? doctor.specialty === bookingData.specialty : true
                              )
                              .map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>{`${doctor.name} - ${doctor.specialty}`}</option>
                              ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-600">Ngày khám *</label>
                            <input
                              type="date"
                              id="booking-appointmentDate"
                              name="appointmentDate"
                              min={new Date().toISOString().split('T')[0]}
                              value={bookingData.appointmentDate}
                              onChange={handleBookingInput}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-600">Giờ khám *</label>
                            <input
                              type="time"
                              id="booking-appointmentTime"
                              name="appointmentTime"
                              value={bookingData.appointmentTime}
                              onChange={handleBookingInput}
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                            />
                            <div className="flex flex-wrap gap-1">
                              {timePresets.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() =>
                                    setBookingData((prev) => ({
                                      ...prev,
                                      appointmentTime: time
                                    }))
                                  }
                                  className={`px-2 py-1 text-xs rounded border ${
                                    bookingData.appointmentTime === time
                                      ? 'bg-primary-100 border-primary-500 text-primary-700'
                                      : 'border-gray-200 text-gray-500'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-600">Triệu chứng / mục đích khám</label>
                          <div className="flex flex-wrap gap-2">
                            {symptomOptions.map((symptom) => (
                              <button
                                type="button"
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={`px-3 py-1 rounded-full text-xs border ${
                                  bookingSymptoms.includes(symptom)
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-gray-600 border-gray-200'
                                }`}
                              >
                                {symptom}
                              </button>
                            ))}
                          </div>
                          <textarea
                            id="booking-notes"
                            name="notes"
                            value={bookingData.notes}
                            onChange={handleBookingInput}
                            rows="3"
                            placeholder="Mô tả triệu chứng hoặc yêu cầu khác..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none resize-none"
                          ></textarea>
                        </div>

                        {bookingError && <p className="text-xs text-red-500">{bookingError}</p>}

                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {bookingLoading ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-primary-600" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none shadow-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-primary-600" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t bg-white">
                <p className="text-xs text-gray-500 mb-2">Gợi ý câu hỏi:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors flex-shrink-0"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
      )}
    </>
  )
}

export default Chatbot
