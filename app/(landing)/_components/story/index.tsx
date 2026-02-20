"use client";

import type { fakeUsers } from "@/app/(landing)/_sections/stories";
import { Logo } from "@/components/icons/logo";
import { ChevronLeft, ChevronRight, XClose } from "bartaz-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import StoryNextUser from "@/app/(landing)/_components/story/story-next-user";
import StoryPrevUser from "@/app/(landing)/_components/story/story-prev-user";

const story_duration = 10000; // ms

export default function Story({
  users,
  user,
  userIndex,
}: {
  user: (typeof fakeUsers)[number];
  userIndex: number;
  users: typeof fakeUsers;
}) {
  const [open, setOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<number>(-1);
  const [storyIndex, setStoryIndex] = React.useState<number>(0);

  const prevUser = users[selectedUser - 1];
  const nextUser = users[selectedUser + 1];
  const currentUser = users[selectedUser];

  const goNextStory = useCallback(() => {
    if (currentUser?.stories[storyIndex + 1]) {
      setStoryIndex((prevState) => prevState + 1);
    } else if (nextUser) {
      setSelectedUser((prevState) => prevState + 1);
      setStoryIndex(0);
    } else return;
  }, [currentUser?.stories, storyIndex, nextUser]);

  const goPrevStory = useCallback(() => {
    if (currentUser?.stories[storyIndex - 1]) {
      setStoryIndex((prevState) => prevState - 1);
    } else if (prevUser) {
      setSelectedUser((prevState) => prevState - 1);
      setStoryIndex(0);
    } else return;
  }, [currentUser?.stories, storyIndex, prevUser]);

  useEffect(() => {
    const timer = setTimeout(goNextStory, story_duration);
    return () => clearTimeout(timer);
  }, [goNextStory]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) setStoryIndex(0);
      }}
    >
      <DialogTrigger
        className="inline-flex flex-col items-center gap-3 group"
        onClick={() => {
          setSelectedUser(userIndex);
        }}
      >
        <div className="rounded-full md:size-[124px] size-20 flex items-center justify-center">
          <div
            className={cn(
              "p-[3px] z-10 inline-block bg-story-linear-bg rounded-full",
            )}
          >
            <div className="p-[3px] bg-background rounded-full relative">
              <div className="absolute inset-[3px] bg-story-linear-bg rounded-full" />
              <Image
                src={`/images/stories/image${userIndex}.png`}
                alt={user.stories[user.stories.length - 1].title}
                width={112}
                height={112}
                className="hover:opacity-50 transition relative z-[1]"
              />
            </div>
          </div>
        </div>
        <div className="md:text-base text-xs font-medium h-12 text-center line-clamp-2 transition group-hover:text-blue-600">
          {user.stories[user.stories.length - 1].title}
        </div>
      </DialogTrigger>
      {selectedUser !== -1 && (
        <DialogContent
          className="container h-full py-4"
          overlayProps={{
            className: "bg-black/90 backdrop-blur",
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Hekayələr</DialogTitle>
            <DialogDescription>
              İnsanların hekayələri vasitəsilə reklamlarına baxın
            </DialogDescription>
          </VisuallyHidden>
          <div className="flex flex-col lg:gap-24 md:gap-16 gap-10 justify-center">
            <div className="flex justify-between text-background items-center">
              <Logo size={36} />
              <DialogClose className="rounded-full md:size-14 size-10 md:text-2xl text-base border border-gray-700 text-background inline-flex items-center justify-center hover:bg-gray-800 transition">
                <XClose />
              </DialogClose>
            </div>
            <div className="flex xl:gap-[90px] lg:gap- md:gap-10 justify-center">
              <StoryPrevUser
                prevUser={prevUser}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
              <div className="flex items-center md:gap-10 gap-6">
                <button
                  aria-label="əvvəlki hekayə"
                  className="flex items-center justify-center md:size-14 size-10 md:text-3xl text-base shrink-0 place-justify-center border border-gray-700 rounded-full text-background hover:bg-gray-800 transition"
                  onClick={goPrevStory}
                >
                  <ChevronLeft />
                </button>
                <div className="max-w-[396px] w-full flex flex-col gap-2">
                  <div className="flex gap-1 items-center h-[1.125rem]">
                    {users[selectedUser].stories.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex-1 rounded-custom bg-gray-500 relative h-1 overflow-hidden",
                          index < storyIndex && "bg-blue-500",
                        )}
                      >
                        {index === storyIndex && (
                          <div
                            className={cn(
                              "absolute inset-0 bg-blue-500",
                              // "animate-story-progress"
                            )}
                            style={
                              storyIndex
                                ? {
                                    animationDuration: `${story_duration}ms`,
                                  }
                                : undefined
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col rounded-custom-xl bg-gray-50">
                    <div className="flex items-center p-6 gap-3">
                      <Image
                        src={`/images/stories/image${selectedUser}.png`}
                        width={32}
                        height={32}
                        alt={users[selectedUser].user}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium">
                        {users[selectedUser].user}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 gap-2.5 border border-gray-200 rounded-custom-xl bg-background p-4">
                      <div className="border border-gray-200 rounded-custom-xl flex flex-col">
                        <Image
                          src={
                            users[selectedUser].stories[storyIndex]?.ad.image ||
                            "/placeholder.svg"
                          }
                          alt={users[selectedUser].stories[storyIndex]?.ad.name}
                          width={364}
                          height={298}
                          className="rounded-custom-xl shrink-0 lg:h-[298px]"
                        />
                        <div className="p-5 space-y-1">
                          <p className="font-bold text-xl line-clamp-1 text-gray-800">
                            {users[selectedUser].stories[storyIndex].ad.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {users[selectedUser].stories[storyIndex].ad.date}
                          </p>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Link
                          href={users[selectedUser].stories[storyIndex].ad.href}
                          className="flex items-center justify-center rounded-xl text-blue-600 font-semibold bg-blue-50 w-full hover:bg-blue-100 transition h-12"
                        >
                          Elana keçid
                        </Link>
                      </DialogClose>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="növbəti hekayə"
                  className="flex items-center justify-center md:size-14 size-10 md:text-3xl text-base shrink-0 place-justify-center border border-gray-700 rounded-full text-background hover:bg-gray-800 transition"
                  onClick={goNextStory}
                >
                  <ChevronRight />
                </button>
              </div>
              <StoryNextUser
                nextUser={nextUser}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
