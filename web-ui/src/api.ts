import { SavedState } from "common";
import { SaveState } from "./redux/gameSlice";
import { tokenKey } from "./redux/middleware";

const baseURL = import.meta.env.VITE_BASE_URL;

export type APIError = {
  message: string;
};

const _fetch = (input: URL | RequestInfo, init?: RequestInit) => {
  const token = window.localStorage.getItem(tokenKey) ?? "";
  return fetch(baseURL + input, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  }).then((res) => {
    if ([400, 401, 500].includes(res.status)) {
      return res
        .json()
        .catch((_e) => {
          throw new Error(res.statusText);
        })
        .then((e: APIError) => {
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

  getSavedGame: (): Promise<SaveState> =>
    _fetch("/save")
      .then((res) => res.json())
      .then((data) => {
        try {
          return SavedState.parse(data);
        } catch (e) {
          throw new Error("Validation Error");
        }
      }),

  saveGame: (data: SaveState) => userPostJson("/save", data),

  register: (data: { username: string; password: string }) =>
    userPostJson("/register", data).then((res) => res.json()),

  login: (data: { username: string; password: string }) =>
    userPostJson("/login", data).then((res) => res.json()),
};
