export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/**
 * @throws ApiError
 * @param input URL utilizando como base a URL da API
 * @param init Dados da requisição
 * @returns Promise com o resultado da requisição em JSON
 */
export async function fetchApi<T>(
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<{ data: T }> {
  try {
    // Mantém a base da URL da API e adiciona o caminho da requisição
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
    const apiUrl = new URL(NEXT_PUBLIC_API_URL);
    const url = new URL(input.toString(), apiUrl);
    url.pathname = apiUrl.pathname + url.pathname;

    // Realiza a requisição
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...init?.headers,
      },
    });

    // Verifica se a requisição foi bem sucedida
    if (response.status >= 400) {
      const error = await response.json();

      if (process.env.NODE_ENV === "development") {
        console.error("API Error", error);
      }

      throw new ApiError(error.message, response.status);
    }

    // Retorna o resultado da requisição
    return response.json();
  } catch (error) {
    // Verifica se o erro é uma instância de ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // Caso contrário, lança um erro genérico como ApiError
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    throw new ApiError(message, 500);
  }
}
