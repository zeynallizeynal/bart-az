import { ComponentProps } from "react";

export default function MobileNavBackground({ ...etc }: ComponentProps<"svg">) {
  return (
    <svg
      width="376"
      height="66"
      viewBox="0 0 376 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...etc}
    >
      <path
        d="M0 0H94.75H129C142.255 0 152.554 11.6712 159.989 22.6442C165.014 30.0599 173.652 36.4337 188.5 36.4337C203.808 36.4337 212.696 30.0252 217.856 22.5836C225.409 11.6913 235.745 0 249 0H280H376V66H0V0Z"
        fill="white"
      />
    </svg>
  );
}
