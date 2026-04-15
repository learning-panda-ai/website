import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

import { sections } from "@/data/privacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy — Learning Panda AI",
  description:
    "Learn how Learning Panda AI collects, uses, and protects your personal data. We are committed to your privacy and the safety of every student.",
  robots: { index: true, follow: true },
};


export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      emoji="🔒"
      lastUpdated="April 3, 2026"
      effectiveDate="April 3, 2026"
      intro="Learning Panda AI is committed to protecting the privacy of students, parents, and educators. This policy explains what data we collect, why we collect it, and how we keep it safe."
      sections={sections}
    >
      <h2 id="overview">Overview</h2>
      <p>
        Learning Panda AI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{" "}
        <a href="https://learningpanda.ai">learningpanda.ai</a> and related mobile/web applications
        (collectively, the &quot;Service&quot;). This Privacy Policy describes how we handle personal information
        when you use our Service, and it applies to all users — students, parents, teachers, and school
        administrators.
      </p>
      <div className="callout">
        <p>
          <strong>We never sell your personal data.</strong> We do not sell, rent, or trade any personal
          information to third parties for commercial purposes.
        </p>
      </div>

      <h2 id="information-we-collect">Information We Collect</h2>
      <h3>Account Information</h3>
      <p>When you create an account, we may collect:</p>
      <ul>
        <li>Name and email address</li>
        <li>Google account information (if you use Sign in with Google)</li>
        <li>Grade level, board (CBSE, ICSE, State), and school name</li>
        <li>Role — student, parent, or teacher</li>
      </ul>

      <h3>Usage Data</h3>
      <p>As you use the Service, we automatically collect:</p>
      <ul>
        <li>Questions asked, subjects studied, and sessions completed</li>
        <li>Progress data: XP, streaks, quiz scores, and time-on-task</li>
        <li>Device type, browser, operating system, and IP address</li>
        <li>Pages visited and features used within the app</li>
      </ul>

      <h3>Communications</h3>
      <p>
        If you contact us via email or a contact form, we retain the contents of your message and your
        contact details solely to respond to your inquiry.
      </p>

      <h2 id="how-we-use">How We Use Information</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Lawful Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Provide and personalise the learning experience</td>
            <td>Contract performance</td>
          </tr>
          <tr>
            <td>Generate AI-powered answers aligned to your board</td>
            <td>Contract performance</td>
          </tr>
          <tr>
            <td>Track and display progress (streaks, XP, leaderboards)</td>
            <td>Legitimate interest</td>
          </tr>
          <tr>
            <td>Send transactional emails (account, billing)</td>
            <td>Contract performance</td>
          </tr>
          <tr>
            <td>Improve and debug the Service</td>
            <td>Legitimate interest</td>
          </tr>
          <tr>
            <td>Comply with legal obligations</td>
            <td>Legal obligation</td>
          </tr>
          <tr>
            <td>Send product updates (with your consent)</td>
            <td>Consent</td>
          </tr>
        </tbody>
      </table>

      <h2 id="third-party">Third-Party Services</h2>
      <p>We use the following third-party services to operate the platform. Each has its own privacy policy:</p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Purpose</th>
            <th>Data Shared</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google OAuth</td>
            <td>Authentication</td>
            <td>Name, email, profile photo</td>
          </tr>
          <tr>
            <td>Google Analytics</td>
            <td>Usage analytics</td>
            <td>Anonymised usage data, cookies</td>
          </tr>
          <tr>
            <td>Cloudflare Turnstile</td>
            <td>Bot/spam protection</td>
            <td>Browser signals (no personal data)</td>
          </tr>
          <tr>
            <td>Amazon Web Services (AWS)</td>
            <td>Cloud hosting &amp; email delivery</td>
            <td>Content of emails sent via SES</td>
          </tr>
          <tr>
            <td>PostgreSQL (managed)</td>
            <td>Data storage</td>
            <td>All structured user data</td>
          </tr>
        </tbody>
      </table>
      <p>
        We require all third-party processors to handle data in accordance with applicable law and to
        implement appropriate technical and organisational security measures.
      </p>

      <h2 id="children-privacy">Children&apos;s Privacy (DPDP Act 2023)</h2>
      <div className="callout">
        <p>
          <strong>Special protections apply to all users under 18.</strong> Under India&apos;s DPDP Act,
          2023, a &quot;child&quot; means any person under 18 years of age. Learning Panda AI takes the
          safety of every young learner extremely seriously.
        </p>
      </div>
      <p>
        Our Service is directed at students of all ages, including young children. We comply with
        India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, which requires
        verifiable parental consent before processing personal data of anyone under 18.
      </p>
      <h3>For users under 18</h3>
      <ul>
        <li>
          Students under 18 must be enrolled by a school administrator, teacher, or parent/guardian —
          independent sign-up requires verifiable parental consent under the DPDP Act.
        </li>
        <li>We collect only the minimum data necessary for educational purposes.</li>
        <li>We do not show behavioural advertising to any user under 18.</li>
        <li>
          We do not use personal data of minors to build profiles for advertising or commercial purposes.
        </li>
        <li>
          Parents or guardians may request to access, correct, or erase their child&apos;s personal data
          at any time by contacting us at{" "}
          <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>.
        </li>
      </ul>
      <h3>Parental consent</h3>
      <p>
        If we discover that we have collected personal data from a user under 18 without verifiable parental
        consent, we will delete that data promptly. If you believe this has occurred, please contact us
        immediately. For full details, see our{" "}
        <a href="/child-safety">Child Safety Policy</a>.
      </p>

      <h2 id="data-retention">Data Retention &amp; Deletion</h2>
      <p>
        We retain your personal data for as long as your account is active or as needed to provide the
        Service. You may request deletion of your account and associated data at any time:
      </p>
      <ul>
        <li>
          Email <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a> with the subject line
          &quot;Delete My Account&quot;.
        </li>
        <li>We will process deletion requests within 30 days.</li>
        <li>
          Some aggregated, anonymised usage data may be retained for product improvement purposes even after
          account deletion.
        </li>
        <li>
          We retain billing records for 7 years as required by Indian tax regulations.
        </li>
      </ul>

      <h2 id="cookies">Cookies &amp; Tracking</h2>
      <p>We use the following types of cookies:</p>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Purpose</th>
            <th>Can be disabled?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essential</td>
            <td>Login sessions, security tokens</td>
            <td>No — required for the Service</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Google Analytics — usage patterns</td>
            <td>Yes — via browser settings</td>
          </tr>
          <tr>
            <td>Security</td>
            <td>Cloudflare Turnstile bot detection</td>
            <td>No — required for security</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can manage or disable analytics cookies through your browser settings or by using a browser
        extension such as the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2 id="data-security">Data Security</h2>
      <p>We implement industry-standard security measures including:</p>
      <ul>
        <li>HTTPS/TLS encryption for all data in transit</li>
        <li>AES-256 encryption for data at rest in our database</li>
        <li>Role-based access control — staff only access data necessary for their role</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>AWS infrastructure with SOC 2 compliance</li>
      </ul>
      <div className="warn-callout">
        <p>
          No system is 100% secure. In the event of a data breach that affects your personal data, we will
          notify you within 72 hours as required by applicable law.
        </p>
      </div>

      <h2 id="your-rights">Your Rights</h2>
      <p>Depending on your location, you may have the following rights:</p>
      <ul>
        <li>
          <strong>Access:</strong> Request a copy of the personal data we hold about you.
        </li>
        <li>
          <strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.
        </li>
        <li>
          <strong>Deletion:</strong> Request deletion of your personal data (&quot;right to be
          forgotten&quot;).
        </li>
        <li>
          <strong>Portability:</strong> Receive your data in a structured, machine-readable format.
        </li>
        <li>
          <strong>Objection:</strong> Object to processing based on legitimate interests.
        </li>
        <li>
          <strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is
          consent-based.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>. We will respond within 30
        days.
      </p>

      <h2 id="contact">Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data,
        please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href="https://learningpanda.ai">learningpanda.ai</a>
        </li>
      </ul>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an
        updated &quot;Last updated&quot; date. Continued use of the Service after changes constitutes
        acceptance of the updated policy.
      </p>
    </PolicyLayout>
  );
}
