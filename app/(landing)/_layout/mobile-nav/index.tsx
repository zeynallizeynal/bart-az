import MobileNavLinks from "@/app/(landing)/_layout/mobile-nav/mobile-nav-links";

export default async function MobileNav() {
  return (
    <div className="fixed z-40 bottom-0 md:hidden block w-full opacity-100 animate-in fade-in-0 duration-500 bg-background">
      <div className="w-full relative flex items-center justify-center h-16.5 font-semibold text-xs text-gray-400">
        <div className="flex justify-center h-14 max-w-94 w-full">
          <MobileNavLinks />
        </div>
      </div>
    </div>
  );
}
