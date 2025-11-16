'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit, Trash2, Stethoscope } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

const defaultForm = {
  name: '',
  title: '',
  specialty: '',
  experience: '',
  phone: '',
  email: '',
  education: '',
  isActive: true
}

export default function DoctorsManagement() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    setAuthChecked(true)
    fetchDoctors(storedToken)
  }, [router])

  const fetchDoctors = async (authToken = token) => {
    try {
      setLoading(true)
      const response = await axios.get('https://quanlyphongkham-be.onrender.com/api/admin/doctors', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setDoctors(response.data.doctors)
      }
    } catch (error) {
      toast.error('Không thể tải danh sách bác sĩ')
    } finally {
      setLoading(false)
    }
  }

  const searchValue = searchTerm.toLowerCase()
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.name?.toLowerCase() || ''
    const specialty = doctor.specialty?.toLowerCase() || ''
    return name.includes(searchValue) || specialty.includes(searchValue)
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openCreateModal = () => {
    setFormData(defaultForm)
    setEditingDoctor(null)
    setShowModal(true)
  }

  const openEditModal = (doctor) => {
    setFormData({
      name: doctor.name || '',
      title: doctor.title || '',
      specialty: doctor.specialty || '',
      experience: doctor.experience || '',
      phone: doctor.phone || '',
      email: doctor.email || '',
      education: doctor.education || '',
      isActive: doctor.isActive
    })
    setEditingDoctor(doctor)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return
    try {
      if (editingDoctor) {
        await axios.put(
          `https://quanlyphongkham-be.onrender.com/api/admin/doctors/${editingDoctor._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Cập nhật bác sĩ thành công')
      } else {
        await axios.post(
          'https://quanlyphongkham-be.onrender.com/api/admin/doctors',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Thêm bác sĩ mới thành công')
      }
      fetchDoctors()
      setShowModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    }
  }

  const deleteDoctor = async (id) => {
    if (!token || !confirm('Bạn có chắc muốn xóa bác sĩ này?')) return
    try {
      await axios.delete(`https://quanlyphongkham-be.onrender.com/api/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Đã xóa bác sĩ')
      fetchDoctors()
    } catch (error) {
      toast.error('Không thể xóa bác sĩ')
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
    <AdminLayout title="Quản lý bác sĩ" description="Theo dõi và cập nhật đội ngũ bác sĩ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Danh sách bác sĩ</h3>
          <p className="text-sm text-gray-500">
            Hiện có {doctors.length} bác sĩ đang hoạt động tại phòng khám
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          Thêm bác sĩ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc chuyên khoa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bác sĩ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Chuyên khoa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Liên hệ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hoạt động</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && doctors.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}
              {!loading && filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy bác sĩ phù hợp
                  </td>
                </tr>
              )}
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                        <Stethoscope size={18} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.experience}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{doctor.phone || '—'}</p>
                    <p className="text-xs text-gray-500">{doctor.email || '—'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {doctor.isActive ? 'Đang làm việc' : 'Tạm ngưng'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(doctor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteDoctor(doctor._id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingDoctor ? 'Chỉnh sửa bác sĩ' : 'Thêm bác sĩ mới'}
                </h3>
                <p className="text-sm text-gray-500">
                  Điền đầy đủ thông tin để hiển thị trên website
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chức danh *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa *</label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm *</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Học vấn / Chứng chỉ</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  Bác sĩ đang làm việc
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                  >
                    {editingDoctor ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}


