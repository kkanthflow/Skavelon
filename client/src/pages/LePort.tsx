import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Truck, CheckCircle, Globe } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function LePort() {
  useSEO({
    title: "LePort - Export & Global Trade",
    description: "Connect manufacturers, suppliers, and producers with international buyers through comprehensive end-to-end export facilitation and logistics coordination services.",
  });
  const services = [
    {
      icon: FileText,
      title: 'Documentation Support',
      description: 'Export documentation, customs clearance, trade compliance, and certificate management.',
    },
    {
      icon: Users,
      title: 'Buyer Sourcing',
      description: 'Market intelligence, buyer identification, and trade matching services.',
    },
    {
      icon: Truck,
      title: 'Freight Coordination',
      description: 'Sea freight, air freight, consolidation, and last-mile delivery solutions.',
    },
    {
      icon: CheckCircle,
      title: 'Customs Clearance',
      description: 'Expedited clearance, duty optimization, and border compliance management.',
    },
    {
      icon: Globe,
      title: 'Global Trade Consulting',
      description: 'Market analysis, trade strategy, and partnership development support.',
    },
  ];

  const industries = [
    {
      name: 'Agriculture & Agribusiness',
      description: 'Fresh produce, grains, spices, and processed agricultural goods.',
      markets: ['East Asia'],
    },
    {
      name: 'Textiles & Apparel',
      description: 'Fabrics, garments, textile components, and home textiles.',
      markets: ['East Asia'],
    },
    {
      name: 'Handicrafts & Artisanal Goods',
      description: 'Traditional crafts, home décor, and cultural products.',
      markets: ['East Asia'],
    },
    {
      name: 'Industrial Goods',
      description: 'Machinery components, equipment, and manufactured goods.',
      markets: ['East Asia'],
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
                  LePort
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-2xl text-accent font-semibold"
                >
                  Export & Global Trade Facilitation
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
                  Connect manufacturers, suppliers, and producers with international buyers through comprehensive end-to-end export facilitation services.
                </motion.p>
              </div>
              <Link href="/contact?division=LePort">
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
                src="/images/leport_export.png"
                alt="LePort Export Services"
                width={600}
                height={375}
                loading="eager"
                className="relative rounded-2xl w-full h-full object-cover"
              />
            </div>
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
              Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions covering every aspect of international trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
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

      {/* Industry Verticals */}
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
              Industry Specialization
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across key sectors and markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-8 border border-border hover:border-accent transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-3">{industry.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{industry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {industry.markets.map((market, i) => (
                    <span key={i} className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                      {market}
                    </span>
                  ))}
                </div>
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
              Why LePort?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Accessibility', description: 'Removes barriers to international trade for SMEs and emerging exporters.' },
              { title: 'Expertise', description: 'Deep knowledge of trade regulations, customs, and market dynamics.' },
              { title: 'Efficiency', description: 'Streamlined processes reduce time-to-market and complexity.' },
              { title: 'Network', description: 'Access to established buyer networks and logistics partners.' },
              { title: 'Risk Mitigation', description: 'Comprehensive compliance and regulatory support.' },
              { title: 'Cost Optimization', description: 'Negotiated rates and optimized logistics reduce costs.' },
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
            Ready to Expand Globally?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let LePort help you connect with international markets and scale your export business.
          </p>
          <Link href="/contact?division=LePort">
            <a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Contact LePort <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
