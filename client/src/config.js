// Base URL of the Yanited Store Express backend.
// The React frontend fetches product data from this API.
export const API_URL = "http://localhost:5000/api";

// Formats a number as a price with thousands separators (Indian grouping)
// and exactly two decimal places, e.g. 1299.9 -> "1,299.90".
export function formatPrice(amount) {
  return Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
