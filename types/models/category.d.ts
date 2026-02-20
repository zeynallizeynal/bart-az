import { BaseEntity, Nullable } from "./base";

export interface Category extends BaseEntity {
  parent_id: number;
  status: string;
  order: number;
  slug: string;
  name: string;
  type_name: string;
  adv_type: string;
  adv_type_name: string;
  children: Category[];
  parent: Nullable<Category>;
  deleted_at: Nullable<string>;
}
