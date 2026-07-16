import crypto from "node:crypto";

const LEAD_NOTIFICATION_EMAIL =
  process.env.LEAD_NOTIFICATION_EMAIL ||
  "patrick@sentineltechnologygroup.com";
const RESEND_API_URL = "https://api.resend.com/emails";

function sendJson(response, status, data) {
  return response.status(status).json(data);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("Email service environment variables are not configured.");
  }

  const emailResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  const result = await emailResponse.json().catch(() => ({}));
  if (!emailResponse.ok) {
    throw new Error(result.message || "The seller lead email could not be sent.");
  }
  return result;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const {
    first_name,
    last_name,
    email,
    phone,
    property_address,
    city,
    state,
    zip_code,
    requests_home_value_review,
    lead_source,
    landing_page,
  } = request.body || {};

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !property_address ||
    !city ||
    !state ||
    !zip_code
  ) {
    return sendJson(response, 400, {
      error: "Please complete all required fields.",
    });
  }

  if (!isValidEmail(email)) {
    return sendJson(response, 400, {
      error: "Please provide a valid email address.",
    });
  }

  const leadId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const fullName = `${first_name} ${last_name}`.trim();
  const subject = `New Seller Inquiry — ${fullName} — ${city}, ${state} ${zip_code}`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#172033;line-height:1.6">
      <h2>New Seller Inquiry</h2>
      <p>A homeowner submitted a seller consultation request through Homes Around North Houston.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Lead ID</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(leadId)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Property Address</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(property_address)}<br>${escapeHtml(city)}, ${escapeHtml(state)} ${escapeHtml(zip_code)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Home Value Review</strong></td><td style="padding:8px;border:1px solid #ddd">${requests_home_value_review ? "Requested" : "Not requested"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Lead Source</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(lead_source || "Seller Landing Page")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Landing Page</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(landing_page || "/sellers")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Submitted</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(submittedAt)}</td></tr>
      </table>
      <p style="margin-top:24px;font-size:13px;color:#667085">Homes Around North Houston is a real-estate service of Golden Cross Realty. Optional vendor requests are handled separately.</p>
    </div>`;

  try {
    await sendEmail({
      to: LEAD_NOTIFICATION_EMAIL,
      subject,
      html,
      replyTo: email,
    });

    return sendJson(response, 200, {
      success: true,
      lead_id: leadId,
      submitted_at: submittedAt,
    });
  } catch (error) {
    console.error("Seller lead email error:", error);
    return sendJson(response, 500, {
      error: "We could not submit your request at this time. Please try again.",
    });
  }
}
