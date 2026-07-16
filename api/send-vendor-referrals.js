import {
  DEFAULT_VENDOR_EMAIL,
  SERVICE_PROVIDERS,
} from "./_vendorConfig.js";

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
        "Formspree could not accept the service request.",
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
    lead_id,
    first_name,
    last_name,
    email,
    phone,
    city,
    state,
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
    !state ||
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

  const validServices = [...new Set(selected_services)]
    .map((serviceKey) => ({
      serviceKey,
      provider: SERVICE_PROVIDERS[serviceKey],
    }))
    .filter(
      ({ provider }) =>
        provider?.active && provider?.formEndpoint,
    );

  if (validServices.length === 0) {
    return sendJson(response, 400, {
      error: "No active service providers were selected.",
    });
  }

  const submittedAt = new Date().toISOString();
  const fullName = `${first_name} ${last_name}`.trim();
  const results = [];

  for (const { serviceKey, provider } of validServices) {
    const intendedRecipient = provider.email || DEFAULT_VENDOR_EMAIL;

    const formspreePayload = {
      _subject: `New Seller Service Request — ${provider.serviceLabel} — ${city}, ${state} ${zip_code}`,
      form_type: "Optional Seller Service Request",
      lead_id: lead_id || "",
      initial_submitted_at: initial_submitted_at || "",
      service_request_submitted_at: submittedAt,
      requested_service_key: serviceKey,
      requested_service: provider.serviceLabel,
      provider_name: provider.providerName,
      intended_recipient: intendedRecipient,
      first_name,
      last_name,
      full_name: fullName,
      email,
      phone,
      city,
      state,
      zip_code,
      street_address_shared: "No",
      affirmative_consent: "Yes",
      consent_text,
      consent_version,
      lead_source:
        lead_source || "Seller Landing Page Optional Service Request",
      landing_page: landing_page || "/sellers",
      provider_contact_restrictions:
        "Contact must be limited to this consumer-requested service. Do not resell the lead, add the consumer to unrelated marketing lists, share the information with another party, or imply endorsement by Homes Around North Houston or Golden Cross Realty.",
    };

    try {
      const formspreeResult = await submitToFormspree(
        provider.formEndpoint,
        formspreePayload,
      );

      results.push({
        service: serviceKey,
        success: true,
        formspree_id: formspreeResult.id || null,
        intended_recipient: intendedRecipient,
      });
    } catch (error) {
      console.error(
        `Vendor Formspree submission error for ${serviceKey}:`,
        error,
      );

      results.push({
        service: serviceKey,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Formspree error.",
        intended_recipient: intendedRecipient,
      });
    }
  }

  const successful = results.filter((item) => item.success);

  if (successful.length === 0) {
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
    selected_services,
    submitted_at: submittedAt,
    initial_submitted_at,
    lead_source,
    landing_page,
    results,
  });

  return sendJson(response, 200, {
    success: true,
    submitted_at: submittedAt,
    sent_services: successful.map((item) => item.service),
    failed_services: results
      .filter((item) => !item.success)
      .map((item) => item.service),
  });
}
