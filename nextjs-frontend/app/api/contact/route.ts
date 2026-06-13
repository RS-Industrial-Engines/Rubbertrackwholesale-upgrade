import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact + Quote form handler.
 * Both the Contact form and the Request-a-Quote form POST here.
 * Sends an email notification via Resend to the sales inbox.
 */

interface ContactFormData {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  subject?: string;
  message: string;
  machine?: string;
  trackSize?: string;
}

// Where leads are delivered, and the verified Resend sender.
const TO_EMAIL = "info@rubbertrackwholesale.com";
const FROM_EMAIL = "noreply@rsindustrialengines.com";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }

    // Fail loudly (in logs) if the key is missing, instead of silently not sending.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "[Contact Form] RESEND_API_KEY is not set in the environment. Email NOT sent."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please call us directly or try again later.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject =
      body.subject && body.subject.trim().length > 0
        ? body.subject
        : `New inquiry from ${body.name}`;

    // Build a clean, readable email body from whatever fields are present.
    const lines: string[] = [
      `Name: ${body.name}`,
      body.email ? `Email: ${body.email}` : null,
      body.phone ? `Phone: ${body.phone}` : null,
      body.company ? `Company: ${body.company}` : null,
      body.machine ? `Machine: ${body.machine}` : null,
      body.trackSize ? `Track Size: ${body.trackSize}` : null,
      "",
      "Message:",
      body.message,
    ].filter((l): l is string => l !== null);

    const textBody = lines.join("\n");
    const htmlBody = lines
      .map((l) => (l === "" ? "<br/>" : `<p style="margin:2px 0">${l}</p>`))
      .join("");

    // Reply-To set to the customer's email when provided, so you can reply directly.
    const replyTo =
      body.email && !body.email.includes("@placeholder.com")
        ? body.email
        : undefined;

    const { error } = await resend.emails.send({
      from: `Rubber Track Wholesale <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject,
      text: textBody,
      html: htmlBody,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("[Contact Form] Resend send error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send your message. Please try again or call us.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. We will contact you shortly.",
    });
  } catch (error) {
    console.error("[Contact Form] Error processing submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
