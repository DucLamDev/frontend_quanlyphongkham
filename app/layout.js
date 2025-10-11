import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Phòng Khám Đa Khoa Minh Giang - Tỉnh Điện Biên',
  description: 'Phòng khám đa khoa ứng dụng kĩ thuật cao đầu tiên tại thành phố Điện Biên Phủ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
