'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, CheckCircle, Copy, Sparkles } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const VoucherPopup = ({ isOpen, onClose, voucherCode = 'KHAM10' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode)
    setCopied(true)
    toast.success('Đã sao chép mã voucher!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Popup Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 opacity-10"></div>
              
              {/* Sparkles Animation */}
              <div className="absolute top-10 left-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </motion.div>
              </div>
              
              <div className="absolute top-20 right-16">
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-xl"
                    >
                      <CheckCircle className="w-16 h-16 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-green-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 mb-3"
                >
                  Đặt Lịch Thành Công! 🎉
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6"
                >
                  Cảm ơn bạn đã tin tưởng Phòng Khám Minh Giang
                </motion.p>

                {/* Voucher Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden"
                >
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Gift className="w-8 h-8 text-white" />
                      <h3 className="text-2xl font-bold text-white">Voucher Giảm Giá</h3>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <p className="text-white/90 text-sm mb-2">Mã giảm giá của bạn</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-4xl font-bold text-white tracking-wider">
                          {voucherCode}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
                      <p className="text-white text-lg font-bold">
                        Giảm 10% chi phí khám
                      </p>
                      <p className="text-white/80 text-sm mt-1">
                        Áp dụng cho lần khám tiếp theo
                      </p>
                    </div>

                    {/* Copy Button */}
                    <motion.button
                      onClick={handleCopyCode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Đã sao chép!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Sao chép mã
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Info Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-gray-500 space-y-2"
                >
                  <p>✓ Chúng tôi đã gửi thông tin đến số điện thoại của bạn</p>
                  <p>✓ Vui lòng đến đúng giờ hẹn để được phục vụ tốt nhất</p>
                  <p className="font-semibold text-primary-600">
                    Mã voucher có hiệu lực trong 30 ngày
                  </p>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Đóng
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VoucherPopup
