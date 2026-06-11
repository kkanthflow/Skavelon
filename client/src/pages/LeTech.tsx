import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Eye, Activity, Server, Code, Globe, XCircle, Monitor, FileKey, Terminal, Brain, Smartphone, Apple, Palette, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function LeTech() {
  useSEO({
    title: "LeTech - Cybersecurity & IT",
    description: "Safeguard your digital assets, enforce zero-trust security, and ensure enterprise compliance with next-generation threat detection and data loss prevention systems like LeakGuard.",
  });
  const services = [
    {
      icon: Shield,
      title: 'Data Loss Prevention (DLP)',
      description: 'Enterprise-grade protection of sensitive data across systems and networks.',
    },
    {
      icon: Eye,
      title: 'Endpoint & Network Monitoring',
      description: 'Real-time visibility and control over data movement and device interactions.',
    },
    {
      icon: Lock,
      title: 'Zero-Trust Architecture',
      description: 'Continuous verification and strict access controls for all digital assets.',
    },
    {
      icon: Activity,
      title: 'Behavioral Threat Detection',
      description: 'AI-driven anomaly monitoring to identify and neutralize internal and external risks.',
    },
    {
      icon: Server,
      title: 'Scalable Security Infrastructure',
      description: 'High-performance, compliance-ready enterprise security environments.',
    },
    {
      icon: Code,
      title: 'Freelancing & Custom Dev',
      description: 'Full-stack web application development, tailor-made software solutions, and freelance technical consulting.',
    },
    {
      icon: Globe,
      title: 'Website Creation & Hosting',
      description: 'Professional website design, deployment, domain setup, and secure managed cloud hosting infrastructure.',
    },
    {
      icon: XCircle,
      title: 'No Digital Marketing',
      description: 'Note: We focus purely on engineering, cybersecurity, and hosting. We do NOT provide digital marketing or social media promo services.',
    },
  ];

  const appServices = [
    {
      icon: Smartphone,
      title: 'Android App Development',
      description: 'Building custom, high-performance native Android applications designed for optimal user experience.',
    },
    {
      icon: Apple,
      title: 'iOS App Development',
      description: 'Crafting elegant and secure native iOS applications tailored for Apple device ecosystems.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive user interfaces and experiences with modern aesthetics and research-driven workflows.',
    },
    {
      icon: Layers,
      title: 'Cross-Platform Development',
      description: 'Creating versatile applications that operate seamlessly across multiple platforms using unified codebases.',
    },
    {
      icon: ShieldCheck,
      title: 'App Security & Compliance',
      description: 'Enforcing robust data protection, secure authentication, and compliance with industry standards.',
    },
    {
      icon: Wrench,
      title: 'App Maintenance & Support',
      description: 'Providing continuous monitoring, performance optimization, and updates to ensure perpetual reliability.',
    },
  ];

  const industries = [
    {
      name: 'Data Security & Privacy',
      solutions: ['Real-time Data Monitoring', 'Unauthorized Transfer Prevention', 'Encryption Protocols', 'Access Control Policies'],
    },
    {
      name: 'Endpoint Protection',
      solutions: ['Device Activity Tracking', 'Removable Media Control', 'Application Threat Monitoring', 'Ransomware Defense'],
    },
    {
      name: 'Enterprise Compliance',
      solutions: ['Regulatory Readiness (GDPR, HIPAA)', 'Audit Trails & Reporting', 'Security Policy Enforcement', 'Data Classification'],
    },
    {
      name: 'Network Security',
      solutions: ['Zero-Trust Architecture', 'Intrusion Detection Systems', 'Secure Communication Channels', 'Traffic Anomaly Analysis'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-bold text-foreground"
                >
                  LeTech
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-2xl text-accent font-semibold"
                >
                  Cybersecurity & IT Solutions
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
                  Safeguard your digital assets, enforce zero-trust security, and ensure enterprise compliance with next-generation threat detection and data loss prevention systems.
                </motion.p>
              </div>
              <Link href="/contact?division=LeTech">
                <a>
                  <Button className="cta-button flex items-center gap-2">
                    Request Demo <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>
            <div className="relative hidden md:block aspect-[16/10] bg-muted/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl"></div>
              <img
                src="/images/letech_security.webp"
                alt="LeTech Technology Solutions"
                width={600}
                height={375}
                loading="lazy"
                className="relative rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inaugural Project Section (LeakGuard Product Feature) */}
      <section className="py-24 bg-[#0d0d0d] border-y border-white/5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D85A30]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center mb-16 space-y-6">
            {/* Pulsing Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D85A30]/10 border border-[#D85A30]/20 text-xs font-semibold text-[#D85A30] shadow-[0_0_15px_rgba(216,90,48,0.1)]">
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D85A30] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D85A30]"></span>
              </span>
              Currently In Development
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl leading-tight font-serif">
              LeakGuard: <span className="text-[#D85A30]">Data Loss Prevention</span> & Endpoint Security
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              A next-generation cybersecurity framework designed to protect critical assets, prevent unauthorized data transfers, and enforce comprehensive enterprise compliance in real time.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: Monitor,
                title: "Endpoint Monitoring",
                desc: "Real-time visibility into local processes, hardware interfaces, and active system operations."
              },
              {
                icon: FileKey,
                title: "File Access Control",
                desc: "Granular authorization rules regulating read, write, and network transfer operations on sensitive data."
              },
              {
                icon: Terminal,
                title: "App Activity Tracking",
                desc: "Detailed tracing of background processes and third-party software communication behaviors."
              },
              {
                icon: Brain,
                title: "Intelligent Threat Detection",
                desc: "Machine learning models designed to analyze file interaction patterns and identify potential leak vectors."
              }
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.215, 0.610, 0.355, 1.000] }}
                  className="group relative bg-[#1a1a1a]/40 border border-white/5 rounded-xl p-8 hover:border-[#D85A30]/30 hover:shadow-[0_0_35px_rgba(216,90,48,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#D85A30]/10 rounded-lg flex items-center justify-center border border-[#D85A30]/20 text-[#D85A30] group-hover:bg-[#D85A30]/20 transition-colors shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#D85A30] transition-colors">{card.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stat Chips */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 py-8 border-t border-white/5">
            {[
              "360° Data Visibility",
              "Cross-Platform Support",
              "Enterprise Scale"
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-6">
                <span className="text-white font-medium tracking-wide text-sm md:text-base">{stat}</span>
                {index < 2 && <div className="hidden md:block w-[1px] h-6 bg-white/10"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
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
              Cybersecurity & IT Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security infrastructure for modern, high-trust enterprises.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* App Development Section */}
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
              App Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative mobile and cross-platform applications crafted to power digital transformation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {appServices.map((service, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Industry Applications */}
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
              Enterprise Security Applications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized protection modules tailored for your critical security needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-8 border border-border hover:border-accent transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-6">{industry.name}</h3>
                <ul className="space-y-3">
                  {industry.solutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Value Proposition */}
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
              Trust, Security, and Innovation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Zero-Trust Framework', description: 'Enforcing continuous authentication and strict access controls across all vectors.' },
              { title: 'Real-Time Protection', description: 'Proactive behavioral threat detection and instantaneous data loss prevention.' },
              { title: 'Enterprise Scalability', description: 'High-performance infrastructure designed to grow securely with your operational complexity.' },
              { title: 'Compliance Readiness', description: 'Built-in audit trails and policy enforcement to meet rigorous global regulatory standards.' },
              { title: 'Advanced Cryptography', description: 'State-of-the-art encryption protocols securing data at rest and in transit.' },
              { title: 'Security Leadership', description: 'A dedicated team of cybersecurity experts providing continuous implementation and technical support.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
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
            Secure Your Digital Future
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let LeTech fortify your organizational security infrastructure and safeguard your critical assets.
          </p>
          <Link href="/contact?division=LeTech">
            <a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Request Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
