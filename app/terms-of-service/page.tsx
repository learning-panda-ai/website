import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

import { sections } from "@/data/termsOfService";

export const metadata: Metadata = {
  title: "Terms of Service — Learning Panda AI",
  description:
    "Read the Terms of Service for Learning Panda AI. By using our platform, you agree to these terms governing your rights and responsibilities.",
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      emoji="📋"
      lastUpdated="April 3, 2026"
      effectiveDate="April 3, 2026"
      intro="Please read these Terms of Service carefully before using Learning Panda AI. By accessing or using the Service, you agree to be bound by these terms."
      sections={sections}
    >
      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>
        By accessing or using Learning Panda AI (&quot;Service&quot;), you agree to these Terms of Service
        (&quot;Terms&quot;) and our{" "}
        <a href="/privacy-policy">Privacy Policy</a>. If you are under 18, your parent or guardian must also
        agree to these Terms on your behalf.
      </p>
      <p>
        If you are accessing the Service on behalf of a school or organisation, you represent that you have
        the authority to bind that organisation to these Terms.
      </p>
      <div className="callout">
        <p>
          <strong>If you do not agree to these Terms, please do not use the Service.</strong>
        </p>
      </div>

      <h2 id="service-description">Service Description</h2>
      <p>
        Learning Panda AI provides an AI-powered educational platform designed for K-12 and university
        students in India. The Service includes:
      </p>
      <ul>
        <li>AI-generated study assistance aligned with CBSE, ICSE, and State board curricula</li>
        <li>Text, voice, and video interaction modes</li>
        <li>Progress tracking, gamification (XP, streaks, leaderboards), and study statistics</li>
        <li>Parent progress reports and teacher/school dashboards (School Plan)</li>
        <li>Practice questions, subject guides, and study resources</li>
      </ul>
      <p>
        We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with
        reasonable notice.
      </p>

      <h2 id="accounts">Accounts &amp; Eligibility</h2>
      <h3>Eligibility</h3>
      <p>
        You must be at least 13 years old to create an account independently. Children under 13 may only use
        the Service through a school account created by a teacher or administrator, or with verifiable
        parental consent. See our{" "}
        <a href="/child-safety">Child Safety Policy</a> for details.
      </p>
      <h3>Account responsibilities</h3>
      <ul>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>You must provide accurate and complete information when creating your account.</li>
        <li>
          You are responsible for all activity that occurs under your account. Notify us immediately at{" "}
          <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a> if you suspect
          unauthorised access.
        </li>
        <li>You may not create more than one personal account.</li>
      </ul>

      <h2 id="acceptable-use">Acceptable Use</h2>
      <p>You agree NOT to use the Service to:</p>
      <ul>
        <li>Submit false, misleading, or fraudulent information</li>
        <li>Violate any applicable law, regulation, or third-party rights</li>
        <li>
          Attempt to gain unauthorised access to any part of the Service, our servers, or other users&apos;
          accounts
        </li>
        <li>
          Use automated tools (bots, scrapers, crawlers) to access the Service without prior written consent
        </li>
        <li>
          Reverse-engineer, decompile, or disassemble any software component of the Service
        </li>
        <li>Transmit harmful, offensive, or illegal content</li>
        <li>Impersonate any person or entity</li>
        <li>
          Use the AI assistant to generate content that facilitates academic dishonesty in violation of your
          institution&apos;s policies
        </li>
      </ul>
      <div className="warn-callout">
        <p>
          Violation of these rules may result in immediate suspension or termination of your account without
          refund.
        </p>
      </div>

      <h2 id="subscription">Subscriptions &amp; Billing</h2>
      <h3>Free Plan</h3>
      <p>
        The Free Plan is available at no charge and includes limited features as described on our{" "}
        <a href="/#pricing">Pricing page</a>.
      </p>
      <h3>Pro Plan</h3>
      <ul>
        <li>
          Billed monthly (₹299/month) or annually (₹2,499/year). Annual plans are billed upfront.
        </li>
        <li>
          A 7-day free trial is available for new subscribers. You will not be charged until the trial ends.
          Cancel any time during the trial to avoid charges.
        </li>
        <li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
      </ul>
      <h3>Refunds</h3>
      <p>
        We offer a pro-rata refund for annual subscriptions cancelled within 7 days of a billing date. Monthly
        subscriptions are non-refundable after the billing date. To request a refund, email{" "}
        <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>.
      </p>
      <h3>Price changes</h3>
      <p>
        We may change subscription prices with 30 days&apos; advance notice via email. Continued use after
        the effective date constitutes acceptance of the new price.
      </p>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        All content, features, and functionality of the Service — including but not limited to text,
        graphics, logos, AI-generated responses, curriculum mappings, and software — are the exclusive
        property of Learning Panda AI and are protected by applicable intellectual property laws.
      </p>
      <p>
        We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Service for
        your personal, non-commercial educational purposes.
      </p>
      <p>
        You may not copy, reproduce, distribute, or create derivative works from any part of the Service
        without our explicit written permission.
      </p>

      <h2 id="user-content">User Content</h2>
      <p>
        When you submit questions, feedback, or other content to the Service (&quot;User Content&quot;), you
        grant Learning Panda AI a non-exclusive, worldwide, royalty-free licence to use, process, and store
        that content solely for the purpose of providing and improving the Service.
      </p>
      <p>
        You represent that you have all rights necessary to grant this licence, and that your User Content does
        not violate any third-party rights.
      </p>
      <p>
        We do not claim ownership of your User Content. You retain all ownership rights.
      </p>

      <h2 id="disclaimers">Disclaimers</h2>
      <p>
        The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the fullest
        extent permitted by law, Learning Panda AI disclaims all warranties, express or implied, including
        warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>
      <p>
        AI-generated content may occasionally contain errors. We recommend verifying important information
        from authoritative sources such as official NCERT/board textbooks. The Service is a learning aid and
        is not a substitute for qualified teaching.
      </p>

      <h2 id="limitation">Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Learning Panda AI shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or
        profits, arising out of or in connection with your use of the Service.
      </p>
      <p>
        Our total liability to you for any claim arising from these Terms or your use of the Service shall not
        exceed the amount you paid us in the 12 months preceding the claim.
      </p>

      <h2 id="termination">Termination</h2>
      <p>
        You may close your account at any time by emailing{" "}
        <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>.
      </p>
      <p>
        We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent
        activity, or if we are required to do so by law. Upon termination, your right to use the Service
        ceases immediately.
      </p>
      <p>
        Sections covering Intellectual Property, Disclaimers, Limitation of Liability, and Governing Law
        survive termination.
      </p>

      <h2 id="governing-law">Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject
        to the exclusive jurisdiction of the courts located in India.
      </p>
      <p>
        We may update these Terms from time to time. Continued use of the Service after changes are posted
        constitutes acceptance of the updated Terms.
      </p>

      <h2 id="contact">Contact Us</h2>
      <p>
        For any questions about these Terms, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>
        </li>
        <li>
          <strong>Website:</strong> <a href="https://learningpanda.ai">learningpanda.ai</a>
        </li>
      </ul>
    </PolicyLayout>
  );
}
