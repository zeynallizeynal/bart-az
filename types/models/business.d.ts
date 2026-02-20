import { BaseEntity, Nullable } from "./base";

export interface Business extends BaseEntity {
  name: string;
  title: string;
  description: string;
  slug: string;
  phone1: string;
  phone2: Nullable<string>;
  email: string;
  weekly_work_hour: string;
  weekend_work_hour: string;
  logo: Nullable<string>;
  address: Nullable<string>;
  advs_count: number;
}
