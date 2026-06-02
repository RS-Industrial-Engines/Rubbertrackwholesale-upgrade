import { NextRequest, NextResponse } from "next/server";

/**
 * DEVELOPMENT NOTICE: This contact form is NOT production-ready.
 * 
 * Current behavior:
 * - Logs form submissions to server console
 * - Returns success response without sending email
 * 
 * TODO for production:
 * 1. Connect Resend for email delivery to sales team
 * 2. Store submissions in database for CRM
 * 3. Send confirmation email to customer
 * 4. Add rate limiting
 * 5. Add honeypot/CAPTCHA for spam prevention
 */

interface ContactFormData {
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  machine?: string;
  trackSize?: string;
}

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

    // Log the contact form submission (safe logging, no PII in production logs)
    console.log("[Contact Form] New submission received:", {
      timestamp: new Date().toISOString(),
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasPhone: !!body.phone,
      hasSubject: !!body.subject,
      hasMachine: !!body.machine,
      hasTrackSize: !!body.trackSize,
      messageLength: body.message?.length || 0,
    });

    // WARNING: Email is NOT being sent. Form data is only logged.
    // See file header for production TODO items.

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
