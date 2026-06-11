import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Users, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';

export default function GlobalReach() {
  useSEO({
    title: "Global Reach",
    description: "Explore the international trade strategy, buyer network corridors, and market presence of Leakqoara Group in East Asia.",
  });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      id: 'east-asia',
      name: 'East Asia',
      tagline: 'Primary Hub',
      description: 'Our core operational market focused on trade and technology.',
      focus: ['Trade Facilitation', 'Technology Innovation'],
      markets: ['Indonesia'],
      stats: { traders: '0', volume: '$0', growth: '0%' },
    }
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
              Global Reach
            </motion.h1>
            <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
              Strategic presence in East Asia, connecting markets and creating opportunities for sustainable global growth.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="section-padding bg-[#0a0a0a]"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 w-full flex justify-center rounded-2xl shadow-2xl relative">
            <img
              src="/images/global_reach_map.webp"
              alt="Global Reach Map"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Select a Region to Learn More
            </h2>
            <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  className="text-muted-foreground"
                >
              Click on any region below to explore our presence and services.
            </motion.p>
          </div>

          {/* Region Selector */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedRegion === region.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent'
                }`}
              >
                <h3 className="font-bold text-foreground mb-1">{region.name}</h3>
                <p className="text-xs text-muted-foreground">{region.tagline}</p>
              </button>
            ))}
          </div>

          {/* Region Details */}
          {selectedRegion && (
            <div className="glass-effect p-12 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-500">
              {regions.map((region) => {
                if (region.id !== selectedRegion) return null;

                return (
                  <div key={region.id} className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-2">{region.name}</h3>
                      <p className="text-accent font-semibold mb-4">{region.tagline}</p>
                      <p className="text-muted-foreground text-lg leading-relaxed">{region.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Focus Areas */}
                      <div className="bg-[#0a0a0a] rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-accent" />
                          Our Focus
                        </h4>
                        <ul className="space-y-2">
                          {region.focus.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Markets */}
                      <div className="bg-[#0a0a0a] rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-accent" />
                          Key Markets
                        </h4>
                        <ul className="space-y-2">
                          {region.markets.map((market, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                              {market}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Statistics */}
                      <div className="bg-[#0a0a0a] rounded-lg p-6 border border-border">
                        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          Statistics
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Active Traders</p>
                            <p className="text-lg font-bold text-accent">{region.stats.traders}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Trade Volume</p>
                            <p className="text-lg font-bold text-accent">{region.stats.volume}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                            <p className="text-lg font-bold text-accent">{region.stats.growth}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Global Statistics */}
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
              Global Presence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Global Regions', value: '1', icon: '🌍' },
              { label: 'Active Markets', value: '0', icon: '📍' },
              { label: 'Trade Partners', value: '0', icon: '🤝' },
              { label: 'Annual Income', value: '$0', icon: '💼' },
            ].map((stat, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-8 border border-border text-center hover:border-accent transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <p className="text-3xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-muted-foreground font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Expansion Strategy */}
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
              Our Expansion Strategy
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Phased approach to building global presence and market leadership.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                phase: 'Phase 1',
                period: '2026',
                title: 'Foundation',
                description: 'Establish East Asia hub and launch core services.',
                regions: ['East Asia'],
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent mb-4">
                    <span className="font-bold text-accent">{index + 1}</span>
                  </div>
                  {index < 3 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-accent to-transparent"></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-accent font-bold text-sm mb-1">{item.period}</p>
                  <h4 className="text-2xl font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.regions.map((region, i) => (
                      <span key={i} className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                        {region}
                      </span>
                    ))}
                  </div>
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
            Connect with Our Global Network
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore partnership opportunities and access markets in East Asia.
          </p>
          <Link href="/contact">
            <a>
              <Button className="cta-button flex items-center gap-2 mx-auto">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
