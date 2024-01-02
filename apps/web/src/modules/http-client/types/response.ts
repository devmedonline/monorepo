import { PaginationResponse } from './pagination';

export class ErrorResponse<E = any> extends Error {
  success: false;

  // Códigos de erro mapeados na documentação
  code: string;

  // Mensagem amigável para o usuário
  message: string;

  // Erros de validação de campos
  fieldErrors?: Array<E>;

  constructor(options: {
    code: string;
    message: string;
    fieldErrors?: Array<E>;
  }) {
    super(options.message);
    this.code = options.code;
    this.message = options.message;
    this.fieldErrors = options.fieldErrors;
    this.success = false;
  }
}

export function isErrorResponse(response: any): response is ErrorResponse {
  return response.success === false;
}

export type SuccessResponseData = Record<string, any>;
export class SuccessResponse<T extends SuccessResponseData> {
  // Status fixo para sucesso
  success: true;

  // Dados da resposta
  data: T;

  // Informações de paginação
  pagination: PaginationResponse | null;

  message: string;

  constructor(options: {
    data: T;
    pagination?: PaginationResponse | null;
    message?: string;
  }) {
    this.data = options.data;
    this.pagination = options.pagination || null;
    this.success = true;
    this.message = options.message || 'Requisição realizada com sucesso';
  }
}

export function isSuccessResponse<T extends SuccessResponseData>(
  response: any
): response is SuccessResponse<T> {
  return response.success === true;
}

export type ApiResponse<T extends SuccessResponseData, E = any> =
  | ErrorResponse<E>
  | SuccessResponse<T>;
