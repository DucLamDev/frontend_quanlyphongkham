'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Calendar,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Trash2
} from 'lucide-react'
import axios from 'axios'

export default function AppointmentsManagement() {
  const router = useRouter()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchAppointments(token)
  }, [filter])

  const fetchAppointments = async (token) => {
    try {
      const url = filter === 'all' 
        ? 'https://quanlyphongkham-be.onrender.com/api/admin/appointments'
        : `https://quanlyphongkham-be.onrender.com/api/admin/appointments?status=${filter}`

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        setAppointments(response.data.appointments)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.patch(
        `https://quanlyphongkham-be.onrender.com/api/admin/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        fetchAppointments(token)
        alert('Cập nhật trạng thái thành công!')
      }
    } catch (error) {
      alert('Lỗi cập nhật trạng thái')
    }
  }

  const deleteAppointment = async (id) => {
    if (!confirm('Bạn có chắc muốn xóa lịch hẹn này?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.delete(
        `https://quanlyphongkham-be.onrender.com/api/admin/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        fetchAppointments(token)
        alert('Xóa lịch hẹn thành công!')
      }
    } catch (error) {
      alert('Lỗi xóa lịch hẹn')
    }
  }

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Đã xác nhận', class: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Đã hủy', class: 'bg-red-100 text-red-800' },
      completed: { label: 'Hoàn thành', class: 'bg-blue-100 text-blue-800' }
    }
    return config[status] || config.pending
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.phone.includes(searchTerm) ||
    apt.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Lịch hẹn</h1>
          <p className="text-gray-600">Quản lý tất cả các lịch hẹn khám bệnh</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SĐT, chuyên khoa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Tất cả' : getStatusBadge(status).label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Liên hệ</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Chuyên khoa</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Ngày & Giờ</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appointment) => {
                  const statusBadge = getStatusBadge(appointment.status)
                  return (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{appointment.fullName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{appointment.phone}</div>
                        {appointment.email && (
                          <div className="text-xs text-gray-500">{appointment.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{appointment.specialty}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}
                        </div>
                        <div className="text-xs text-gray-500">{appointment.appointmentTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.class}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(appointment._id, 'confirmed')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                title="Xác nhận"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                onClick={() => updateStatus(appointment._id, 'cancelled')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Hủy"
                              >
                                <X size={18} />
                              </button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button
                              onClick={() => updateStatus(appointment._id, 'completed')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Hoàn thành"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowModal(true)
                            }}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => deleteAppointment(appointment._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Chi tiết lịch hẹn</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Họ tên</label>
                  <p className="text-gray-900 font-medium">{selectedAppointment.fullName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    <p className="text-gray-900">{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedAppointment.email || 'Không có'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Chuyên khoa</label>
                  <p className="text-gray-900">{selectedAppointment.specialty}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày khám</label>
                    <p className="text-gray-900">
                      {new Date(selectedAppointment.appointmentDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Giờ khám</label>
                    <p className="text-gray-900">{selectedAppointment.appointmentTime}</p>
                  </div>
                </div>
                {selectedAppointment.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ghi chú</label>
                    <p className="text-gray-900">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
