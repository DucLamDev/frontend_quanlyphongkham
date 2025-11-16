'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

const defaultForm = {
  fullName: '',
  phone: '',
  email: '',
  gender: '',
  dateOfBirth: '',
  address: '',
  isActive: true
}

export default function PatientsManagement() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    setAuthChecked(true)
    fetchPatients(storedToken)
  }, [router])

  const fetchPatients = async (authToken = token) => {
    try {
      setLoading(true)
      const response = await axios.get('https://quanlyphongkham-be.onrender.com/api/admin/patients?limit=100', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setPatients(response.data.patients)
      }
    } catch (error) {
      toast.error('Không thể tải danh sách bệnh nhân')
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter((patient) => {
    const text = `${patient.fullName} ${patient.phone} ${patient.email || ''}`.toLowerCase()
    return text.includes(searchTerm.toLowerCase())
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openCreateModal = () => {
    setFormData(defaultForm)
    setSelectedPatient(null)
    setShowFormModal(true)
  }

  const openEditModal = (patient) => {
    setFormData({
      fullName: patient.fullName || '',
      phone: patient.phone || '',
      email: patient.email || '',
      gender: patient.gender || '',
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.split('T')[0] : '',
      address: patient.address || '',
      isActive: patient.isActive
    })
    setSelectedPatient(patient)
    setShowFormModal(true)
  }

  const openDetailModal = (patient) => {
    setSelectedPatient(patient)
    setShowDetailModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return
    try {
      if (selectedPatient) {
        await axios.put(
          `https://quanlyphongkham-be.onrender.com/api/admin/patients/${selectedPatient._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Cập nhật bệnh nhân thành công')
      } else {
        await axios.post(
          'https://quanlyphongkham-be.onrender.com/api/admin/patients',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Thêm bệnh nhân mới thành công')
      }
      fetchPatients()
      setShowFormModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    }
  }

  const deletePatient = async (id) => {
    if (!token || !confirm('Bạn có chắc muốn xóa bệnh nhân này?')) return
    try {
      await axios.delete(`https://quanlyphongkham-be.onrender.com/api/admin/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Đã xóa bệnh nhân')
      fetchPatients()
    } catch (error) {
      toast.error('Không thể xóa bệnh nhân')
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
    <AdminLayout title="Quản lý bệnh nhân" description="Theo dõi hồ sơ và thông tin bệnh nhân">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Hồ sơ bệnh nhân</h3>
          <p className="text-sm text-gray-500">Đang có {patients.length} bệnh nhân trong hệ thống</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          Thêm bệnh nhân
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users size={18} className="text-primary-600" />
          Tổng số bệnh nhân: <span className="font-semibold text-gray-800">{patients.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Liên hệ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Giới tính</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày tạo</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && patients.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}
              {!loading && filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy bệnh nhân phù hợp
                  </td>
                </tr>
              )}
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{patient.fullName}</p>
                    <p className="text-xs text-gray-500">{patient.address || 'Chưa cập nhật'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{patient.phone}</p>
                    <p className="text-xs text-gray-500">{patient.email || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {patient.gender === 'male' ? 'Nam' : patient.gender === 'female' ? 'Nữ' : 'Khác/—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(patient.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDetailModal(patient)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openEditModal(patient)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deletePatient(patient._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedPatient ? 'Chỉnh sửa bệnh nhân' : 'Thêm bệnh nhân mới'}
                </h3>
                <p className="text-sm text-gray-500">
                  Nhập thông tin cơ bản của bệnh nhân
                </p>
              </div>
              <button onClick={() => setShowFormModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  Bệnh nhân đang hoạt động
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                  >
                    {selectedPatient ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Họ tên</p>
                  <p className="text-gray-900 font-semibold">{selectedPatient.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Giới tính</p>
                  <p className="text-gray-900">
                    {selectedPatient.gender === 'male'
                      ? 'Nam'
                      : selectedPatient.gender === 'female'
                      ? 'Nữ'
                      : 'Khác'}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Số điện thoại</p>
                  <p className="text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-gray-900">{selectedPatient.email || '—'}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Ngày sinh</p>
                  <p className="text-gray-900">
                    {selectedPatient.dateOfBirth
                      ? new Date(selectedPatient.dateOfBirth).toLocaleDateString('vi-VN')
                      : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Địa chỉ</p>
                  <p className="text-gray-900">{selectedPatient.address || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Trạng thái</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedPatient.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedPatient.isActive ? 'Đang theo dõi' : 'Đã lưu trữ'}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Tạo ngày</p>
                <p className="text-gray-900">
                  {new Date(selectedPatient.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}


