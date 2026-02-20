import { BaseEntity } from "./base";

export type FileType = "image" | "video";
export type FileExtension = "jpg" | "jpeg" | "png" | "gif" | "mp4";

export interface Image extends BaseEntity {
  image: string;
  alt: string;
  path: string;
  full_url: string;
  size: number;
  dimensions: `${number}x${number}`;
  isCover: string;
  mime_type: `${FileType}/${FileExtension}`;
}
