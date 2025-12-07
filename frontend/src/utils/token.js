export const saveToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

// parse JWT payload and check expiry
export const parseJwt = (token) => {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    // add padding if needed
    const b64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true; // treat invalid token as expired
  // exp is typically a numeric timestamp (seconds)
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
};

// Convenient check for overall validity
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
};
