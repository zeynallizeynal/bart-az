export interface ResponseError {
  errors?: Record<string, string[]>;
}

export interface ResponseSuccess {
  data?: object;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export type APIResponse<T = unknown> = {
  data: T;
  success: boolean;
  message: string;
  pagination: Pagination;
} & ResponseSuccess &
  ResponseError;

export interface BaseEntity {
  id: number;
  status: "1";
  created_at: string;
  updated_at: string;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type NullableOptional<T> = Nullable<Optional<T>>;

export type BoolStatus = "1" | "2"; // "1" = true, "2" = false

export type SearchParams = {
  [key: string]: string | undefined;
};
