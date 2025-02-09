function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/"); // Convert URL-safe base64 to normal base64
  while (base64.length % 4) {
    base64 += "="; // Fix padding if needed
  }
  return atob(base64); // Decode Base64
}

export default function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));

  return { header, payload };
}
