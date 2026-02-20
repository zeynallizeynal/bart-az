import { BaseEntity } from "./base";

export interface City extends BaseEntity {
  name: string;
  description: string;
  keywords: string;
  title: string;
}
