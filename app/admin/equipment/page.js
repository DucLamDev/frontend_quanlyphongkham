'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit, Trash2, Wrench } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/admin/AdminLayout'

const categories = [
  { value: '', label: 'Tất cả loại thiết bị' },
  { value: 'diagnostic', label: 'Chẩn đoán' },
  { value: 'treatment', label: 'Điều trị' },
  { value: 'surgical', label: 'Phẫu thuật' },
  { value: 'monitoring', label: 'Theo dõi' },
  { value: 'laboratory', label: 'Xét nghiệm' },
  { value: 'other', label: 'Khác' }
]

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'operational', label: 'Đang hoạt động' },
  { value: 'maintenance', label: 'Bảo trì' },
  { value: 'repair', label: 'Đang sửa chữa' },
  { value: 'retired', label: 'Ngưng sử dụng' }
]

const defaultForm = {
  name: '',
  category: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  status: 'operational',
  location: '',
  purchaseDate: '',
  warrantyExpiry: ''
}

export default function EquipmentManagement() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [equipment, setEquipment] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [editingEquipment, setEditingEquipment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }
    setToken(storedToken)
    setAuthChecked(true)
    fetchEquipment(storedToken)
  }, [router])

  const fetchEquipment = async (authToken = token) => {
    try {
      setLoading(true)
      const params = []
      if (filterCategory) params.push(`category=${filterCategory}`)
      if (filterStatus) params.push(`status=${filterStatus}`)
      const query = params.length ? `?${params.join('&')}` : ''
      const response = await axios.get(`http://localhost:5000/api/admin/equipment${query}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setEquipment(response.data.equipment)
      }
    } catch (error) {
      toast.error('Không thể tải danh sách thiết bị')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchEquipment(token)
  }, [filterCategory, filterStatus])

  const equipmentSearch = searchTerm.toLowerCase()
  const filteredEquipment = equipment.filter((item) => {
    const name = item.name?.toLowerCase() || ''
    const category = item.category?.toLowerCase() || ''
    const location = item.location?.toLowerCase() || ''
    return `${name} ${category} ${location}`.includes(equipmentSearch)
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openCreateModal = () => {
    setFormData(defaultForm)
    setEditingEquipment(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setFormData({
      name: item.name || '',
      category: item.category || '',
      manufacturer: item.manufacturer || '',
      model: item.model || '',
      serialNumber: item.serialNumber || '',
      status: item.status || 'operational',
      location: item.location || '',
      purchaseDate: item.purchaseDate ? item.purchaseDate.split('T')[0] : '',
      warrantyExpiry: item.warrantyExpiry ? item.warrantyExpiry.split('T')[0] : ''
    })
    setEditingEquipment(item)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return
    try {
      if (editingEquipment) {
        await axios.put(
          `http://localhost:5000/api/admin/equipment/${editingEquipment._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Cập nhật thiết bị thành công')
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/equipment',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Thêm thiết bị mới thành công')
      }
      fetchEquipment()
      setShowModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    }
  }

  const deleteEquipment = async (id) => {
    if (!token || !confirm('Bạn có chắc muốn xóa thiết bị này?')) return
    try {
      await axios.delete(`http://localhost:5000/api/admin/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Đã xóa thiết bị')
      fetchEquipment()
    } catch (error) {
      toast.error('Không thể xóa thiết bị')
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
    <AdminLayout title="Quản lý thiết bị" description="Theo dõi trạng thái và lịch sử thiết bị y tế">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Thiết bị y tế</h3>
          <p className="text-sm text-gray-500">Đang quản lý {equipment.length} thiết bị</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={18} />
          Thêm thiết bị
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc vị trí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Thiết bị</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Loại & Vị trí</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Thông số</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && equipment.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}
              {!loading && filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy thiết bị phù hợp
                  </td>
                </tr>
              )}
              {filteredEquipment.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Wrench size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.serialNumber || 'Chưa cập nhật SN'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {categories.find((cat) => cat.value === item.category)?.label || 'Không xác định'}
                    </p>
                    <p className="text-xs text-gray-500">{item.location || 'Chưa có vị trí'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.manufacturer && <div>Hãng: {item.manufacturer}</div>}
                    {item.model && <div>Model: {item.model}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'operational'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'maintenance'
                          ? 'bg-yellow-100 text-yellow-700'
                          : item.status === 'repair'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {statusOptions.find((s) => s.value === item.status)?.label || 'Không xác định'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteEquipment(item._id)}
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
                  {editingEquipment ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}
                </h3>
                <p className="text-sm text-gray-500">
                  Nhập thông tin chi tiết để quản lý thiết bị
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên thiết bị *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại thiết bị *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="">Chọn loại thiết bị</option>
                    {categories
                      .filter((cat) => cat.value)
                      .map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hãng sản xuất</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số serial</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày mua</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hạn bảo hành</label>
                  <input
                    type="date"
                    name="warrantyExpiry"
                    value={formData.warrantyExpiry}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
                >
                  {statusOptions
                    .filter((status) => status.value)
                    .map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-center justify-end gap-3">
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
                  {editingEquipment ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}


