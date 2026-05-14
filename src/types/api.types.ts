export interface ApiResponse<TDATA = unknown> {
  success: boolean;
  message: string;
  data: TDATA;
  meta?: PaginationMeta;
}
export interface PaginationMeta {
  page: number;
  totalPage: number;
  limit: number;
  total: number;
}
export interface ApiErrorResponse {
  success: boolean;
  message: string;
}
