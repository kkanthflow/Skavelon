import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Terms() {
  useSEO({
    title: "Terms of Service",
    description: "Terms of Service for Skavelon Technologies. Read our agreements governing use of our website, services, and corporate divisions.",
  });

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing, browsing, or using the corporate website, services, and platforms provided by Skavelon Technologies (collectively referred to as the \"Services\"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (the \"Terms\") and all applicable global laws and regulations. If you do not agree with these Terms, you must immediately cease all use of our Services."
    },
    {
      id: "about",
      title: "2. About Skavelon",
      content: "Skavelon Technologies operates as a multinational conglomerate. Our operations span several specialized business divisions, including LePort (Logistics, Trade, & Supply Chain Solutions), Cybersecurity (Cybersecurity & Advanced IT Solutions), specialized Cybersecurity Services, and various Research & Innovation Initiatives. These Terms apply generally to all interactions with our corporate presence, while specific enterprise service agreements may supplement these Terms for corporate clients."
    },
    {
      id: "eligibility",
      title: "3. User Eligibility",
      content: "To utilize our Services, you must be at least 18 years of age (or the age of majority in your jurisdiction) and possess the legal authority to enter into a binding agreement. If you are accessing our Services on behalf of an enterprise, corporation, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms."
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      content: "You agree to use our Services only for lawful purposes. You are strictly prohibited from: (a) violating any local, national, or international laws; (b) attempting to breach, probe, or compromise our cybersecurity infrastructure, including the systems of our Cybersecurity division; (c) introducing malicious software, viruses, or code designed to disrupt our networks; (d) engaging in unauthorized data collection, scraping, or harvesting; and (e) using our logistics or trade facilitation resources for illicit commerce."
    },
    {
      id: "ip-rights",
      title: "5. Intellectual Property Rights",
      content: "All content, proprietary marks, source code, designs, algorithms, trade secrets, logos (including the Skavelon emblem), and assets displayed on our platforms are the exclusive property of Skavelon Technologies or its licensors and are protected under international copyright, trademark, and patent laws. No license or right is granted to you to copy, modify, distribute, or reverse-engineer any intellectual property without explicit, written corporate authorization."
    },
    {
      id: "user-submissions",
      title: "6. User Submissions",
      content: "If you submit inquiries, feedback, or project proposals through our secure portals, you grant Skavelon a non-exclusive, worldwide, royalty-free, perpetual license to use, review, and analyze such submissions for corporate evaluation and service improvements. All personal data included in submissions is strictly governed by our Privacy Policy."
    },
    {
      id: "availability",
      title: "7. Service Availability",
      content: "While we strive to ensure uninterrupted availability of our digital portals, trade networks, and cybersecurity systems, Skavelon does not guarantee that access will be continuous, secure, or error-free. We reserve the right to temporarily suspend, modify, or restrict access to any part of our Services for maintenance, upgrades, or security protocols without prior liability."
    },
    {
      id: "third-party",
      title: "8. Third-Party Services",
      content: "Our Services may integrate with or link to third-party platforms, APIs, or logistics providers (e.g., shipping networks or external database integrations). We do not control or endorse the content, policies, or practices of third-party platforms, and you acknowledge that your use of third-party systems is at your own risk and subject to their respective terms."
    },
    {
      id: "disclaimer",
      title: "9. Disclaimer of Warranties",
      content: "OUR SERVICES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS. Skavelon Technologies DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE RESULTS OBTAINED FROM CyberSECURITY TOOLS OR LOGISTICS DATA WILL BE COMPLETELY ACCURATE OR ERROR-FREE."
    },
    {
      id: "limitation",
      title: "10. Limitation of Liability",
      content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, Skavelon Technologies, ITS DIVISIONS (INCLUDING LETECH AND LEPORT), DIRECTORS, AND EMPLOYEES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF OUR SERVICES."
    },
    {
      id: "indemnification",
      title: "11. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Skavelon Technologies, its subsidiaries, divisions, affiliates, officers, and agents from and against any and all claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising out of your violation of these Terms, misuse of our Services, or infringement of any intellectual property rights."
    },
    {
      id: "privacy-ref",
      title: "12. Privacy Reference",
      content: "Your privacy is paramount to Skavelon. Our collection, processing, and protection of your personal information, including cookies and contact data, are defined in detail within our Privacy Policy, which is incorporated by reference into these Terms."
    },
    {
      id: "changes",
      title: "13. Changes to Terms",
      content: "We reserve the right to amend or update these Terms of Service at any time. When modifications are made, we will update the \"Last Updated\" date at the top of this document. Continued use of our Services following any modifications constitutes your acceptance of the revised Terms."
    },
    {
      id: "governing-law",
      title: "14. Governing Law",
      content: "These Terms and any dispute arising out of or related to them shall be governed by, construed, and enforced in accordance with the laws of the jurisdiction of our global headquarters in East Asia, without regard to conflict of law principles. Any legal actions or proceedings must be initiated in the competent courts of that jurisdiction."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-[#050505]">
      {/* Header Banner */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </a>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: June 10, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-[#050505] flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="bg-card/30 border border-border/60 rounded-xl p-8 hover:border-accent/30 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent shrink-0" />
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                15. Contact Legal Division
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
                If you have any questions or require legal clarification regarding these Terms, please reach out to our Compliance and Privacy Office through our secure contact portal.
              </p>
              <Link href="/contact"><a>
                  <Button className="cta-button">
                    Contact Legal Office
                  </Button>
                </a></Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
