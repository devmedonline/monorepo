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
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...init?.headers,
      },
    });

    if (response.status >= 400) {
      const error = await response.json();
      throw new ApiError(error.message, response.status);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    throw new ApiError(message, 500);
  }
}
