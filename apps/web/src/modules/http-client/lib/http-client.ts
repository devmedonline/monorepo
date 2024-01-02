import {
  ApiResponse,
  ErrorResponse,
  SuccessResponse,
  SuccessResponseData,
  isErrorResponse,
  isSuccessResponse,
} from '../types/response';

type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

type FormDataBasicValue = string | Blob;
type FormDataSerializable =
  | FormDataBasicValue
  | FormDataBasicValue[]
  | { [key: string]: FormDataSerializable };

type URLSearchParamsBasicValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date;
type URLSearchParamsSerializable = {
  [key: string]: URLSearchParamsBasicValue | URLSearchParamsBasicValue[];
};

type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'
  | 'CONNECT';
type Guard<T extends SuccessResponseData> = (
  data: SuccessResponseData
) => data is T;

type HttpClientRequestInit = Omit<
  RequestInit,
  'body' | 'method' | 'searchParams'
> & {
  method: HTTPMethod;
  body?: BodyInit | JSONSerializable | FormDataSerializable | any;
  searchParams?: URLSearchParams | URLSearchParamsSerializable;
};

type RequestOptions<T extends SuccessResponseData> = {
  path: string;
  init?: HttpClientRequestInit;
  guard: Guard<T>;
};

type SpecificRequestOptions<T extends SuccessResponseData> = Omit<
  RequestOptions<T>,
  'init'
> & {
  init?: Omit<HttpClientRequestInit, 'method'>;
};

type HttpClientOptions = {
  baseURL: string;
  defaultHeaders?: Headers;
  logger?: (request: RequestOptions<any>, response: ApiResponse<any>) => void;
};

