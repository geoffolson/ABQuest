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
  saveGame: (data) => userPostJson("/save", data),
};
