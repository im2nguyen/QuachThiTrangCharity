import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  email?: unknown;
  locale?: unknown;
  website?: unknown; // honeypot
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots often fill hidden fields — pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const notifyTo = (
    process.env.NOTIFY_EMAIL ??
    "admin@quachthitrangcharity.com,quachthitrangfoundation@gmail.com"
  )
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)
    .join(", ");

  if (!user || !pass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  if (!notifyTo) {
    console.error("NOTIFY_EMAIL is empty");
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = `New donation from ${email}`;
  const bodyText = `New donation has been made from ${email}.`;

  try {
    await transporter.sendMail({
      from: `"Quach Thi Trang Foundation" <${user}>`,
      to: notifyTo,
      replyTo: email,
      subject,
      text: bodyText,
      html: `<p>${bodyText}</p>`,
    });
  } catch (error) {
    console.error("Failed to send Zelle receipt notification", error);
    return NextResponse.json(
      { error: "Could not send notification. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
