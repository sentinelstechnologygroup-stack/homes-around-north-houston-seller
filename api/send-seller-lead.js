import crypto from "node:crypto";

const FORMSPREE_SELLER_ENDPOINT =
  process.env.FORMSPREE_SELLER_ENDPOINT ||
  "https://formspree.io/f/xpqvpzke";

function sendJson(response, status, data) {
  return response.status(status).json(data);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function submitToFormspree(endpoint, payload) {
  const formspreeResponse = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await formspreeResponse.json().catch(() => ({}));

  if (!formspreeResponse.ok) {
    const fieldError = Array.isArray(result.errors)
      ? result.errors.map((item) => item.message).filter(Boolean).join(" ")
      : "";

    throw new Error(
      fieldError ||
        result.error ||
        "Formspree could not accept the seller request.",
    );
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

  const formspreePayload = {
    _subject: `New Seller Inquiry — ${fullName} — ${city}, ${state} ${zip_code}`,
    form_type: "Initial Seller Consultation",
    lead_id: leadId,
    submitted_at: submittedAt,
    first_name,
    last_name,
    full_name: fullName,
    email,
    phone,
    property_address,
    city,
    state,
    zip_code,
    requests_home_value_review: requests_home_value_review
      ? "Yes"
      : "No",
    lead_source: lead_source || "Seller Landing Page",
    landing_page: landing_page || "/sellers",
    brokerage_disclosure:
      "Homes Around North Houston is a real-estate service of Golden Cross Realty.",
  };

  try {
    await submitToFormspree(
      FORMSPREE_SELLER_ENDPOINT,
      formspreePayload,
    );

    return sendJson(response, 200, {
      success: true,
      lead_id: leadId,
      submitted_at: submittedAt,
    });
  } catch (error) {
    console.error("Seller Formspree submission error:", error);

    return sendJson(response, 500, {
      error:
        error instanceof Error
          ? error.message
          : "We could not submit your request at this time. Please try again.",
    });
  }
}
