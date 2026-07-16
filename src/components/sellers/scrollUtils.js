// Shared scroll helper for the seller strategy-call form.
// Scrolls smoothly to the form section and optionally signals the
// "preliminary home value review" checkbox to be auto-checked.
export function scrollToSellerForm({ checkHomeValue = false } = {}) {
  const el = document.getElementById("seller-strategy-call");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (checkHomeValue) {
    // Allow the form to react after the scroll begins.
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("seller-check-home-value"));
    }, 350);
  }
}