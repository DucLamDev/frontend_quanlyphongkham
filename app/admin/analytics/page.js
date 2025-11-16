'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, TrendingUp, Users, Calendar, Activity, Download } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

export default function AnalyticsPage() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('month') // week, month, year

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    setAuthChecked(true)
    fetchAnalytics(storedToken, timeRange)
  }, [router])

  useEffect(() => {
    if (!token) return
    fetchAnalytics(token, timeRange)
  }, [timeRange, token])

  const fetchAnalytics = async (authToken, range) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/admin/analytics?range=${range}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setAnalytics(response.data.data)
      }
    } catch (error) {
      toast.error('Không thể tải dữ liệu phân tích')
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/analytics/export?range=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Đã xuất báo cáo')
    } catch (error) {
      toast.error('Không thể xuất báo cáo')
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
    <AdminLayout title="Phân tích & Báo cáo" description="Thống kê và phân tích dữ liệu đặt lịch">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {range === 'week' ? 'Tuần' : range === 'month' ? 'Tháng' : 'Năm'}
            </button>
          ))}
        </div>
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download size={18} />
          Xuất báo cáo
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : analytics ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-blue-600" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Tổng lịch hẹn</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalAppointments || 0}</p>
              <p className="text-xs text-gray-500 mt-2">
                +{analytics.growthRate || 0}% so với kỳ trước
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Bệnh nhân mới</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.newPatients || 0}</p>
              <p className="text-xs text-gray-500 mt-2">Trong kỳ này</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Activity size={24} className="text-orange-600" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Tỷ lệ hoàn thành</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.completionRate || 0}%</p>
              <p className="text-xs text-gray-500 mt-2">Lịch đã hoàn tất</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BarChart3 size={24} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Tỷ lệ hủy</h3>
              <p className="text-3xl font-bold text-gray-900">{analytics.cancellationRate || 0}%</p>
              <p className="text-xs text-gray-500 mt-2">Lịch bị hủy</p>
            </div>
          </div>

          {/* Specialty Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Phân bổ theo chuyên khoa</h3>
            <div className="space-y-4">
              {analytics.specialtyDistribution?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">{item.specialty}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-primary-600 h-full flex items-center justify-end pr-3 text-white text-xs font-medium"
                      style={{ width: `${item.percentage}%` }}
                    >
                      {item.count} ({item.percentage}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Giờ cao điểm</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.peakHours?.map((hour, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">{hour.hour}:00</p>
                  <p className="text-sm text-gray-600 mt-1">{hour.count} lịch hẹn</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">Không có dữ liệu</div>
      )}
    </AdminLayout>
  )
}

