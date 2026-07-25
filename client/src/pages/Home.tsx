import { useEffect } from 'react';
import { Link } from 'wouter';
import { Globe } from 'lucide-react';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';
import Divisions from '@/components/home/Divisions';
import ValueProp from '@/components/home/ValueProp';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  useSEO({
    title: "Skavelon",
    description: "Skavelon Technologies empowers global commerce through integrated trade facilitation and advanced cybersecurity & IT solutions (Cybersecurity).",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Structured JSON-LD Schema for rich snippet results and crawlability
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Skavelon Technologies",
      "url": "https://leak-qoara.vercel.app/",
      "logo": "https://leak-qoara.vercel.app/logo-new.png",
      "description": "Skavelon Technologies empowers global commerce through integrated trade facilitation and advanced cybersecurity & IT solutions (Cybersecurity).",
      "sameAs": [
        "https://www.linkedin.com/in/leak-qoara-60bb0b414/",
        "https://x.com/Skavelon"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-6385582453",
        "contactType": "customer service",
        "email": "skavelontechnologies@gmail.com"
      }
    };

    const scriptId = "ld-json-schema";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(orgSchema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-0 md:pt-40 flex flex-col items-center justify-center overflow-hidden min-h-[90vh]">
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white mb-8 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 text-orange-500" />
            <span>Global Network</span>
          </div>

          <h1 
            className="text-5xl md:text-7xl font-bold text-white max-w-4xl tracking-tight leading-[1.1] mb-6"
          >
            A Global Ecosystem <br className="hidden md:block" />
            for Secure Digital Growth
          </h1>

          <p 
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12"
          >
            Connecting businesses worldwide through cybersecurity excellence, technology innovation, and intelligent logistics solutions.
          </p>
        </div>

        {/* Glowing Globe Container (Our "Own Video" Animation) */}
        <div className="relative w-full max-w-5xl mt-12 mb-12 animate-fade-in-up">
          {/* Pulsing Orange Glow Behind Globe - Restored on mobile using a high-performance radial gradient instead of a slow blur filter */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] mix-blend-screen pointer-events-none animate-pulse-glow" 
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0) 65%)' }}
          />
          
          <div className="animate-float-globe">
            <img
              src="/images/glowing_globe.webp"
              srcSet="/images/glowing_globe-small.webp 450w, /images/glowing_globe.webp 900w"
              sizes="(max-width: 640px) 450px, 900px"
              className="relative w-full h-auto object-contain z-10 mix-blend-screen"
              fetchPriority="high"
              decoding="sync"
              width="900"
              height="900"
              alt="Skavelon Global Trade and Cybersecurity Network"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Static Sections */}
      <Divisions />
      <ValueProp />
      <CTASection />
    </div>
  );
}
