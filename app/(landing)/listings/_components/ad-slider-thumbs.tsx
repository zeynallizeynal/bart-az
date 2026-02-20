import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { Image as ImageType } from "@/types/models/file";

export default function AdSliderThumbs({
  data,
  isEditable,
  slideTo,
  activeIndex,
}: {
  data: ImageType[];
  isEditable?: boolean;
  slideTo: (index: number) => void;
  activeIndex: number;
}) {
  return (
    <div
      className="flex items-center gap-4 overflow-auto scroll-smooth"
      style={{
        scrollbarWidth: "thin",
      }}
    >
      {data.map((image, index) => (
        <div key={index} className="shrink-0 relative">
          {isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute z-[2] top-2 right-2 bg-background rounded w-7 h-6 flex items-center justify-center cursor-default">
                  <BsThreeDots />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="px-2 py-1.5 cursor-default focus:bg-gray-100">
                    Test
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-2 py-1.5 cursor-default focus:bg-gray-100">
                    Test
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            onClick={() => slideTo(index)}
            className={cn(
              "rounded-lg transition",
              activeIndex === index ? "opacity-100" : "opacity-75",
            )}
          >
            <Image src={image.full_url} alt="image" width={96} height={80} />
          </button>
        </div>
      ))}
    </div>
  );
}
