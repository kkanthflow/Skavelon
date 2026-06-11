import { motion } from 'framer-motion';
import { Globe, Shield, Zap } from 'lucide-react';

export default function ValueProp() {
  return (
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
  );
}
