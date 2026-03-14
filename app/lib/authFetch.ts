/**
 * Drop-in replacement for fetch() that automatically attaches
 * the JWT token from localStorage to every request.
 *
 * Usage (same as fetch):
 *   const res = await authFetch("/api/customers")
 *   const res = await authFetch("/api/customers", { method: "POST", body: JSON.stringify(data) })
 *   const res = await authFetch("/api/upload", { method: "POST", body: formData }) // ✅ FormData works now
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem("token")

  // ✅ Don't set Content-Type for FormData — browser sets it automatically
  // with the correct multipart boundary. Forcing application/json breaks uploads.
  const isFormData = options.body instanceof FormData

  const headers: Record<string, string> = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(options.headers as Record<string, string> || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return fetch(url, { ...options, headers })
}