const _fetch = (input: URL | RequestInfo, init?: RequestInit) => {
  const token = window.localStorage.getItem("token");
  return fetch(input, {
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
  loadGame: () => _fetch("/profile").then((res) => res.json()),
  saveGame: (data) => userPostJson("http://localhost:3000/save", data),
  register: (data: { username: string; password: string }) =>
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  login: (data: { username: string; password: string }) =>
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
