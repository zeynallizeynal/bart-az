import Image from "next/image";
import React, { SetStateAction } from "react";
import { fakeUsers } from "@/app/(landing)/_sections/stories";

export default function StoryPrevUser({
  prevUser,
  setSelectedUser,
  selectedUser,
}: {
  prevUser: (typeof fakeUsers)[number];
  selectedUser: number;
  setSelectedUser: React.Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex-1 flex flex-col justify-center animate-fade-in opacity-0 delay-200">
      {prevUser && (
        <div className="rounded-2xl hidden container:block w-[180px] h-80 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-[1]" />
          <Image
            src={prevUser.stories[prevUser.stories.length - 1].ad.image}
            alt={prevUser.stories[prevUser.stories.length - 1].ad.name}
            fill
            quality={100}
            className="object-cover"
          />
          <div className="flex flex-col items-center justify-center h-full relative z-[1] gap-3">
            <button
              className="p-[3px] inline-block bg-story-linear-bg rounded-full w-24"
              onClick={() => setSelectedUser((prevState) => prevState - 1)}
            >
              <div className="p-[3px] bg-black rounded-full relative">
                <div className="absolute inset-[3px] bg-story-linear-bg rounded-full" />
                <Image
                  src={`/images/stories/image${selectedUser - 1}.png`}
                  alt={prevUser.user}
                  width={86}
                  height={86}
                  className="hover:opacity-50 transition relative z-[1]"
                />
              </div>
            </button>
            <div className="font-medium text-sm text-background text-center">
              {prevUser.stories[prevUser.stories.length - 1].ad.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
