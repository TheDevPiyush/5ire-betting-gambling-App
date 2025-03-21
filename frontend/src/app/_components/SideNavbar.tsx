"use client";

declare global {
    interface Window {
        fire?: any;
    }
}

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import '@rainbow-me/rainbowkit/styles.css';
import CustomConnectButton from "./CustomConnectButton";
interface LinkItem {
    href: string;
    icon: React.ReactNode;
    label: string;
}

interface SidebarContentProps {
    links: LinkItem[];
}

interface SideNavBarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    links: LinkItem[];
}

const SideNavBar = ({ isOpen, setIsOpen, links }: SideNavBarProps) => {
    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="block md:hidden p-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="left" className="w-[300px] p-0">
                        <SheetTitle className="my-4 mx-2 text-2xl">Navigation</SheetTitle>
                        <SidebarContent links={links} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden w-full md:block h-full">
                <div className="p-5 w-full bg-accent/30 h-full overflow-hidden rounded-md">
                    <h2 className="text-3xl font-semibold flex items-center gap-3 mb-10"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhu05xHrL89iGfHvSnNhRHM_NqFhwtXMKIw&s" className="w-10 rounded-full" alt="" /> 5ire</h2>
                    <SidebarContent links={links} />
                </div>
            </div>
        </>
    );
};

// Reusable Sidebar Content Component
const SidebarContent = ({ links }: SidebarContentProps) => {

    const pathname = usePathname();
    return (
        <div className="h-[90%] flex flex-col justify-between" >
            <div className="flex flex-col flex-1 h-full  gap-1">
                {links.map((link, index) => (
                    <Link
                        href={link.href}
                        key={index}
                        className={`p-3 ${pathname.includes(link.href) && "bg-accent text-primary font-bold"} rounded-sm w-full font-semibold hover:text-primary text-base flex gap-2 items-center cursor-pointer transition-all duration-200`}>
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>

            <CustomConnectButton />
        </div>
    );
};

export default SideNavBar;