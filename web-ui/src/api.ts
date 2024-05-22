import { SaveState } from "./redux/gameSlice";

const baseURL = "/api";

export type APIError = {
  message: string;
};

const _fetch = (input: URL | RequestInfo, init?: RequestInit) => {
  const token = window.localStorage.getItem("token") ?? "";
  return fetch(baseURL + input, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  }).then((res) => {
    if ([400, 401, 500].includes(res.status)) {
      return res.json().then((e: APIError) => {
        throw e;
      });
    }
    return res;
  });
};

const userPostJson = <T>(input: URL | RequestInfo, data: T) => {
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
    _fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  login: (data: { username: string; password: string }) =>
    _fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
