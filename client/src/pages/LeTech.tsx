import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Eye, Activity, Server } from 'lucide-react';
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
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>
            <div className="relative hidden md:block aspect-[16/10] bg-muted/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl"></div>
              <img
                src="/images/letech_security.png"
                alt="LeTech Technology Solutions"
                width={600}
                height={375}
                loading="eager"
                className="relative rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inaugural Project Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#111] border-y border-border"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-2">
              Currently In Development
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              LeakGuard: Data Loss Prevention & Endpoint Security
            </h2>
            <div className="space-y-4 w-full">
              <p className="text-lg text-muted-foreground leading-relaxed text-left">
                LeTech's first project is currently under development and is called LeakGuard, a next-generation Data Loss Prevention (DLP) and endpoint security system designed for enterprise-grade protection of sensitive data.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-left">
                LeakGuard is being built as a cross-platform security solution that monitors, detects, and prevents unauthorized data transfer across systems, networks, and external devices. The system focuses on protecting critical business information by enforcing security policies, tracking user activity, and identifying potential data leakage risks in real time. It includes advanced capabilities such as endpoint monitoring, file access control, application activity tracking, and intelligent threat detection to ensure complete visibility and control over data movement within an organization.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-left">
                LeakGuard is designed to operate in a secure, scalable, and high-performance architecture, making it suitable for enterprise environments where data security and compliance are critical. This project represents the foundation of LeTech's vision to build powerful cybersecurity and enterprise protection solutions that safeguard digital assets and strengthen organizational security infrastructure.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

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
                Contact LeTech <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
