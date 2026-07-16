import {
  DEFAULT_VENDOR_EMAIL,
  SERVICE_PROVIDERS,
} from "./_vendorConfig.js";

const RESEND_API_URL = "https://api.resend.com/emails";

function sendJson(response, status, data) {
  response.status(status).json(data);
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

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!fromEmail) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const resendResponse = await fetch(RESEND_API_URL, {
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

  const result = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    throw new Error(
      result.message || "The vendor referral email could not be sent.",
    );
  }

  return result;
}

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];

  if (Array.isArray(forwarded)) {
    return forwarded[0];
  }

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return request.socket?.remoteAddress || "";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");

    return sendJson(response, 405, {
      error: "Method not allowed.",
    });
  }

  const {
    lead_id,
    first_name,
    last_name,
    email,
    phone,
    city,
    zip_code,
    selected_services,
    consent,
    consent_text,
    consent_version,
    initial_submitted_at,
    lead_source,
    landing_page,
  } = request.body || {};

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !city ||
    !zip_code
  ) {
    return sendJson(response, 400, {
      error: "The seller contact information is incomplete.",
    });
  }

  if (!isValidEmail(email)) {
    return sendJson(response, 400, {
      error: "The seller email address is invalid.",
    });
  }

  if (!Array.isArray(selected_services) || selected_services.length === 0) {
    return sendJson(response, 400, {
      error: "Please select at least one service.",
    });
  }

  if (consent !== true) {
    return sendJson(response, 400, {
      error:
        "Affirmative consent is required before vendor requests can be sent.",
    });
  }

  const uniqueServices = [...new Set(selected_services)];

  const validServices = uniqueServices
    .map((serviceKey) => ({
      serviceKey,
      provider: SERVICE_PROVIDERS[serviceKey],
    }))
    .filter(
      ({ provider }) =>
        provider &&
        provider.active === true &&
        provider.email,
    );

  if (validServices.length === 0) {
    return sendJson(response, 400, {
      error: "No active service providers were selected.",
    });
  }

  const submittedAt = new Date().toISOString();
  const clientIp = getClientIp(request);
  const userAgent = request.headers["user-agent"] || "";
  const fullName = `${first_name} ${last_name}`.trim();

  const sendResults = [];

  for (const { serviceKey, provider } of validServices) {
    const recipientEmail =
      provider.email || DEFAULT_VENDOR_EMAIL;

    const subject = `New Seller Service Request — ${
      provider.serviceLabel
    } — ${city}, TX ${zip_code}`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6;">
        <h2 style="margin-bottom: 8px;">New Consumer-Requested Service Contact</h2>

        <p style="margin-top: 0;">
          This consumer affirmatively selected <strong>${escapeHtml(
            provider.serviceLabel,
          )}</strong> and requested contact from a service provider.
        </p>

        <table style="border-collapse: collapse; width: 100%; max-width: 680px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Lead ID</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              lead_id || "",
            )}</td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Requested Service</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              provider.serviceLabel,
            )}</td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              fullName,
            )}</td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              email,
            )}</td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              phone,
            )}</td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Area</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${escapeHtml(city)}, TX ${escapeHtml(zip_code)}
            </td>
          </tr>

          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Request Submitted</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(
              submittedAt,
            )}</td>
          </tr>
        </table>

        <div style="margin-top: 22px; padding: 14px; background: #f4f5f7; border-radius: 8px;">
          <strong>Provider Contact Restrictions</strong>

          <p style="margin-bottom: 0; font-size: 13px;">
            This consumer requested contact regarding the service listed above.
            Contact must be limited to that request. Do not add the consumer to
            unrelated marketing lists, resell the lead, share the information
            with another party, or represent that your business is employed,
            approved, guaranteed, or endorsed by Homes Around North Houston or
            Golden Cross Realty.
          </p>
        </div>

        <p style="margin-top: 18px; font-size: 12px; color: #667085;">
          The consumer's street address was intentionally not included.
          Confirm the service address directly with the consumer after contact.
        </p>
      </div>
    `;

    try {
      const emailResult = await sendEmail({
        to: recipientEmail,
        subject,
        html,
        replyTo: email,
      });

      sendResults.push({
        service: serviceKey,
        recipient: recipientEmail,
        success: true,
        email_id: emailResult.id || null,
      });
    } catch (error) {
      console.error(
        `Vendor referral email error for ${serviceKey}:`,
        error,
      );

      sendResults.push({
        service: serviceKey,
        recipient: recipientEmail,
        success: false,
        error: error.message,
      });
    }
  }

  const successfulRequests = sendResults.filter(
    (result) => result.success,
  );

  if (successfulRequests.length === 0) {
    return sendJson(response, 500, {
      error:
        "We could not send your service requests at this time. Please try again.",
    });
  }

  console.info("Vendor referral consent record", {
    lead_id,
    consent,
    consent_text,
    consent_version,
    selected_services: uniqueServices,
    submitted_at: submittedAt,
    initial_submitted_at,
    lead_source,
    landing_page,
    client_ip: clientIp,
    user_agent: userAgent,
    send_results: sendResults,
  });

  return sendJson(response, 200, {
    success: true,
    submitted_at: submittedAt,
    sent_services: successfulRequests.map(
      (result) => result.service,
    ),
    failed_services: sendResults
      .filter((result) => !result.success)
      .map((result) => result.service),
  });
}