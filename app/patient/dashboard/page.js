'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Phone, LogOut, User } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function PatientDashboard() {
  const router = useRouter()
  const [patientPhone, setPatientPhone] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const phone = localStorage.getItem('patientPhone')
    if (!phone) {
      router.push('/patient/login')
      return
    }
    setPatientPhone(phone)
    fetchAppointments(phone)
  }, [router])

  const fetchAppointments = async (phone) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://quanlyphongkham-be.onrender.com/api/patient/${phone}/appointments`)
      if (response.data.success) {
        setAppointments(response.data.data)
      }
    } catch (error) {
      toast.error('Không thể tải lịch hẹn')
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    if (!confirm('Bạn có chắc muốn hủy lịch hẹn này?')) return

    try {
      const response = await axios.patch(
        `https://quanlyphongkham-be.onrender.com/api/patient/appointments/${appointmentId}/cancel`,
        { phone: patientPhone }
      )
      if (response.data.success) {
        toast.success('Đã hủy lịch hẹn')
        fetchAppointments(patientPhone)
      }
    } catch (error) {
      toast.error('Không thể hủy lịch hẹn')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('patientPhone')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'pending' || apt.status === 'confirmed'
  )
  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled'
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch hẹn của tôi</h1>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Phone size={14} />
              {patientPhone}
            </p>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Sắp tới</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <User className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter((a) => a.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch hẹn sắp tới</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              Bạn chưa có lịch hẹn nào sắp tới
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {apt.status === 'pending' ? 'Chờ xác nhận' : 'Đã xác nhận'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{apt.specialty}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(apt.appointmentDate).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {apt.appointmentTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {apt.fullName}
                        </div>
                      </div>
                    </div>
                    {apt.status === 'pending' && (
                      <button
                        onClick={() => cancelAppointment(apt._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Hủy lịch
                      </button>
                    )}
                  </div>
                  {apt.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Ghi chú:</strong> {apt.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch sử khám</h2>
            <div className="space-y-3">
              {pastAppointments.map((apt) => (
                <div key={apt._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{apt.specialty}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(apt.appointmentDate).toLocaleDateString('vi-VN')} - {apt.appointmentTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Cần hỗ trợ?</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="/#appointment"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Đặt lịch mới
            </a>
            <a
              href="tel:0378456839"
              className="px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
            >
              Gọi điện tư vấn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

