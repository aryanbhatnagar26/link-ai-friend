import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  usePageTitle("Cookie Policy");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This Cookie Policy explains how Linkedbot, operated by Bhatnagar Digital Labs, uses cookies and similar tracking technologies.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last Updated: 07/03/2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>By continuing to use Linkedbot, you consent to the use of cookies as described in this policy.</p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. What Are Cookies</h2>
              <p>Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Login sessions</li>
                <li>User preferences</li>
                <li>Website performance data</li>
                <li>Security settings</li>
              </ul>
              <p>Cookies help improve the functionality, performance, and security of the platform.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Types of Cookies We Use</h2>

              <h3 className="text-lg font-semibold text-foreground">Essential Cookies</h3>
              <p>These cookies are necessary for the operation of the website. They allow features such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>User authentication</li>
                <li>Account login</li>
                <li>Security verification</li>
                <li>Basic website functionality</li>
              </ul>
              <p>Without these cookies, the service cannot operate properly.</p>

              <h3 className="text-lg font-semibold text-foreground">Performance and Analytics Cookies</h3>
              <p>These cookies help us understand how users interact with the platform. They may collect data such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Feature usage</li>
                <li>Error logs</li>
              </ul>
              <p>This information helps us improve the performance and usability of Linkedbot.</p>

              <h3 className="text-lg font-semibold text-foreground">Functional Cookies</h3>
              <p>Functional cookies allow the platform to remember user preferences such as:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Language settings</li>
                <li>User interface preferences</li>
                <li>Saved login sessions</li>
              </ul>
              <p>These cookies improve the overall user experience.</p>

              <h3 className="text-lg font-semibold text-foreground">Third-Party Cookies</h3>
              <p>Linkedbot may use third-party services that place cookies on your device, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Analytics providers</li>
                <li>Payment processors</li>
                <li>Cloud infrastructure services</li>
              </ul>
              <p>These third parties may collect information according to their own privacy policies.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Managing Cookies</h2>
              <p>Users can control or disable cookies through their browser settings. Most browsers allow users to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Delete stored cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Disable all cookies</li>
              </ul>
              <p>However, disabling certain cookies may affect the functionality of Linkedbot.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Cookie Consent (GDPR Requirement)</h2>
              <p>For users located in the EEA or United Kingdom, Linkedbot may display a cookie consent banner that allows users to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize cookie preferences</li>
              </ul>
              <p>Users may change their cookie preferences at any time.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Updates to This Cookie Policy</h2>
              <p>We may update this Cookie Policy from time to time. When updates occur, the revised policy will be posted on this page with the updated Last Updated date.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Contact Information</h2>
              <p>If you have any questions about this Cookie Policy, please contact:</p>
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

export default CookiePolicy;
