import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { RotateCcw } from "lucide-react";

const RefundPolicy = () => {
  usePageTitle("Refund & Cancellation Policy");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <RotateCcw className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Refund &amp; Cancellation Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This policy applies to all purchases made for Linkedbot, a product operated by Bhatnagar Digital Labs.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last Updated: 07/03/2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p>
              By purchasing a subscription or service from Linkedbot, you agree to the terms outlined in this policy.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Subscription Plans</h2>
              <p>Linkedbot may offer the following types of plans:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Monthly subscription plans</li>
                <li>One-time purchase plans</li>
                <li>Promotional or discounted plans</li>
              </ul>
              <p>Pricing and features may change at the discretion of Bhatnagar Digital Labs.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Refund Policy</h2>
              <p>Because Linkedbot provides digital software services, refunds are generally limited.</p>

              <h3 className="text-lg font-semibold text-foreground">Eligible Refund Requests</h3>
              <p>A refund may be considered if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The request is made within 7 days of purchase, and</li>
                <li>The service has not been extensively used, or</li>
                <li>A technical issue prevents proper use of the platform and cannot be resolved by our support team.</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">Non-Refundable Situations</h3>
              <p>Refunds will generally not be provided if:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The subscription has been used extensively</li>
                <li>The request is made after the refund eligibility period</li>
                <li>The purchase was made during special promotions or discounted offers</li>
                <li>The user violates the Terms &amp; Conditions</li>
                <li>The service is suspended due to misuse or fraudulent activity</li>
              </ul>
              <p>All refund decisions are made at the sole discretion of Bhatnagar Digital Labs.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Subscription Cancellation</h2>
              <p>Users may cancel their subscription at any time. When a subscription is cancelled:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The subscription will remain active until the end of the current billing cycle</li>
                <li>No further billing will occur after cancellation</li>
                <li>Access to paid features may end once the billing period expires</li>
              </ul>
              <p>We do not provide partial refunds for unused time in the billing cycle.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Automatic Renewals</h2>
              <p>If you purchase a recurring subscription, it will automatically renew at the end of each billing period unless cancelled before the renewal date. Users are responsible for cancelling their subscription before the next billing cycle if they do not wish to continue the service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Payment Processing</h2>
              <p>All payments are processed through secure third-party payment providers. Linkedbot does not store full payment card information.</p>
              <p>If a payment dispute or chargeback is initiated:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The associated account may be temporarily suspended</li>
                <li>Access to the service may be restricted during investigation</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Chargebacks and Abuse</h2>
              <p>Users who initiate fraudulent chargebacks or payment disputes may have their accounts permanently suspended. We reserve the right to recover any unpaid balances or damages resulting from misuse of the refund system.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Changes to This Policy</h2>
              <p>Bhatnagar Digital Labs may update this Refund &amp; Cancellation Policy at any time. Updated policies will be posted on this page with the revised Last Updated date.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. Contact for Refund Requests</h2>
              <p>If you would like to request a refund or cancel your subscription, please contact:</p>
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

export default RefundPolicy;
