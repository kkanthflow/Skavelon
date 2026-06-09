import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with Leakqoara Group for inquiries regarding global export trade facilitation (LePort) or enterprise cybersecurity solutions (LeTech).",
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    divisionOfInterest: 'Both' as 'LePort' | 'LeTech' | 'Both',
    message: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const division = searchParams.get('division');
    if (division === 'LePort' || division === 'LeTech') {
      setFormData(prev => ({ ...prev, divisionOfInterest: division }));
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, divisionOfInterest: value as 'LePort' | 'LeTech' | 'Both' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const divisionMap = {
        'LePort': 'LePort - Export & Trade',
        'LeTech': 'LeTech - Cybersecurity & IT Solutions',
        'Both': 'Both Divisions'
      };

      const templateParams = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not Provided',
        divisionOfInterest: divisionMap[formData.divisionOfInterest],
        message: formData.message,
      };

      await Promise.all([
        // Send notification to admin
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams
        ),
        // Send auto-reply to user
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
          templateParams
        )
      ]);

      toast.success('Thank you for your inquiry! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        divisionOfInterest: 'Both' as 'LePort' | 'LeTech' | 'Both',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
      console.error('EmailJS submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-bold text-foreground"
                >
              Get in Touch
            </motion.h1>
            <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
              Have questions? Want to explore partnership opportunities? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#0a0a0a]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>
              </div>

              {[
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'leakqoara@gmail.com',
                  href: 'mailto:leakqoara@gmail.com',
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '6385582453',
                  href: 'tel:6385582453',
                },
                {
                  icon: MapPin,
                  title: 'Global Presence',
                  content: 'East Asia',
                  href: null,
                },
              ].map((item, index) => (
                <div key={index} className="glass-effect p-6 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-accent transition-all duration-300">
                          {item.content}
                        </a>
                      ) : (
                        <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-muted-foreground"
                >{item.content}</motion.p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Response Time */}
              <div className="glass-effect p-6 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                <p className="text-muted-foreground text-sm">
                  We typically respond to inquiries within 24-48 business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl space-y-6 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                <h3 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h3>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Division of Interest */}
                <div>
                  <label htmlFor="division" className="block text-sm font-semibold text-foreground mb-2">
                    Division of Interest *
                  </label>
                  <Select value={formData.divisionOfInterest} onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-[#0a0a0a] border-border text-foreground">
                      <SelectValue placeholder="Select a division" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] border-border">
                      <SelectItem value="LePort">LePort - Export & Trade</SelectItem>
                      <SelectItem value="LeTech">LeTech - Cybersecurity & IT Solutions</SelectItem>
                      <SelectItem value="Both">Both Divisions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#0a0a0a] border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * All fields are required
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#111]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'What is the best way to reach your team?',
                a: 'You can reach us through this contact form, email at leakqoara@gmail.com, or call us. We typically respond within 24-48 business hours.',
              },
              {
                q: 'Which division should I contact?',
                a: 'If you need export and trade services, contact LePort. For cybersecurity, zero-trust architecture, and IT solutions, reach out to LeTech. You can select "Both" if you\'re interested in integrated solutions.',
              },
              {
                q: 'Do you offer services in my region?',
                a: 'We have established presence in East Asia. Select your region in the contact form for region-specific support.',
              },
              {
                q: 'What is your typical response time?',
                a: 'We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3">{item.q}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
