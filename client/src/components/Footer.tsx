import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-orange-500/30 overflow-hidden">
                <img src="/logo.webp" alt="LeakQoara Logo" className="h-full w-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-foreground">Leakqoara Group</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting markets. Building tomorrow. Empowering global growth through integrated trade and technology solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'LePort', href: '/leport' },
                { label: 'LeTech', href: '/letech' },
                { label: 'Services', href: '/services' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Export Facilitation',
                'Cybersecurity & IT Solutions',
                'Logistics Support',
                'Market Intelligence',
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <a href="mailto:leakqoara@gmail.com" className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm">
                  leakqoara@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <a href="tel:6385582453" className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm">
                  6385582453
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">Global Presence</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Leakqoara Group of Companies. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/leak-qoara-60bb0b414/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/LeakQoara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link href="/privacy">
              <a className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm">
                Privacy Policy
              </a>
            </Link>
            <span className="text-border">|</span>
            <Link href="/terms">
              <a className="text-muted-foreground hover:text-accent transition-all duration-300 text-sm">
                Terms of Service
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
