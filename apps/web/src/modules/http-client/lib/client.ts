import { HttpClient } from "./http-client";

const getDefaultHeaders = (): Headers => {
  const isBrowser = typeof window !== "undefined";

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if (!isBrowser) return headers;

  return headers;
};

export const apiClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_REWRITE_URL ?? "http://localhost:3000/api",
  defaultHeaders: getDefaultHeaders(),
  logger: (request, response) => {
    const method = request.init?.method ?? "unknown";
    const endpoint = request.path ?? "unknown";
    const isError = response instanceof Error;
    const issuedAt = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const logBaseMessage = `[${isError ? "😔" : "😗"}][${issuedAt}] "${method} ${endpoint}"`;
    console.groupCollapsed(logBaseMessage);
    console.log(response);
    console.groupEnd();
  },
});

export const websiteClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
  defaultHeaders: getDefaultHeaders(),
  logger: (request, response) => {
    const method = request.init?.method ?? "unknown";
    const endpoint = request.path ?? "unknown";
    const isError = response instanceof Error;
    const issuedAt = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const logBaseMessage = `[${isError ? "😔" : "😗"}][${issuedAt}] "LOCAL ${method} ${endpoint}"`;
    console.groupCollapsed(logBaseMessage);
    console.log(response);
    console.groupEnd();
  },
});
