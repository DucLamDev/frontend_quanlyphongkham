'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, Clock, DollarSign, Briefcase, Heart, Award, Send, FileText, Calendar } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Recruitment() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    cv: null
  })

  const handleInputChange = (e) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Application submitted:', applicationForm)
  }

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Lương Cạnh Tranh',
      description: 'Mức lương hấp dẫn phù hợp với năng lực và kinh nghiệm'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Cơ Hội Phát Triển',
      description: 'Đào tạo chuyên sâu và cơ hội thăng tiến trong nghề nghiệp'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Bảo Hiểm Đầy Đủ',
      description: 'Bảo hiểm y tế, xã hội và các chế độ phúc lợi khác'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Môi Trường Làm Việc',
      description: 'Môi trường chuyên nghiệp, thân thiện và năng động'
    }
  ]

  const jobOpenings = [
    {
      id: 1,
      title: 'Bác Sĩ Nội Khoa',
      department: 'Khoa Nội',
      location: 'Điện Biên Phủ',
      type: 'Toàn thời gian',
      experience: '3-5 năm',
      salary: '15-25 triệu',
      description: 'Tìm kiếm bác sĩ nội khoa có kinh nghiệm, chuyên về khám và điều trị các bệnh nội khoa tổng hợp.',
      requirements: [
        'Tốt nghiệp Đại học Y khoa',
        'Có chứng chỉ hành nghề',
        'Kinh nghiệm 3-5 năm trong lĩnh vực nội khoa',
        'Kỹ năng giao tiếp tốt',
        'Có tinh thần trách nhiệm cao'
      ],
      responsibilities: [
        'Khám và chẩn đoán bệnh cho bệnh nhân',
        'Điều trị các bệnh nội khoa',
        'Tư vấn sức khỏe cho bệnh nhân',
        'Phối hợp với các khoa khác trong điều trị'
      ]
    },
    {
      id: 2,
      title: 'Y Tá Điều Dưỡng',
      department: 'Điều dưỡng',
      location: 'Điện Biên Phủ',
      type: 'Toàn thời gian',
      experience: '1-3 năm',
      salary: '8-12 triệu',
      description: 'Tuyển y tá điều dưỡng có kinh nghiệm, chăm sóc bệnh nhân và hỗ trợ bác sĩ trong quá trình điều trị.',
      requirements: [
        'Tốt nghiệp Trung cấp/Cao đẳng Điều dưỡng',
        'Có chứng chỉ hành nghề',
        'Kinh nghiệm 1-3 năm',
        'Kỹ năng chăm sóc bệnh nhân tốt',
        'Có tinh thần đồng đội'
      ],
      responsibilities: [
        'Chăm sóc bệnh nhân theo y lệnh',
        'Hỗ trợ bác sĩ trong quá trình khám chữa bệnh',
        'Theo dõi tình trạng sức khỏe bệnh nhân',
        'Hướng dẫn bệnh nhân về chế độ ăn uống, sinh hoạt'
      ]
    },
    {
      id: 3,
      title: 'Kỹ Thuật Viên Xét Nghiệm',
      department: 'Khoa Xét nghiệm',
      location: 'Điện Biên Phủ',
      type: 'Toàn thời gian',
      experience: '2-4 năm',
      salary: '10-15 triệu',
      description: 'Tuyển kỹ thuật viên xét nghiệm có kinh nghiệm, thực hiện các xét nghiệm cận lâm sàng.',
      requirements: [
        'Tốt nghiệp Đại học/Cao đẳng Kỹ thuật Y học',
        'Có chứng chỉ hành nghề',
        'Kinh nghiệm 2-4 năm trong lĩnh vực xét nghiệm',
        'Thành thạo các thiết bị xét nghiệm hiện đại',
        'Có tinh thần cẩn thận, tỉ mỉ'
      ],
      responsibilities: [
        'Thực hiện các xét nghiệm cận lâm sàng',
        'Vận hành và bảo trì thiết bị xét nghiệm',
        'Phân tích và báo cáo kết quả xét nghiệm',
        'Đảm bảo chất lượng và an toàn trong xét nghiệm'
      ]
    },
    {
      id: 4,
      title: 'Lễ Tân Y Tế',
      department: 'Lễ tân',
      location: 'Điện Biên Phủ',
      type: 'Toàn thời gian',
      experience: '0-2 năm',
      salary: '6-10 triệu',
      description: 'Tuyển lễ tân y tế, đón tiếp và hướng dẫn bệnh nhân, quản lý lịch hẹn khám.',
      requirements: [
        'Tốt nghiệp Trung cấp trở lên',
        'Kỹ năng giao tiếp tốt',
        'Thành thạo vi tính văn phòng',
        'Ngoại hình ưa nhìn',
        'Có kinh nghiệm lễ tân là một lợi thế'
      ],
      responsibilities: [
        'Đón tiếp và hướng dẫn bệnh nhân',
        'Quản lý lịch hẹn khám',
        'Hỗ trợ bệnh nhân làm thủ tục',
        'Tư vấn thông tin dịch vụ'
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">Tuyển Dụng</span> Nhân Sự
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Tham gia đội ngũ chuyên nghiệp của Phòng Khám Minh Giang. 
              Chúng tôi tìm kiếm những tài năng tâm huyết với nghề y.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#jobs"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Briefcase size={20} />
                Xem Vị Trí Tuyển Dụng
              </a>
              <a
                href="#benefits"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Award size={20} />
                Quyền Lợi
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quyền Lợi Dành Cho Nhân Viên
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến môi trường làm việc tốt nhất và quyền lợi hấp dẫn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="text-primary-600 mb-6 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="jobs" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vị Trí Đang Tuyển Dụng
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các cơ hội nghề nghiệp hấp dẫn tại Phòng Khám Minh Giang
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-primary-600 font-semibold">{job.department}</p>
                    </div>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {job.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-primary-500" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-primary-500" />
                      <span className="text-sm">{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign size={16} className="text-primary-500" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase size={16} className="text-primary-500" />
                      <span className="text-sm">{job.department}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Xem Chi Tiết
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      Ứng Tuyển
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                  <p className="text-primary-600 font-semibold text-lg">{selectedJob.department}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-500">Địa điểm</p>
                    <p className="font-semibold">{selectedJob.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-500">Kinh nghiệm</p>
                    <p className="font-semibold">{selectedJob.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-primary-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mức lương</p>
                    <p className="font-semibold">{selectedJob.salary}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả công việc</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Yêu cầu</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Trách nhiệm</h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Ứng Tuyển Ngay
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Đơn Ứng Tuyển
              </h2>
              <p className="text-lg text-gray-600">
                Điền thông tin vào form bên dưới để ứng tuyển vào vị trí mong muốn
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={applicationForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Nhập email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vị trí ứng tuyển *
                    </label>
                    <select
                      name="position"
                      value={applicationForm.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Chọn vị trí</option>
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kinh nghiệm làm việc *
                  </label>
                  <textarea
                    name="experience"
                    value={applicationForm.experience}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Mô tả kinh nghiệm làm việc của bạn..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CV/Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Kéo thả file CV vào đây hoặc</p>
                    <button
                      type="button"
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Chọn file từ máy tính
                    </button>
                    <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX (Tối đa 10MB)</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Gửi Đơn Ứng Tuyển
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tham Gia Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cùng chúng tôi xây dựng tương lai y tế tốt đẹp hơn cho cộng đồng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#jobs"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Briefcase size={20} />
                Xem Vị Trí Tuyển Dụng
              </a>
              <a
                href="tel:0378456839"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-400 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Users size={20} />
                Gọi: 037 845 6839
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
