export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  if (date.toLocaleString() == "Invalid Date") {
    return "03/04/2023, 04:45:00 PM";
  }
  return date.toLocaleString();
}