export class HttpClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Headers = new Headers();
  private readonly logger?: (
    request: RequestOptions<any>,
    response: ApiResponse<any>
  ) => void;

  constructor(options: HttpClientOptions) {
    this.baseURL = options.baseURL;
    this.defaultHeaders.set('Content-Type', 'application/json');
    this.defaultHeaders.set('Accept', 'application/json');
    this.logger = options.logger;

    if (options.defaultHeaders) {
      options.defaultHeaders.forEach((value, key) => {
        this.defaultHeaders.set(key, value);
      });
    }
  }

  /**
   * Realiza uma requisição HTTP
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public async createRequest<T extends SuccessResponseData>(
    options: RequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    const { guard, path, init } = options;

    const originalUrl = new URL(this.baseURL);
    const url = new URL(originalUrl.pathname + path, originalUrl);

    // Adiciona os headers padrões da aplicação na requisição
    const headers = new Headers(this.defaultHeaders);
    if (init && init.headers) {
      const initHeaders = new Headers(init.headers);

      initHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    // Adiciona os parâmetros de busca na URL
    let serializedSearchParams: string | undefined;
    if (init && init.searchParams) {
      if (init.searchParams instanceof URLSearchParams) {
        serializedSearchParams = init.searchParams.toString();
      } else {
        serializedSearchParams = serializeURLSearchParams(
          init.searchParams
        ).toString();
      }
    }
    if (serializedSearchParams) {
      url.search = serializedSearchParams;
    }

    // Adiciona o corpo da requisição
    let body: BodyInit | undefined;
    if (init && init.body) {
      if (
        init.body instanceof FormData ||
        init.body instanceof URLSearchParams ||
        init.body instanceof Blob ||
        typeof init.body === 'string' ||
        init.body instanceof ArrayBuffer
      ) {
        body = init.body;
      } else if (typeof init.body === 'object') {
        if (
          headers.get('Content-Type') === 'application/x-www-form-urlencoded'
        ) {
          body = serializeURLSearchParams(init.body as any).toString();
        } else {
          body = serializeJSONBody(init.body as any);
        }
      } else {
        body = String(init.body);
      }
    }

    // Organiza as opções da requisição
    const requestInit: RequestInit = {
      ...init,
      headers,
      body,
    };

    // Realiza a requisição HTTP
    const response = await fetch(url.toString(), requestInit);

    // Verifica se a resposta deve ser parseada como JSON ou texto
    let parsedResponse: any;
    if (headers.get('Accept') === 'application/json') {
      parsedResponse = await response.json().catch((e) => {
        throw new ErrorResponse({
          code: 'HTTP_UNEXPECTED_RESPONSE',
          message: 'Erro ao tentar parsear a resposta da requisição',
        });
      });
    } else {
      parsedResponse = await response.text();
    }

    // Verifica se a resposta é um erro
    if (!response.ok || isErrorResponse(parsedResponse)) {
      const errorResponse = isErrorResponse(parsedResponse)
        ? parsedResponse
        : undefined;

      const hasMessage = (value: any): value is { message: string } => {
        return (
          typeof value === 'object' && value !== null && 'message' in value
        );
      };

      const message = errorResponse
        ? errorResponse.message
        : hasMessage(parsedResponse)
          ? parsedResponse.message
          : String(parsedResponse);

      const code = errorResponse
        ? errorResponse.code
        : 'HTTP_' + response.status;
      const fieldErrors = errorResponse ? errorResponse.fieldErrors : undefined;

      throw new ErrorResponse({ code, message, fieldErrors });
    }

    // Verifica se a resposta é um sucesso
    if (!isSuccessResponse(parsedResponse) || !guard(parsedResponse.data)) {
      throw new ErrorResponse({
        code: 'HTTP_UNEXPECTED_RESPONSE',
        message: 'A resposta da requisição não foi a esperada',
      });
    }

    return new SuccessResponse({
      data: parsedResponse.data,
      message: parsedResponse.message,
      pagination: parsedResponse.pagination,
    });
  }

  public async request<T extends SuccessResponseData>(
    options: RequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    try {
      const response = await this.createRequest(options);
      this.logger?.(options, response);
      return response;
    } catch (error) {
      this.logger?.(options, error as any);
      if (error instanceof Error) {
        const failedToFetch = /Failed to fetch/i.test(error.message);

        if (failedToFetch) {
          throw new ErrorResponse({
            code: 'HTTP_FAILED_TO_FETCH',
            message: 'Não foi possível realizar a requisição',
          });
        }
      }

      throw error;
    }
  }

  /**
   * Realiza uma requisição HTTP GET
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public get<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'GET' },
    });
  }

  /**
   * Realiza uma requisição HTTP POST
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public post<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'POST' },
    });
  }

  /**
   * Realiza uma requisição HTTP PUT
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public put<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'PUT' },
    });
  }

  /**
   * Realiza uma requisição HTTP PATCH
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public patch<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'PATCH' },
    });
  }

  /**
   * Realiza uma requisição HTTP DELETE
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public delete<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'DELETE' },
    });
  }

  /**
   * Realiza uma requisição HTTP HEAD
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public head<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'HEAD' },
    });
  }

  /**
   * Realiza uma requisição HTTP OPTIONS
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public options<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'OPTIONS' },
    });
  }

  /**
   * Realiza uma requisição HTTP TRACE
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public trace<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'TRACE' },
    });
  }

  /**
   * Realiza uma requisição HTTP CONNECT
   * @param options Opções da requisição HTTP (path, init, guard)
   * @returns Uma Promise com o resultado da requisição HTTP
   */
  public connect<T extends SuccessResponseData>(
    options: SpecificRequestOptions<T>
  ): Promise<SuccessResponse<T>> {
    return this.request({
      ...options,
      init: { ...options.init, method: 'CONNECT' },
    });
  }
}

export function serializeJSONBody(body: JSONSerializable): string {
  return JSON.stringify(body);
}

export function serializeFormDataBody(body: FormDataSerializable): FormData {
  const formData = new FormData();

  if (Array.isArray(body)) {
    body.forEach((value) => {
      formData.append('', value);
    });
  } else if (typeof body === 'object') {
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });
  } else {
    formData.append('', body);
  }

  return formData;
}

export function serializeURLSearchParams(
  searchParams: URLSearchParamsSerializable
): URLSearchParams {
  const params = new URLSearchParams();

  const toString = (value: URLSearchParamsBasicValue): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (value instanceof Date) return value.toISOString();
    return String(value);
  };

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => {
        params.append(key, toString(value));
      });
    } else {
      params.append(key, toString(value));
    }
  });

  return params;
}
