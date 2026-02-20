"use server";

import axios, { CreateAxiosDefaults } from "axios";
import { cookies } from "next/headers";

const conf = {
  baseURL: process.env.NEXT_SERVER_API_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
} satisfies CreateAxiosDefaults;

const apiAuth = axios.create(conf);

const api = axios.create(conf);

apiAuth.interceptors.response.use(
  async (config) => {
    return config;
  },
  async (err) => {
    // const cookie = await cookies();
    // if (err.response.status === 401) {
    //   cookie.delete("access_token");
    // }
    return Promise.reject(err);
  },
);

apiAuth.interceptors.request.use(
  async (res) => {
    const cookie = await cookies();
    const token = cookie.get("access_token")?.value;
    if (token) res.headers.Authorization = `Bearer ${token}`;
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  async (config) => {
    return config;
  },
  async (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.request.use(
  async (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

async function fetcher(url: string, init?: RequestInit) {
  return await fetch(process.env.NEXT_SERVER_API_URL + url, {
    credentials: "include",
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export { apiAuth, fetcher, api };
