import { SaveState } from "./redux/gameSlice";

const baseURL = "http://localhost:3000";

const _fetch = (input: URL | RequestInfo, init?: RequestInit) => {
  const token = window.localStorage.getItem("token");
  return fetch(baseURL + input, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
};

const userPostJson = (input: URL | RequestInfo, data: any) => {
  return _fetch(input, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
};

export const userAPI = {
  getProfile: () => _fetch("/profile").then((res) => res.json()),
  getSavedGame: (): Promise<SaveState> => _fetch("/save").then((res) => res.json()),
  saveGame: (data: SaveState) => userPostJson("/save", data),
  register: (data: { username: string; password: string }) =>
    fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  login: (data: { username: string; password: string }) =>
    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
