import { BaseEntity, BoolStatus, Nullable } from "./base";
import { Business } from "./business";
import { Category } from "./category";
import { Currency } from "./currency";
import { City } from "./location";
import { User } from "./user";
import { Image } from "@/types/models/file";

export interface Listing extends BaseEntity {
  windows: ListingFrame;
  name: string;
  price: string;
  slug: string;
  user: User;
  sale: Nullable<string>;
  type: ListingType;
  city: City;
  currency: Currency;
  category: Category;
  head_category_id: number;
  info: ListingInfo;
  business: Nullable<Business>;
  barter: BoolStatus;
  credit: BoolStatus;
  discount: BoolStatus;
  gift: BoolStatus;
  vip: BoolStatus;
  special: BoolStatus;
  image: Image[];
  images: Image[];
}

export interface ListingType extends BaseEntity {
  slug: string;
  name: string;
  keywords: Nullable<string>;
  description: Nullable<string>;
  title: Nullable<string>;
}

export interface ListingFrame extends BaseEntity {
  name: string;
  color: string;
}

export interface ListingInfo extends BaseEntity {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_whatsapp: string;
  title: string;
  keywords: string;
  description: string;
  text: string;
  condition: string;
  delivery: string;
  view_count: string;
}
