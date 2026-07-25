import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function About() {
  useSEO({
    title: "About Us",
    description: "Learn more about Skavelon Technologies, our core values, and mission.",
  });
  const values = [
    { icon: Heart, title: 'Integrity', description: 'Transparent operations and ethical partnerships across all dealings.' },
    { icon: Target, title: 'Reliability', description: 'Consistent delivery and dependable execution of commitments.' },
    { icon: Eye, title: 'Excellence', description: 'Pursuit of highest standards in service quality and expertise.' },
  ];

  const timeline = [
    { year: '2026', milestone: 'Foundation & Market Entry', description: 'Establish East Asia hub and launch core services.' },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="text-5xl md:text-6xl font-bold text-foreground"
                >
              About Skavelon Technologies
            </motion.h1>
            <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
              A diversified global business group engineered to operate as a unified multi-vertical ecosystem that integrates international trade, logistics support, and digital transformation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#0a0a0a]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="glass-effect p-8 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-muted-foreground leading-relaxed"
                >
                To connect industries, enable innovation, and power global growth through efficient and transparent business operations that bridge continents, cultures, and commerce.
              </motion.p>
            </div>

            {/* Mission */}
            <div className="glass-effect p-8 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building a scalable and sustainable global business ecosystem that integrates trade facilitation, logistics excellence, and digital transformation. We empower manufacturers, suppliers, and enterprises to access international markets with confidence.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guiding principles that define how we operate and serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', description: 'Transparent operations, ethical practices, and honest partnerships.' },
              { title: 'Reliability', description: 'Consistent delivery, dependable service, and trustworthy execution.' },
              { title: 'Efficiency', description: 'Streamlined processes and elimination of unnecessary friction.' },
              { title: 'Excellence', description: 'Pursuit of highest standards in service quality and expertise.' },
              { title: 'Innovation', description: 'Continuous improvement through technology and creative solutions.' },
              { title: 'Sustainability', description: 'Long-term value creation with social and environmental responsibility.' },
            ].map((value, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-8 border border-border hover:border-accent transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Strategic Timeline */}
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
              Our Growth Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Strategic milestones as we expand globally.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent mb-4">
                    <div className="w-4 h-4 rounded-full bg-accent"></div>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-accent to-transparent"></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-accent font-bold text-sm mb-1">{item.year}</p>
                  <h4 className="text-xl font-bold text-foreground mb-2">{item.milestone}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Certifications */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#111]"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Certifications
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We operate with the highest standards and global compliance.
          </p>
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="w-full border border-white/10 rounded-xl overflow-hidden shadow-2xl bg-black/50 p-2 md:p-4 mb-6">
              <iframe 
                src="/certificate.pdf#toolbar=0" 
                className="w-full h-[500px] md:h-[800px] rounded-lg bg-white"
                title="Skavelon Company Certificate"
              />
            </div>
            <a href="/certificate.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> Open Full Screen
              </Button>
            </a>
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
            Join Our Global Network
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partner with Skavelon Technologies to access international markets and drive sustainable growth.
          </p>
          <Link href="/contact"><a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </a></Link>
        </div>
      </motion.section>
    </div>
  );
}
