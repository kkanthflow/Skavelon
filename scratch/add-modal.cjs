const fs = require('fs');
const path = require('path');

const files = [
  'client/src/pages/Terms.tsx',
  'client/src/pages/Services.tsx',
  'client/src/pages/Privacy.tsx',
  'client/src/pages/Cybersecurity.tsx',
  'client/src/pages/AppDevelopment.tsx',
  'client/src/pages/About.tsx',
  'client/src/components/Navigation.tsx',
  'client/src/components/home/CTASection.tsx',
  'client/src/components/Footer.tsx'
];

// Replace mailto with #contact
files.forEach(f => {
  const filePath = path.join(process.cwd(), f);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/href="mailto:skavelontechnologies@gmail\.com"/g, 'href="#contact"');
  fs.writeFileSync(filePath, content);
});

// Create ContactModal.tsx
const modalContent = `import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#contact') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      handleOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-serif">Get in Touch</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Fill out the form below and our team will get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
            <Input id="name" required placeholder="John Doe" className="bg-muted/30 focus-visible:ring-accent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
            <Input id="email" type="email" required placeholder="john@example.com" className="bg-muted/30 focus-visible:ring-accent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold">Message</Label>
            <Textarea id="message" required placeholder="How can we help you?" className="min-h-[120px] bg-muted/30 focus-visible:ring-accent" />
          </div>
          <Button type="submit" className="w-full font-semibold h-11 text-base bg-accent hover:bg-accent/90 text-white transition-all duration-300" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'client/src/components/ContactModal.tsx'), modalContent);

// Add ContactModal to App.tsx
const appTsxPath = path.join(process.cwd(), 'client/src/App.tsx');
let appTsx = fs.readFileSync(appTsxPath, 'utf8');

if (!appTsx.includes('ContactModal')) {
  // Insert import after other component imports
  appTsx = appTsx.replace(
    /import Footer from "\.\/components\/Footer";/,
    'import Footer from "./components/Footer";\nimport ContactModal from "./components/ContactModal";'
  );
  
  // Insert <ContactModal /> before <Toaster />
  appTsx = appTsx.replace(
    /<Toaster \/>/,
    '<ContactModal />\n            <Toaster />'
  );
  
  fs.writeFileSync(appTsxPath, appTsx);
}

console.log("Contact modal added successfully!");
