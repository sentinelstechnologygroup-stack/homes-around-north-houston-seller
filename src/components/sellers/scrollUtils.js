// Opens the seller consultation modal from any CTA on the seller page.
// The optional home-value flag is passed to the modal through the event detail.
export function scrollToSellerForm({ checkHomeValue = false } = {}) {
  window.dispatchEvent(
    new CustomEvent("open-seller-consultation", {
      detail: { checkHomeValue },
    }),
  );
}
