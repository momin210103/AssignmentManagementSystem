const TOKEN_KEY = "ams_token";
const USER_KEY = "ams_user";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

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
