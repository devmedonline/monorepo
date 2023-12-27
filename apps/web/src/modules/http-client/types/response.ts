import { PaginationResponse } from "./pagination";

export class ErrorResponse<E = any> extends Error {
  // Status fixo para erros
  status: "error";

  // Códigos de erro mapeados na documentação
  code: string;

  // Mensagem amigável para o usuário
  message: string;

  // Erros de validação de campos
  fieldErrors?: Array<E>;

  constructor(options: { code: string; message: string; fieldErrors?: Array<E> }) {
    super(options.message);
    this.code = options.code;
    this.message = options.message;
    this.fieldErrors = options.fieldErrors;
    this.status = "error";
  }
}

export function isErrorResponse(response: any): response is ErrorResponse {
  return response.status === "error";
}

export type SuccessResponseData = Record<string, any>;
export class SuccessResponse<T extends SuccessResponseData> {
  // Status fixo para sucesso
  status: "success";

  // Dados da resposta
  data: T;

  // Informações de paginação
  pagination: PaginationResponse | null;

  constructor(options: { data: T; pagination?: PaginationResponse | null }) {
    this.data = options.data;
    this.pagination = options.pagination || null;
    this.status = "success";
  }
}

export function isSuccessResponse<T extends SuccessResponseData>(response: any): response is SuccessResponse<T> {
  return response.status === "success";
}

export type ApiResponse<T extends SuccessResponseData, E = any> = ErrorResponse<E> | SuccessResponse<T>;
