import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSEO } from "@/hooks/useSEO";
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';

export default function Privacy() {
  useSEO({
    title: "Privacy Policy",
    description: "Privacy Policy for Skavelon Technologies. Learn how we collect, protect, process, and respect user privacy and data rights.",
  });

  const sections = [
    {
      id: "intro",
      title: "1. Introduction & Scope",
      content: "Skavelon Technologies, including our divisions LePort, Cybersecurity, Cybersecurity Services, and Research & Innovation Initiatives (collectively, \"Skavelon\", \"we\", \"us\", or \"our\"), is committed to safeguarding the privacy and data rights of our users, corporate clients, partners, and visitors. This Privacy Policy details how we collect, process, store, and transfer personal data through our corporate website, platforms, and digital services. All processing is conducted in strict compliance with globally recognized standards, including the General Data Protection Regulation (GDPR)."
    },
    {
      id: "info-collect",
      title: "2. Information We Collect",
      content: "We collect information to deliver efficient supply chain logistics and cybersecurity services. This includes two categories of data: (a) Information you explicitly provide to us, and (b) Information automatically collected when you interact with our Services."
    },
    {
      id: "info-provide",
      title: "3. Information Users Provide",
      content: "When using our secure contact portals, requesting demos, or submitting project inquiries, we collect the personal details you choose to share. This typically includes: full name, corporate email address, professional telephone contact, company affiliation, and the contents of your message. We request that you do not submit highly sensitive information (such as financial details or government identification numbers) unless explicitly required for formal transaction agreements."
    },
    {
      id: "info-auto",
      title: "4. Automatically Collected Information",
      content: "When accessing our corporate website, we automatically collect telemetry data for system optimization and security audit logging. This data includes: Internet Protocol (IP) address, browser signature, operating system, referral links, page views, and timestamps. This information is processed in an aggregated, pseudonymized manner, and is primarily used to ensure network integrity and detect potential cyberthreats."
    },
    {
      id: "use-info",
      title: "5. How Information Is Used",
      content: "We process collected data under valid legal bases (including contract performance, compliance with legal obligations, and our legitimate business interests). Specifically, your information is used to: (a) respond to inquiries, book appointments for LePort, and arrange system demos for Cybersecurity; (b) secure, manage, and optimize our corporate portals; (c) verify user eligibility under trade policies; and (d) comply with international trade, cybersecurity, and financial reporting standards."
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking Technologies",
      content: "We utilize cookies, local storage, and similar analytical tracking technologies to enhance user navigation and monitor web performance. We only deploy strictly necessary cookies by default. Non-essential analytical or preferences cookies will only be activated upon receiving your explicit consent through our cookie consent configuration tool."
    },
    {
      id: "sharing",
      title: "7. Information Sharing and Disclosure",
      content: "Skavelon does not sell, trade, or rent personal data to third parties. We share information only under the following limited conditions: (a) with trusted corporate affiliates and divisions within the Skavelon Technologies to fulfill your service requests; (b) with secure, vetted third-party service providers (such as hosting, email delivery systems, or logistics partners) bound by strict confidentiality agreements; and (c) when compelled by law, regulation, or legal proceedings from competent judicial authorities."
    },
    {
      id: "security",
      title: "8. Data Security & Integrity",
      content: "To protect your personal data, we implement robust administrative, technical, and physical security measures. All data transmitted through our contact portals is encrypted in transit using Secure Sockets Layer (SSL)/Transport Layer Security (TLS) protocols. Access to collected data is restricted to authorized personnel who require access to perform their specific business functions."
    },
    {
      id: "retention",
      title: "9. Data Retention Policies",
      content: "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, resolve disputes, establish legal defenses, and comply with corporate audit and global regulatory retention standards. Following the expiration of the retention window, data is securely deleted or anonymized."
    },
    {
      id: "user-rights",
      title: "10. User Rights & Data Protection (GDPR Compliant)",
      content: "Depending on your jurisdiction, you possess specific data protection rights. In accordance with GDPR and international frameworks, you have the right to: (a) access the personal data we hold about you; (b) request correction of inaccurate data; (c) request deletion of your information under certain circumstances; (d) object to or restrict processing; and (e) request a portable copy of your data. To exercise these rights, please contact our Data Protection Office."
    },
    {
      id: "transfers",
      title: "11. International Data Transfers",
      content: "Skavelon operates globally. Personal data collected on our systems may be stored and processed in secure data centers located in Singapore, East Asia, or other international jurisdictions. When transferring data across borders, we implement recognized safety mechanisms, including Standard Contractual Clauses (SCCs), to guarantee your data receives equivalent levels of protection."
    },
    {
      id: "children",
      title: "12. Children's Privacy",
      content: "Our corporate Services are not directed to, nor intended for, individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has shared personal information with us, please notify us immediately so we can remove the data from our active systems."
    },
    {
      id: "external-links",
      title: "13. Third-Party Services and Links",
      content: "Our website may feature links to external resources (such as client portals, professional social media pages, or partner logistics databases). We have no authority over the privacy standards of external entities, and encourage you to review their specific privacy statements before sharing any personal information."
    },
    {
      id: "changes",
      title: "14. Changes to Privacy Policy",
      content: "We reserve the right to revise this Privacy Policy at our discretion to align with changes in legal requirements or our data handling practices. When changes occur, the updated policy will be uploaded to our website with a revised revision date. We recommend checking this page periodically."
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
            Privacy Policy
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
                  <Lock className="w-5 h-5 text-accent shrink-0" />
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
                15. Contact the Data Protection Officer
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
                To exercise any of your data protection rights, request information deletion, or submit privacy-related inquiries, please reach out to our secure Data Privacy Office.
              </p>
              <Link href="/contact"><a>
                  <Button className="cta-button">
                    Contact Privacy Office
                  </Button>
                </a></Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
