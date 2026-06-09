import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(18, 18, 18, 0.4)', 'rgba(18, 18, 18, 0.9)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(8px)', 'blur(20px)']
  );

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'LePort', href: '/leport' },
    { label: 'LeTech', href: '/letech' },
    { label: 'Services', href: '/services' },
    { label: 'Global Reach', href: '/global-reach' },
    { label: 'Contact', href: '/contact' },

  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <motion.div 
        style={{ 
          backgroundColor: navBackground, 
          borderColor: navBorder, 
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur
        }}
        className="border rounded-full px-6 py-3 flex items-center justify-between shadow-2xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
             <img src="/logo.png" alt="LeakQoara Logo" className="h-5 w-5 object-contain opacity-90" />
          </div>
          <span className="font-semibold text-white hidden lg:block">
            Leakqoara
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link href="/contact">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 text-sm font-semibold h-10">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl md:hidden">
          <div className="flex flex-col p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="p-2 mt-2 border-t border-white/10">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl font-semibold h-11">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
