'use client'

import Header from '@/components/Header'
import Slider from '@/components/Slider'
import Services from '@/components/Services'
import Doctors from '@/components/Doctors'
import ModernEquipment from '@/components/ModernEquipment'
import NewsEvents from '@/components/NewsEvents'
import InsurancePartners from '@/components/InsurancePartners'
import AppointmentForm from '@/components/AppointmentForm'
import QuestionForm from '@/components/QuestionForm'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Slider />
      <Services />
      <Doctors />
      <ModernEquipment />
      <NewsEvents />
      <InsurancePartners />
      <AppointmentForm />
      <QuestionForm />
      <Footer />
      <Chatbot />
    </main>
  )
}
