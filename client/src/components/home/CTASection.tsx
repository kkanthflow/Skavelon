import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
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
          Connect with Skavelon Technologies today and unlock opportunities in global markets.
        </p>
        <Link href="/contact"><a>
            <Button className="cta-button flex items-center gap-2 mx-auto">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </a></Link>
      </div>
    </motion.section>
  );
}
