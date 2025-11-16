'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function PatientLogin() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error('Số điện thoại phải có 10 chữ số')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('https://quanlyphongkham-be.onrender.com/api/patient/login', {
        phone
      })

      if (response.data.success) {
        localStorage.setItem('patientPhone', phone)
        toast.success('Đăng nhập thành công!')
        router.push('/patient/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <User size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Tra cứu lịch hẹn</h1>
          <p className="text-gray-600 text-sm text-center mt-2">
            Nhập số điện thoại đã đặt lịch để xem thông tin
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="0912345678"
              maxLength={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Nhập số điện thoại bạn đã dùng để đặt lịch khám
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400"
          >
            {loading ? 'Đang kiểm tra...' : 'Xem lịch hẹn'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Chưa có lịch hẹn?{' '}
            <a href="/#appointment" className="text-green-600 hover:text-green-700 font-medium">
              Đặt lịch ngay
            </a>
          </p>
          <a href="/" className="block text-sm text-gray-500 hover:text-gray-700">
            ← Quay lại trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}

