const TOKEN_KEY = "ams_token";
const REFRESH_TOKEN_KEY = "ams_refresh_token";
const USER_KEY = "ams_user";

// Access Token
export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Refresh Token
export function saveRefreshToken(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Save both tokens
export function saveTokens(token: string, refreshToken: string) {
  saveToken(token);
  saveRefreshToken(refreshToken);
}

// Remove both tokens
export function removeTokens() {
  removeToken();
  removeRefreshToken();
}

// User
export function saveUser(user: unknown) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(USER_KEY);

  return data ? JSON.parse(data) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Clear authentication data
export function clearAuth() {
  removeTokens();
  removeUser();
}
