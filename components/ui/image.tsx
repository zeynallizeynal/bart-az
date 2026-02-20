import ImagePrimitive, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImageProps {
  variant?: "default" | "fullWidth" | "halfWidth" | "thumbnail";
}

export function OptimizedImage({
  variant = "default",
  className,
  ...props
}: OptimizedImageProps) {
  let sizes;
  switch (variant) {
    case "fullWidth":
      sizes = "100vw";
      break;
    case "halfWidth":
      sizes = "(max-width: 768px) 100vw, 50vw";
      break;
    case "thumbnail":
      sizes = "(max-width: 768px) 100px, 200px";
      break;
    default:
      sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  }

  return (
    <ImagePrimitive
      className={cn("w-full h-auto", className)}
      fill
      sizes={sizes}
      {...props}
    />
  );
}

export function Image({
  size,
  width,
  height,
  className,
  ...props
}: ImageProps & { size?: number | `${number}` | undefined }) {
  return (
    <ImagePrimitive
      width={size || width}
      height={size || height}
      className={cn(size && "aspect-square", className)}
      {...props}
    />
  );
}
