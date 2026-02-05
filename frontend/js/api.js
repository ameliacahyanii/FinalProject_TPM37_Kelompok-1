async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  (async () => {
    try {
      const res = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          teamName: "test",
          password: "test123",
        }),
      });

      console.log("API SUCCESS:", res);
    } catch (err) {
      console.error("API ERROR:", err.message);
    }
  })();

  return data;
}
