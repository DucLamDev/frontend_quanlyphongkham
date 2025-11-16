'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, Search, Reply, CheckCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

const statusFilters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'answered', label: 'Đã trả lời' },
  { value: 'closed', label: 'Đã đóng' }
]

export default function MessagesManagement() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [messages, setMessages] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [answer, setAnswer] = useState('')
  const [answerStatus, setAnswerStatus] = useState('answered')

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    setAuthChecked(true)
    fetchMessages(storedToken, filterStatus)
  }, [router])

  useEffect(() => {
    if (!token) return
    fetchMessages(token, filterStatus)
  }, [filterStatus, token])

  const fetchMessages = async (authToken, status) => {
    try {
      setLoading(true)
      const query = status !== 'all' ? `?status=${status}` : ''
      const response = await axios.get(`http://localhost:5000/api/questions${query}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setMessages(response.data.data)
      }
    } catch (error) {
      toast.error('Không thể tải danh sách tin nhắn')
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter((message) => {
    const text = `${message.fullName} ${message.phone} ${message.question}`.toLowerCase()
    return text.includes(searchTerm.toLowerCase())
  })

  const openAnswerModal = (message) => {
    setSelectedMessage(message)
    setAnswer(message.answer || '')
    setAnswerStatus(message.status === 'pending' ? 'answered' : message.status)
  }

  const closeModal = () => {
    setSelectedMessage(null)
    setAnswer('')
    setAnswerStatus('answered')
  }

  const submitAnswer = async (e) => {
    e.preventDefault()
    if (!token || !selectedMessage) return
    if (!answer.trim()) {
      toast.error('Vui lòng nhập nội dung phản hồi')
      return
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/questions/${selectedMessage._id}`,
        { answer, status: answerStatus || 'answered' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Đã cập nhật phản hồi')
      closeModal()
      fetchMessages(token, filterStatus)
    } catch (error) {
      toast.error('Không thể gửi phản hồi')
    }
  }

  const closeMessage = async (message) => {
    if (!token) return
    try {
      await axios.patch(
        `http://localhost:5000/api/questions/${message._id}`,
        { status: 'closed' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Đã đóng yêu cầu')
      fetchMessages(token, filterStatus)
    } catch (error) {
      toast.error('Không thể đóng yêu cầu')
    }
  }

  if (!authChecked && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <AdminLayout title="Quản lý tin nhắn" description="Theo dõi và phản hồi câu hỏi của khách hàng">
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT hoặc nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filterStatus === status.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="divide-y divide-gray-100">
          {loading && messages.length === 0 && (
            <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>
          )}
          {!loading && filteredMessages.length === 0 && (
            <div className="p-6 text-center text-gray-500">Không có tin nhắn nào phù hợp</div>
          )}
          {filteredMessages.map((message) => (
            <div key={message._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{message.fullName}</p>
                      <p className="text-xs text-gray-500">{message.phone}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{message.question}</p>
                  {message.email && (
                    <p className="text-xs text-gray-500 mt-2">Email: {message.email}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      message.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : message.status === 'answered'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {statusFilters.find((s) => s.value === message.status)?.label || 'Không xác định'}
                  </span>
                  <p className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString('vi-VN')}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openAnswerModal(message)}
                      className="px-3 py-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 text-sm font-medium"
                    >
                      Trả lời
                    </button>
                    {message.status !== 'closed' && (
                      <button
                        onClick={() => closeMessage(message)}
                        className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium"
                      >
                        Đóng
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {message.answer && (
                <div className="mt-4 pl-4 border-l-4 border-primary-200">
                  <p className="text-xs text-primary-600 font-semibold uppercase mb-1">Phản hồi</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{message.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phản hồi khách hàng</h3>
                <p className="text-sm text-gray-500">Tin nhắn từ {selectedMessage.fullName}</p>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form onSubmit={submitAnswer} className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Nội dung câu hỏi</p>
                <p className="text-gray-900 whitespace-pre-line">{selectedMessage.question}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung phản hồi *</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows="5"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  placeholder="Nhập nội dung trả lời cho khách hàng..."
                ></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <select
                    value={answerStatus}
                    onChange={(e) => setAnswerStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="answered">Đã trả lời</option>
                    <option value="closed">Đã đóng</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary-600" />
                  <p className="text-sm text-gray-600">
                    Phản hồi sẽ được lưu lại và hiển thị trong lịch sử.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center gap-2"
                >
                  <Reply size={18} />
                  Gửi phản hồi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}


