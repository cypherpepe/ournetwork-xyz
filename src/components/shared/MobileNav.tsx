"use client";

import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks, socialLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { CustomSubstackEmbed } from "./LeftSidebar";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden flex justify-between px-4 py-5 shadow-lg">
      <Link href="/">
        <Image src="/assets/brand/OurNetwork.webp" alt="OurNetwork" width={200} height={80} priority />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon size={32} />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white font-mono flex flex-col justify-between h-full">
          <div>
            <Image src="/assets/brand/OurNetwork.webp" alt="OurNetwork" width={200} height={80} priority />

            <div className="pt-8 pb-4 mb-4 space-y-2 border-b-[2px]">
              {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                return (
                  <div key={item.label} className="font-light text-xl">
                    <SheetClose asChild>
                      <Link href={item.route} className={isActive ? "decoration-2 underline underline-offset-4" : "no-underline"}>
                        {item.label}
                      </Link>
                    </SheetClose>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center px-2 space-x-4">
              {socialLinks.map((item) => {
                return (
                  <div key={item.label}>
                    <Link href={item.url}>
                      <Image src={item.icon} alt={item.label} width={30} height={30} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative bg-zinc-100 px-2 py-8 text-center text-gray">
            <div className="absolute left-0 bottom-1/2 px-4">
              <Image src="/assets/blocks/small-1.webp" alt="green blocks" width={54} height={54} priority />
            </div>
            <div className="absolute bottom-0 left-0 py-8 px-8">
              <Image src="/assets/blocks/small-2.webp" alt="yellow blocks" width={84} height={51} priority />
            </div>
            <div className="relative">
              <div className="text-lg tracking-[0.2em] text-blue mb-6">Join OurNetwork</div>
              <div className="space-y-2 mb-14 text-sm">
                <div>{`The industry's leading onchain data newsletter.`}</div>
                <div>By the Community.</div>
                <div>For the Community.</div>
              </div>
              <div className="px-2 h-[100px] font-extralight">
                <CustomSubstackEmbed />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
