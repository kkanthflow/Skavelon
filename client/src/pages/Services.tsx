import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Truck, Shield, Lock, Eye, Smartphone, Apple, Palette, Wrench } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function Services() {
  useSEO({
    title: "Our Services",
    description: "Discover the comprehensive IT and advanced cybersecurity solutions (Cybersecurity) offered by Skavelon Technologies.",
  });

  const cybersecurityServices = [
    {
      icon: Shield,
      title: 'LeakGuard DLP',
      description: 'Enterprise-grade protection of sensitive data across systems and networks.',
      features: ['Real-time Monitoring', 'Transfer Prevention', 'Encryption Protocols', 'Access Control Policies'],
    },
    {
      icon: Eye,
      title: 'Endpoint Protection',
      description: 'Real-time visibility and control over data movement and device interactions.',
      features: ['Device Activity Tracking', 'Removable Media Control', 'Threat Monitoring', 'Ransomware Defense'],
    },
    {
      icon: Lock,
      title: 'Zero-Trust Architecture',
      description: 'Continuous verification and strict access controls for all digital assets.',
      features: ['Continuous Authentication', 'Intrusion Detection', 'Secure Communications', 'Traffic Anomaly Analysis'],
    },
  ];

  const appServices = [
    {
      icon: Smartphone,
      title: 'Android App Development',
      description: 'Build high-performance Android applications with modern technologies and optimized performance.',
    },
    {
      icon: Apple,
      title: 'iOS App Development',
      description: 'Create secure and intuitive iPhone and iPad applications with premium user experiences.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Design visually appealing, user-centric interfaces that improve usability and customer satisfaction.',
    },
    {
      icon: Wrench,
      title: 'App Maintenance & Support',
      description: 'Provide continuous updates, bug fixes, performance optimization, security enhancements, and long-term support.',
    },
  ];

  const industries = [
    { name: 'Finance & Banking', icon: '🏦' },
    { name: 'Healthcare & Medical', icon: '🏥' },
    { name: 'Retail & E-commerce', icon: '🛍️' },
    { name: 'Education & EdTech', icon: '🎓' },
    { name: 'Enterprise Software', icon: '🏢' },
    { name: 'Technology & Startups', icon: '💻' },
  ];

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
              Our Services
            </motion.h1>
            <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
              Comprehensive solutions across trade facilitation and technology, designed to accelerate your global growth.
            </motion.p>
          </div>
        </div>
      </section>


      {/* Cybersecurity Services */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#111]"
      >
        <div className="container mx-auto px-4">
          {/* Cybersecurity Subsection */}
          <div>
            <div className="mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                  Cybersecurity Services
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cybersecurity & IT Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Digital security innovation and enterprise protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cybersecurityServices.map((service, index) => (
                <div key={index} className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                  <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/cybersecurity">
                <a>
                  <Button variant="outline" className="flex items-center gap-2 mx-auto">
                    Explore Cybersecurity <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>

          {/* App Development Subsection */}
          <div className="mt-24 pt-24 border-t border-white/5">
            <div className="mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                  App Development
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Building Innovative Mobile Applications for the Future
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Delivering innovative mobile solutions through expert development, intuitive design, and reliable support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {appServices.map((service, index) => (
                <div key={index} className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                  <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact"><a>
                  <Button variant="outline" className="flex items-center gap-2 mx-auto">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </a></Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Industries */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#0a0a0a]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized expertise across diverse sectors and markets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="glass-effect p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="font-semibold text-foreground">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Service Delivery */}
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
              Our Approach
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Client-centric delivery focused on measurable results and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', description: 'Understand your needs and objectives' },
              { step: '2', title: 'Strategy', description: 'Develop customized solutions' },
              { step: '3', title: 'Implementation', description: 'Execute with precision and care' },
              { step: '4', title: 'Support', description: 'Ongoing optimization and growth' },
            ].map((item, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-6 border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-accent">{item.step}</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-gradient-to-r from-accent/20 via-background to-accent/10"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how Skavelon Technologies can help you achieve your goals.
          </p>
          <Link href="/contact"><a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
            </a></Link>
        </div>
      </motion.section>
    </div>
  );
}
