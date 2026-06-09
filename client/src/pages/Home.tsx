import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Zap, Shield } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function Home() {
  useSEO({
    title: "LeakQoara",
    description: "Leakqoara Group empowers global commerce through integrated trade facilitation (LePort) and advanced cybersecurity & IT solutions (LeTech).",
  });
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-0 md:pt-40 flex flex-col items-center justify-center overflow-hidden min-h-[90vh]">
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white mb-8 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 text-orange-500" />
            <span>Global Network</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white max-w-4xl tracking-tight leading-[1.1] mb-6"
          >
            A truly global network <br className="hidden md:block" />
            for lightning-fast inference
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12"
          >
            Leakqoara global network consists of more than 160 locations, allowing you to reach your users anywhere in the world.
          </motion.p>
        </div>

        {/* Glowing Globe Container (Our "Own Video" Animation) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-5xl mt-12 mb-12"
        >
          {/* Pulsing Orange Glow Behind Globe */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/40 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          />
          
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/glowing_globe.png"
              className="relative w-full h-auto object-contain z-10 mix-blend-screen"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Divisions Overview */}
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
              Two Divisions. One Vision.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leakqoara Group operates through specialized divisions that work together to create seamless global commerce solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LePort Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect p-8 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all duration-300 group border border-white/5 hover:border-orange-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="mb-6 relative z-10">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110">
                  <Globe className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">LePort</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                Export & Global Trade Facilitation. Connect manufacturers with international buyers through comprehensive end-to-end export services.
              </p>
              <ul className="space-y-2 mb-6 relative z-10">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Documentation Support
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Buyer Sourcing
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Logistics Coordination
                </li>
              </ul>
              <Link href="/leport">
                <a className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-semibold relative z-10">
                  Explore LePort <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </motion.div>

            {/* LeTech Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect p-8 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all duration-300 group border border-white/5 hover:border-orange-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="mb-6 relative z-10">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">LeTech</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                Cybersecurity & IT Solutions. Fortify your enterprise with zero-trust architecture and intelligent threat detection.
              </p>
              <ul className="space-y-2 mb-6 relative z-10">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Data Loss Prevention (DLP)
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Zero-Trust Security
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Behavioral Threat Detection
                </li>
              </ul>
              <Link href="/letech">
                <a className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-semibold relative z-10">
                  Explore LeTech <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-card"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Leakqoara Group?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, innovation, and global reach to deliver exceptional value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Presence in East Asia with local expertise and established partnerships.',
              },
              {
                icon: Shield,
                title: 'Trusted Expertise',
                description: 'Deep knowledge of trade regulations, compliance, and market dynamics.',
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Technology-driven solutions that optimize operations and drive growth.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-xl p-8 border border-border hover:border-accent transition-all duration-300">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
        className="section-padding bg-gradient-to-r from-accent/20 via-[#0a0a0a] to-accent/10"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Go Global?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with Leakqoara Group today and unlock opportunities in global markets.
          </p>
          <Link href="/contact">
            <a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
