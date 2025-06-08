// src/components/Contact.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ContactSection() {
  const t = useTranslations('Contact')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const offices = [
    {
      city: t('offices.frisco.city'),
      address: t('offices.frisco.address'),
      address2: t('offices.frisco.address2'),
      phone: "+1 (469) 202-4610"
    },
    {
      city: t('offices.saoPaulo.city'),
      address: t('offices.saoPaulo.address'),
      address2: t('offices.saoPaulo.address2'),
      address3: t('offices.saoPaulo.address3'),
      phone: null
    },
    {
      city: t('offices.saoJoao.city'),
      address: t('offices.saoJoao.address'),
      address2: t('offices.saoJoao.address2'),
      address3: t('offices.saoJoao.address3'),
      phone: "+55 19 3633-1624",
      phone2: "+55 19 3631-7848"
    }
  ]

  return (
    <section className="bg-blue-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-80">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              `url('/patterns/map-1.webp')`
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side - Office Locations */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col gap-6 h-full">
              {offices.map((office, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 flex-1">
                  <CardContent className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {office.city}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                        <div className="text-white text-sm leading-relaxed">
                          <div>{office.address}</div>
                          <div>{office.address2}</div>
                          {office.address3 && <div>{office.address3}</div>}
                        </div>
                      </div>

                      {office.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                          <div className="text-white text-sm font-bold leading-relaxed">
                            <div>{office.phone}</div>
                            {office.phone2 && <div>{office.phone2}</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex flex-col h-full lg:sticky lg:top-8">
            <Card className="bg-background shadow-2xl flex-1 flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-accent-foreground mb-2">{t('form.title')}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('form.description')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder={t('form.placeholders.name')}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder={t('form.placeholders.email')}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Select name="subject" onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger
                        id="contact-subject"
                        className="h-12 w-full border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <SelectValue placeholder={t('form.placeholders.subject')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orcamento">{t('form.subjects.quote')}</SelectItem>
                        <SelectItem value="ouvidoria">{t('form.subjects.ombudsman')}</SelectItem>
                        <SelectItem value="privacidade">{t('form.subjects.privacy')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder={t('form.placeholders.message')}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="flex-1 min-h-[120px] border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 resize-none"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors duration-200 cursor-pointer mt-auto"
                  >
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}