import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Apple, Palette, Layers, ShieldCheck, Wrench, Briefcase, BarChart, Users, Database } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function AppDevelopment() {
  useSEO({
    title: "App Development - Skavelon Technologies",
    description: "Innovative mobile and cross-platform applications crafted to power digital transformation.",
  });

  const appServices = [
    {
      icon: Smartphone,
      title: 'Android App Development',
      description: 'Building custom, high-performance native Android applications designed for optimal user experience.',
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

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="text-5xl md:text-6xl font-bold text-foreground"
              >
                App Development
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                Innovative mobile and cross-platform applications crafted to power digital transformation.
              </motion.p>
              <Link href="/contact?division=AppDevelopment"><a>
                  <Button className="cta-button flex items-center gap-2">
                    Request a Quote <ArrowRight className="w-4 h-4" />
                  </Button>
                </a></Link>
            </div>
            <div className="relative hidden md:block aspect-[16/10] bg-muted/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl"></div>
              <img
                src="/images/app_development_hero.png"
                alt="App Development Solutions"
                width={600}
                height={375}
                loading="lazy"
                className="relative rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inaugural Project Section (Coreflow Product Feature) */}
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
              Coreflow: <span className="text-[#D85A30]">Business Management</span> & Workflow Engine
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              A comprehensive business management system designed to streamline operational workflows, automate resource planning, and provide real-time data insights for enterprise growth.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: ShieldCheck,
                title: "Security & Auth Management",
                desc: "Enterprise-grade authentication, role-based access control (RBAC), and secure session management."
              },
              {
                icon: Briefcase,
                title: "Operations & Resource Planning",
                desc: "Centralize your business operations with intelligent resource allocation and workflow tracking."
              },
              {
                icon: Database,
                title: "Data Centralization",
                desc: "Unify your company's critical data into a secure, single source of truth accessible anywhere."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Empower cross-functional teams with integrated communication and task management tools."
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
              "Streamlined Operations",
              "Data-Driven Decisions",
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

      {/* App Development Services */}
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
              Our Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delivering innovative mobile solutions through expert development, intuitive design, and reliable support.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {appServices.map((service, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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
            Ready to Build Your App?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's turn your vision into a robust, scalable mobile application.
          </p>
          <Link href="/contact?division=AppDevelopment"><a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </a></Link>
        </div>
      </motion.section>
    </div>
  );
}
