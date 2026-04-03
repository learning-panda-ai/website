import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Child Safety Policy — Learning Panda AI",
  description:
    "Learning Panda AI's Child Safety Policy explains how we protect young learners, comply with India's DPDP Act 2023, and create a safe educational environment for students of all ages.",
  robots: { index: true, follow: true },
};

const sections = [
  { id: "commitment", title: "Our Commitment" },
  { id: "dpdp", title: "DPDP Act 2023 Compliance" },
  { id: "data-practices", title: "Data Practices for Minors" },
  { id: "content-safety", title: "Content Safety" },
  { id: "school-accounts", title: "School & Parental Accounts" },
  { id: "parental-rights", title: "Parental Rights & Controls" },
  { id: "reporting", title: "Reporting & Enforcement" },
  { id: "contact", title: "Contact & Escalation" },
];

export default function ChildSafetyPage() {
  return (
    <PolicyLayout
      title="Child Safety Policy"
      emoji="🛡️"
      lastUpdated="April 3, 2026"
      effectiveDate="April 3, 2026"
      intro="Learning Panda AI is designed for students from Class 1 through university. The safety and privacy of every young learner is our highest priority. This policy explains the specific protections we have in place for minors under India's Digital Personal Data Protection Act, 2023."
      sections={sections}
    >
      <h2 id="commitment">Our Commitment</h2>
      <p>
        Learning Panda AI is an educational platform serving students across India, including children as
        young as 6 years old (Class 1). We are deeply committed to:
      </p>
      <ul>
        <li>Creating a safe, age-appropriate learning environment for all students</li>
        <li>Protecting children&apos;s personal data with the highest standard of care</li>
        <li>
          Complying with India&apos;s <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and
          all applicable child protection regulations
        </li>
        <li>Never using children&apos;s data for advertising, profiling, or commercial purposes</li>
        <li>Empowering parents and schools to maintain oversight of student activity</li>
      </ul>
      <div className="callout">
        <p>
          <strong>We do not show advertising to any user under 18.</strong> Our revenue comes exclusively
          from subscriptions — not from data or advertising.
        </p>
      </div>

      <h2 id="dpdp">DPDP Act 2023 Compliance</h2>
      <p>
        India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> governs the
        processing of personal data of Indian citizens. It provides special protections for{" "}
        <strong>children — defined as persons under 18 years of age</strong>. Since our platform primarily
        serves K-12 students, the majority of our users fall within this protected category.
      </p>
      <h3>Key obligations under the DPDP Act</h3>
      <ul>
        <li>
          <strong>Verifiable parental consent:</strong> Before processing personal data of any user under 18,
          we obtain verifiable consent from a parent or lawful guardian, except where a school provides
          consent on behalf of parents for educational use.
        </li>
        <li>
          <strong>No direct sign-up under 18 without parental consent:</strong> Students under 18 must be
          enrolled by a school administrator, teacher, or parent/guardian. Independent sign-up requires
          parental consent verification.
        </li>
        <li>
          <strong>No tracking or behavioural monitoring:</strong> We do not track children&apos;s behaviour
          for profiling or targeted advertising. Usage data is used solely to improve learning outcomes.
        </li>
        <li>
          <strong>Minimal data collection:</strong> We collect only the personal data necessary for
          educational functionality — name, grade level, and board. We do not collect location, phone
          numbers, or social profiles from minors.
        </li>
        <li>
          <strong>No third-party data sharing for commercial purposes:</strong> Children&apos;s personal data
          is never shared with third parties for marketing or commercial purposes.
        </li>
        <li>
          <strong>Data Principal rights:</strong> Parents and guardians can exercise rights on behalf of
          their child — including access, correction, and erasure of personal data.
        </li>
      </ul>
      <div className="callout">
        <p>
          The DPDP Act applies to all persons under <strong>18</strong> — broader than many international
          frameworks. We apply these protections to all our student users, not just younger children.
        </p>
      </div>

      <h2 id="data-practices">Data Practices for Minors</h2>
      <table>
        <thead>
          <tr>
            <th>Data Type</th>
            <th>Collected from Minors?</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name &amp; email</td>
            <td>Yes (via school/parent)</td>
            <td>Account creation only</td>
          </tr>
          <tr>
            <td>Grade &amp; board</td>
            <td>Yes</td>
            <td>Curriculum personalisation</td>
          </tr>
          <tr>
            <td>Questions asked</td>
            <td>Yes</td>
            <td>AI responses &amp; progress tracking</td>
          </tr>
          <tr>
            <td>Progress data (XP, streaks)</td>
            <td>Yes</td>
            <td>Gamification &amp; parent reports</td>
          </tr>
          <tr>
            <td>Profile photo</td>
            <td>No</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Location / GPS</td>
            <td>No</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>No</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Social media profiles</td>
            <td>No</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
      <p>
        All personal data of minor users is retained only as long as the school or parent account is active
        and is deleted within 30 days of an erasure request, in accordance with the DPDP Act.
      </p>

      <h2 id="content-safety">Content Safety</h2>
      <p>
        All AI-generated content on Learning Panda AI is subject to strict content filtering:
      </p>
      <ul>
        <li>
          <strong>Curriculum alignment:</strong> Responses are anchored to official NCERT, CBSE, ICSE, and
          State board textbooks. Off-topic or inappropriate queries are gracefully declined.
        </li>
        <li>
          <strong>Age-appropriate language:</strong> The tone and vocabulary of responses are calibrated to
          the student&apos;s grade level.
        </li>
        <li>
          <strong>Content filtering:</strong> We apply filters to detect and block attempts to generate
          harmful, violent, adult, or otherwise inappropriate content.
        </li>
        <li>
          <strong>No social features:</strong> Students cannot directly message each other or share
          user-generated content publicly.
        </li>
        <li>
          <strong>Human review:</strong> Flagged interactions are reviewed by our safety team.
        </li>
      </ul>

      <h2 id="school-accounts">School &amp; Parental Accounts</h2>
      <h3>School accounts</h3>
      <p>
        Schools that deploy Learning Panda AI act as Data Fiduciaries under the DPDP Act, obtaining consent
        on behalf of parents for educational use. Schools agree to our{" "}
        <a href="/terms-of-service">Terms of Service</a> and are responsible for:
      </p>
      <ul>
        <li>Ensuring only enrolled students access the platform</li>
        <li>
          Obtaining and documenting verifiable parental consent as required under the DPDP Act, 2023
        </li>
        <li>Managing student accounts and data access within their institution</li>
      </ul>
      <h3>Parent accounts</h3>
      <p>
        Parents or guardians can create accounts to monitor their child&apos;s progress, including:
      </p>
      <ul>
        <li>Weekly progress reports delivered by email</li>
        <li>Dashboard showing subjects studied, time spent, and quiz scores</li>
        <li>The ability to restrict subjects or features accessible to their child</li>
        <li>The ability to request data export or erasure at any time</li>
      </ul>

      <h2 id="parental-rights">Parental Rights &amp; Controls</h2>
      <p>
        Under the DPDP Act, 2023, parents and guardians have the following rights on behalf of their child
        (under 18) at any time:
      </p>
      <ul>
        <li>
          <strong>Right to access:</strong> Request a summary of all personal data we hold about their child.
        </li>
        <li>
          <strong>Right to correction:</strong> Ask us to correct inaccurate or incomplete information.
        </li>
        <li>
          <strong>Right to erasure:</strong> Request deletion of their child&apos;s account and all
          associated personal data.
        </li>
        <li>
          <strong>Right to grievance redressal:</strong> Raise a complaint with our Grievance Officer (see
          contact below). We will respond within 48 hours.
        </li>
        <li>
          <strong>Right to withdraw consent:</strong> Withdraw previously given consent at any time, which
          will result in the child&apos;s account being closed.
        </li>
        <li>
          <strong>Right to nominate:</strong> Nominate another individual to exercise these rights in case of
          incapacity.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a> with the subject line
        &quot;Parental Request — [child&apos;s first name].&quot; We will respond within 5 business days.
      </p>

      <h2 id="reporting">Reporting &amp; Enforcement</h2>
      <h3>Reporting concerns</h3>
      <p>
        If you encounter content or behaviour on the platform that you believe is harmful, inappropriate, or
        unsafe for children, please report it immediately:
      </p>
      <ul>
        <li>
          <strong>In-app:</strong> Use the &quot;Report&quot; button available on any AI response.
        </li>
        <li>
          <strong>Email:</strong> <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>
        </li>
      </ul>
      <h3>Response &amp; enforcement</h3>
      <ul>
        <li>All child safety reports are reviewed within 24 hours.</li>
        <li>
          Accounts found to be in violation of this policy — including adults attempting to misuse the
          platform — will be suspended immediately and reported to relevant authorities where required by
          Indian law.
        </li>
        <li>
          We co-operate fully with Indian law enforcement and the Data Protection Board of India in any
          investigation involving child safety or data misuse.
        </li>
      </ul>
      <div className="warn-callout">
        <p>
          If you believe a child is in immediate danger, please contact your local emergency services
          (Police: 100, Child helpline: 1098) immediately. Do not wait for our response.
        </p>
      </div>

      <h2 id="contact">Contact &amp; Escalation</h2>
      <p>
        For any concerns related to child safety, privacy of minors, or DPDP Act compliance, please contact
        our Grievance Officer:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@learningpanda.ai">contact@learningpanda.ai</a>
        </li>
        <li>
          <strong>Subject line:</strong> &quot;Child Safety&quot; or &quot;DPDP Grievance&quot;
        </li>
        <li>
          <strong>Response time:</strong> Within 24 hours for safety issues; 5 business days for data
          requests
        </li>
      </ul>
      <p>
        If your grievance is not resolved to your satisfaction, you may escalate to the{" "}
        <strong>Data Protection Board of India</strong> as established under the DPDP Act, 2023.
      </p>
      <p>
        We take every child safety concern seriously and are committed to continuously improving our
        protections for young learners across India.
      </p>
    </PolicyLayout>
  );
}
