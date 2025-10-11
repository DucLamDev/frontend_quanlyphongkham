'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap, Heart } from 'lucide-react'
import Image from 'next/image'

const Doctors = () => {
  const doctors = [
    {
      name: 'BS. Nguyễn Trung Chính',
      title: 'PGS. TS.BS',
      specialty: 'Giám đốc chuyên môn Bệnh viện Đa Khoa Phương Đông',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/thumbs/350x0/bs-nguyen-trung-chinh_4.png',
      experience: '30+ năm',
    },
    {
      name: 'BS. Hàn Văn Ba',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nội',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/thumbs/350x0/bs-han-van-ba_2.png',
      experience: '15+ năm',
    },
    {
      name: 'BS. Trần Đình Hà',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nội',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/tran-dinh-ha/tran-dinh-ha.png',
      experience: '12+ năm',
    },
    {
      name: 'BS. Đồng Khắc Hùng',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Nhi',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/bs-dong-khac-hung.png',
      experience: '10+ năm',
    },
    {
      name: 'BS. Phạm Minh Thông',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Răng Hàm Mặt',
      image: 'https://benhvienphuongdong.vn/public/uploads/doi-ngu-bac-si/bs-pham-minh-thong.png',
      experience: '8+ năm',
    },
    {
      name: 'BS. Trưởng Khoa Khám Bệnh',
      title: 'Bác sĩ',
      specialty: 'Chuyên khoa Đa khoa',
      image: 'https://benhvienphuongdong.vn/public/uploads/2023/thang-9/thong-tin-bac-si/thumbs/350x0/bs-truong-khoa-kham-benh-nen-trong-suot_2.png',
      experience: '10+ năm',
    },
  ]

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đội Ngũ Bác Sĩ Chuyên Gia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo bài bản, tận tâm với nghề
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 card-hover"
            >
              {/* Doctor Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-center">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={320}
                    className="object-contain object-bottom h-full w-auto"
                    unoptimized
                  />
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600 shadow-md">
                  {doctor.experience}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-3">
                  {doctor.title}
                </p>
                <p className="text-gray-600 mb-4 flex items-start gap-2">
                  <GraduationCap size={18} className="text-primary-500 mt-1 flex-shrink-0" />
                  <span>{doctor.specialty}</span>
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Award size={16} className="text-primary-500" />
                    <span className="text-sm">Chuyên gia</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-sm">Tận tâm</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#appointment"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Đặt Lịch Khám Ngay
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Doctors
