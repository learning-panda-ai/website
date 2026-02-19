import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  await ses.send(
    new SendEmailCommand({
      Source: process.env.EMAIL_FROM!,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: `Your Learning Panda code: ${otp}` },
        Body: {
          Html: {
            Data: `
              <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:16px;">
                <div style="text-align:center;margin-bottom:24px;">
                  <span style="font-size:48px;">🐼</span>
                  <h1 style="color:#16a34a;font-size:24px;margin:8px 0 0;">Learning Panda</h1>
                </div>
                <div style="background:white;border-radius:12px;padding:24px;text-align:center;">
                  <p style="color:#374151;font-size:15px;margin:0 0 16px;">Your one-time sign-in code is:</p>
                  <div style="letter-spacing:8px;font-size:36px;font-weight:700;color:#16a34a;margin:16px 0;padding:16px;background:#f0fdf4;border-radius:8px;border:2px dashed #86efac;">
                    ${otp}
                  </div>
                  <p style="color:#6b7280;font-size:13px;margin:16px 0 0;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
                </div>
                <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
              </div>
            `,
          },
          Text: {
            Data: `Your Learning Panda sign-in code is: ${otp}\n\nThis code expires in 10 minutes. Do not share it with anyone.`,
          },
        },
      },
    })
  );
}
