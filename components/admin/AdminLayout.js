'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Activity,
  Calendar,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Stethoscope,
  UserCheck,
  Users,
  X
} from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Lịch hẹn', href: '/admin/appointments' },
  { icon: Users, label: 'Bệnh nhân', href: '/admin/patients' },
  { icon: Stethoscope, label: 'Bác sĩ', href: '/admin/doctors' },
  { icon: Activity, label: 'Thiết bị', href: '/admin/equipment' },
  { icon: MessageSquare, label: 'Tin nhắn', href: '/admin/messages' },
  { icon: Activity, label: 'Phân tích', href: '/admin/analytics' }
]

export default function AdminLayout({ title, description, children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [adminData, setAdminData] = useState(null)

  useEffect(() => {
    const storedAdmin = typeof window !== 'undefined' ? localStorage.getItem('adminData') : null
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 w-64`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-1">Phòng Khám Minh Giang</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <UserCheck size={20} className="text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{adminData?.fullName || 'Administrator'}</p>
                <p className="text-xs text-gray-500">{adminData?.role || 'admin'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}


