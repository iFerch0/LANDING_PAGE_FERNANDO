// src/lib/types/common.types.ts
// Tipos utilitarios compartidos entre módulos

/** Resultado genérico de operaciones de servicio */
export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

/** Estado de carga para componentes */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Respuesta de API estandarizada */
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Paginación */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/** Información de auditoría común a entidades */
export interface AuditFields {
  created_at: string;
  updated_at: string;
}
