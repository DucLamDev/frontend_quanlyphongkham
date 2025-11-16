'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, CheckCircle, Clock, Users, XCircle, LogOut } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function DoctorDashboard() {
  const router = useRouter()
  const [doctorData, setDoctorData] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, confirmed, completed, cancelled

  useEffect(() => {
    const doctorInfo = localStorage.getItem('doctorInfo')
    if (!doctorInfo) {
      router.push('/doctor/login')
      return
    }
    const doctor = JSON.parse(doctorInfo)
    setDoctorData(doctor)
    fetchAppointments(doctor._id)
  }, [router])

  const fetchAppointments = async (doctorId) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}/appointments`)
      if (response.data.success) {
        setAppointments(response.data.data)
      }
    } catch (error) {
      toast.error('Không thể tải danh sách lịch hẹn')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/appointments/${appointmentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }
      )
      if (response.data.success) {
        toast.success('Cập nhật trạng thái thành công')
        fetchAppointments(doctorData._id)
      }
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('doctorInfo')
    router.push('/')
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true
    return apt.status === filter
  })

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length
  }

  if (loading || !doctorData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển Bác sĩ</h1>
            <p className="text-sm text-gray-600">Chào mừng, BS. {doctorData.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tổng lịch</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Chờ xác nhận</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <Users className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Đã xác nhận</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <XCircle className="text-red-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Đã hủy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'Tất cả' : 
               status === 'pending' ? 'Chờ xác nhận' :
               status === 'confirmed' ? 'Đã xác nhận' :
               status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liên hệ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày khám</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giờ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chuyên khoa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      Không có lịch hẹn nào
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{apt.phone}</div>
                        {apt.email && <div className="text-xs text-gray-500">{apt.email}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(apt.appointmentDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.appointmentTime}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.specialty}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status === 'pending' ? 'Chờ xác nhận' :
                           apt.status === 'confirmed' ? 'Đã xác nhận' :
                           apt.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {apt.notes || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {apt.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateAppointmentStatus(apt._id, 'confirmed')}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                            >
                              Xác nhận
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(apt._id, 'cancelled')}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                            >
                              Hủy
                            </button>
                          </div>
                        )}
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt._id, 'completed')}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                          >
                            Hoàn thành
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

