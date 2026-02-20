import { BaseEntity } from "./base";

export interface Currency extends BaseEntity {
  name: string;
  symbol: string;
  order: number;
  rate: `${number}:${number}`;
}
