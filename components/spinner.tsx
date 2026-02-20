import { Progress } from "@/components/icons/others";

export default function Spinner() {
  return (
    <span className="animate-spin inline-flex items-center justify-center">
      <Progress />
    </span>
  );
}
