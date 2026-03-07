import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  usePageTitle("Privacy Policy");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Linkedbot, operated by Bhatnagar Digital Labs, respects your privacy and is committed to protecting your personal data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last Updated: 07/03/2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use Linkedbot, including our website, software, and services.
              By accessing or using Linkedbot, you agree to the practices described in this Privacy Policy.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>We may collect the following types of information when you use Linkedbot.</p>
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing information</li>
                <li>Payment details (processed through secure third-party providers)</li>
                <li>Account credentials</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Usage behavior within the platform</li>
                <li>Time and date of access</li>
              </ul>
              <h3 className="text-lg font-semibold text-foreground">Cookies and Tracking Technologies</h3>
              <p>Linkedbot uses cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Improve user experience</li>
                <li>Remember login sessions</li>
                <li>Analyze traffic and platform performance</li>
                <li>Provide product improvements</li>
              </ul>
              <p>Users can disable cookies through their browser settings.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and maintain the Linkedbot service</li>
                <li>To create and manage user accounts</li>
                <li>To process payments and subscriptions</li>
                <li>To improve platform functionality and user experience</li>
                <li>To communicate product updates or support information</li>
                <li>To prevent fraud, abuse, or illegal activities</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Legal Basis for Processing (GDPR Compliance)</h2>
              <p>For users located in the EEA or United Kingdom, we process personal data based on:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Consent</strong> – when you provide consent for data processing</li>
                <li><strong className="text-foreground">Contractual necessity</strong> – to provide services you requested</li>
                <li><strong className="text-foreground">Legal obligations</strong> – when required by law</li>
                <li><strong className="text-foreground">Legitimate interests</strong> – to improve our services and maintain platform security</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Data Sharing and Disclosure</h2>
              <p>We do not sell personal data. However, we may share information with trusted third parties when necessary, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Payment processors</li>
                <li>Hosting providers</li>
                <li>Analytics services</li>
                <li>Customer support platforms</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p>All partners are required to protect your data and use it only for authorized purposes.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Data Retention</h2>
              <p>We retain personal data only as long as necessary for providing the Linkedbot service, complying with legal obligations, resolving disputes, and enforcing agreements. Users may request deletion of their account and associated data.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encrypted connections (HTTPS/SSL)</li>
                <li>Secure cloud infrastructure</li>
                <li>Access control and authentication mechanisms</li>
              </ul>
              <p>However, no internet system is completely secure, and we cannot guarantee absolute security.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Your Privacy Rights</h2>
              <p>Depending on your location, you may have rights regarding your personal data, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Right to Access</strong> – request a copy of your personal data</li>
                <li><strong className="text-foreground">Right to Rectification</strong> – request correction of inaccurate data</li>
                <li><strong className="text-foreground">Right to Erasure</strong> – request deletion of your personal data</li>
                <li><strong className="text-foreground">Right to Restrict Processing</strong> – request limited processing</li>
                <li><strong className="text-foreground">Right to Data Portability</strong> – request your data in a portable format</li>
                <li><strong className="text-foreground">Right to Withdraw Consent</strong> – withdraw consent at any time</li>
              </ul>
              <p>Requests can be made via the contact email listed below.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. International Data Transfers</h2>
              <p>Because Linkedbot is available globally, your information may be transferred to and processed in countries outside your own. We implement appropriate safeguards in accordance with GDPR and applicable privacy laws.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">9. Third-Party Services</h2>
              <p>Linkedbot may integrate with third-party services or platforms. We are not responsible for the privacy practices of those external services. Users should review the privacy policies of those providers separately.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">10. Children's Privacy</h2>
              <p>Linkedbot is not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If we discover such data has been collected, we will delete it promptly.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">11. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically. When changes are made, the updated version will be posted on this page with the revised Last Updated date. Continued use of Linkedbot after changes indicates acceptance of the updated policy.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">12. Contact Information</h2>
              <p>If you have questions about this Privacy Policy or your personal data, you may contact us:</p>
              <p>
                <strong className="text-foreground">Bhatnagar Digital Labs</strong><br />
                Email: <a href="mailto:Team@linkedbot.online" className="text-primary hover:underline">Team@linkedbot.online</a><br />
                Website: <a href="https://linkedbot.online" className="text-primary hover:underline">linkedbot.online</a><br />
                Product: Linkedbot
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
