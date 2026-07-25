import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield } from 'lucide-react';

export default function Divisions() {
  return (
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
            Our Core Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Skavelon Technologies delivers specialized solutions in enterprise security and modern application development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* App Development Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-effect p-8 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all duration-300 group border border-white/5 hover:border-orange-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110">
                <Globe className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">App Development</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
              Custom web and mobile applications engineered for scale, performance, and exceptional user experiences.
            </p>
            <ul className="space-y-2 mb-6 relative z-10">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Modern Web Apps
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Enterprise Software
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Cloud Integrations
              </li>
            </ul>
            <Link href="/app-development">
              <a className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-semibold relative z-10">
                Explore App Development <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </motion.div>

          {/* Cybersecurity Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-effect p-8 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all duration-300 group border border-white/5 hover:border-orange-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110">
                <Shield className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">Cybersecurity</h3>
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
            <Link href="/cybersecurity">
              <a className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-semibold relative z-10">
                Explore Cybersecurity <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
