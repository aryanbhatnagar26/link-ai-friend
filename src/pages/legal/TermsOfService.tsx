import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  usePageTitle("Terms & Conditions");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms &amp; Conditions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to Linkedbot, a product developed and operated by Bhatnagar Digital Labs.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last Updated: 07/03/2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>
              These Terms &amp; Conditions ("Terms") govern your use of the Linkedbot platform, website, and services (collectively referred to as the "Service").
              By creating an account, signing up, or using Linkedbot, you agree to be bound by these Terms. If you do not agree with these Terms, you must not use the Service.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Account Registration</h2>
              <p>To use Linkedbot, users must create an account. By registering, you agree that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All information provided during signup is accurate and complete</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials</li>
                <li>You accept responsibility for all activities under your account</li>
              </ul>
              <p>Bhatnagar Digital Labs is not responsible for unauthorized access resulting from failure to secure your account.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Eligibility</h2>
              <p>By using Linkedbot, you confirm that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You are at least 18 years old, or</li>
                <li>You have the legal authority to enter into this agreement under applicable laws.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Acceptable Use</h2>
              <p>You agree to use Linkedbot only for lawful and ethical purposes. Users must NOT:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the service for spam or illegal activities</li>
                <li>Attempt to hack, reverse engineer, or exploit the platform</li>
                <li>Distribute malware or harmful content</li>
                <li>Misuse automation features in violation of third-party platform rules</li>
                <li>Create multiple accounts to abuse promotions or referral systems</li>
              </ul>
              <p>Violation may result in account suspension or permanent termination.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Subscriptions and Payments</h2>
              <p>Linkedbot may offer both monthly subscription plans and one-time payment plans. By purchasing a subscription, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pay all applicable fees</li>
                <li>Provide accurate billing information</li>
                <li>Authorize the Company to process payments</li>
              </ul>
              <p>Prices may change at any time. Existing users may receive prior notice when applicable.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Refund Policy</h2>
              <p>Refunds are issued at the discretion of Bhatnagar Digital Labs. Refund requests may be denied if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The service has already been used significantly</li>
                <li>Fraudulent activity or abuse is suspected</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Account Suspension or Termination</h2>
              <p>We reserve the right to suspend or terminate accounts if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>These Terms are violated</li>
                <li>Fraudulent behavior is detected</li>
                <li>The service is abused or misused</li>
              </ul>
              <p>Upon termination, access to Linkedbot may be revoked immediately.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
              <p>All rights related to Linkedbot, including but not limited to software, branding, design, technology, and content are the exclusive property of Bhatnagar Digital Labs.</p>
              <p>Users may not copy, reproduce, distribute, or modify any part of the platform without written permission.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. Third-Party Services</h2>
              <p>Linkedbot may interact with or integrate with third-party platforms. We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Changes in third-party services</li>
                <li>Restrictions imposed by external platforms</li>
                <li>Loss caused due to third-party policy violations</li>
              </ul>
              <p>Users must ensure they comply with the terms of any third-party platforms they interact with.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
              <p>Linkedbot is provided "as is" and "as available." Bhatnagar Digital Labs does not guarantee:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Uninterrupted service</li>
                <li>Error-free performance</li>
                <li>Compatibility with all external platforms</li>
              </ul>
              <p>The Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">10. Privacy</h2>
              <p>Your use of Linkedbot is also governed by our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, which explains how we collect, store, and use user data.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">11. Changes to Terms</h2>
              <p>Bhatnagar Digital Labs may update these Terms at any time. Updated terms will be posted on this page with a revised Last Updated date. Continued use of Linkedbot after updates constitutes acceptance of the revised Terms.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">12. Governing Law</h2>
              <p>These Terms shall be governed by the laws of Agra, India. Any disputes arising from the use of Linkedbot shall fall under the jurisdiction of the courts of Agra, India.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">13. Contact Information</h2>
              <p>For any questions regarding these Terms, please contact:</p>
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

export default TermsOfService;
