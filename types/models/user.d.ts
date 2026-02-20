import { BaseEntity, BoolStatus } from "@/types/models/base";

export interface User extends BaseEntity {
  name: string;
  email: string;
  email_verified_at: string | null;
  status: string;
  image: string[];
  balance: number;
  birthday: string;
  gender: BoolStatus;
  phone: string;
  whatsapp: string;
}
