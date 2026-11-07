const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const api = {
  getCompanies: () => request("/api/companies"),
  getCompanyNames: () => request("/api/companies/names"),
  compareCompanies: (name1, name2) => request(`/api/companies/compare?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`),
  getCompanyDirectory: () => request("/api/companies/directory"),
  getJobs: (role) => request(`/api/jobs${role ? `?role=${encodeURIComponent(role)}` : ""}`),
  getRoles: () => request("/api/roles"),
  getTechnologies: () => request("/api/technologies"),
  getTechnology: (name) => request(`/api/technologies/${encodeURIComponent(name)}`),
  signupCompany: (payload) => request("/api/companies/signup", { method: "POST", body: JSON.stringify(payload) }),
  loginCompany: (payload) => request("/api/companies/login", { method: "POST", body: JSON.stringify(payload) }),
};
