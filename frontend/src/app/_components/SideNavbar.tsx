"use client";

// Extend the Window interface to include the fire property
declare global {
    interface Window {
        fire?: any;
    }
}

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Key, Loader2, Lock, LogOut, Settings, User, Wallet } from "lucide-react"; // Example icons from Lucide
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { WalletContext } from "@/context/walletContext";
import { truncateAddress } from "@/lib/truncateAddress";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { disconnect } from "process";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertDialogOverlay, AlertDialogPortal } from "@radix-ui/react-alert-dialog";

// Define the type for a link object
interface LinkItem {
    href: string;
    icon: React.ReactNode; // Icon component
    label: string;
}

// Define the props for the SidebarContent component
interface SidebarContentProps {
    links: LinkItem[]; // Array of links
}

interface SideNavBarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    links: LinkItem[]; // Array of links
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
    const { walletAddress, setWalletAddress, walletLoading, setWalletLoading, chainName, setChainName } = useContext(WalletContext);
    const pathname = usePathname();
    const alertTrigger = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (window.fire) {
            // window.fire object is in console sucessfully. ✅
            console.log("window.5ire object : \n", window.fire)

            // Registering for events
            window?.fire.on("disconnect", handleDisconnectEvent)
            window?.fire.on("connect", handleConnectEvent)
        }
        return () => {
            window?.fire.removeListener("disconnect", handleDisconnectEvent)
            window?.fire.removeListener("connect", handleConnectEvent)
        }
    }, [])

    const handleDisconnectEvent = async (e: any) => {
        // events not firing up for disconnecting wallet ❌
        console.log("This is diconnect event : ")
        console.log(e)
    }

    const handleConnectEvent = async (e: any) => {
        // events not firing up for connecting wallet ❌
        console.log("This is connect event : ")
        console.log(e)
    }

    const connectWallet = async () => {
        try {
            setWalletLoading(true);
            const result = await window.fire.connect();
            console.log("Connected accounts:", result.evmAddress);
            setWalletAddress(result.evmAddress)
            console.log(window.fire.httpHost);
            setChainName(window.fire.httpHost.includes("testnet") ? "testnet" : "mainnet")
            if (alertTrigger.current)
                alertTrigger?.current.click();
            toast(`Wallet is connected successfully ✅🔑`, {
                style: {
                    backgroundColor: "#030712",
                    color: "White",
                    border: 0,
                    fontWeight: "bold"
                }
            })
            setWalletLoading(false);
        } catch (e: any) {
            setWalletLoading(false);
            console.log("error", e)
            toast("Couln't connect to wallet. Please try again later. 🕰️", {
                style: {
                    backgroundColor: "#030712",
                    color: "White",
                    border: 0,
                    fontWeight: "bold"
                }
            })
        }
    }

    const disConnectWallet = async () => {
        try {
            setWalletLoading(true);
            await window.fire.disconnect();
            setWalletAddress("")
            toast("Wallet is disconnected successfully ✅🔒", {
                style: {
                    backgroundColor: "#030712",
                    color: "White",
                    border: 0,
                    fontWeight: "bold"
                }
            })
            setWalletLoading(false);
        } catch (e: any) {
            setWalletLoading(false);
            toast("Couldn't disconnect wallet. Please try again later. 🕰️", {
                style: {
                    backgroundColor: "#030712",
                    color: "White",
                    border: 0,
                    fontWeight: "bold"
                }
            })
        }
    }

    const handleConnectButton = async () => {
        if (window.fire) {
            if (walletAddress)
                disConnectWallet();
            else
                connectWallet()
        }
        else {
            toast("5ire Wallet is not Installed. Please install it grom browser extension store. 📲", {
                style: {
                    backgroundColor: "#030712",
                    color: "White",
                    border: 0,
                    fontWeight: "bold"
                }
            })
        }
    }


    return (
        <div className="h-[90%] flex flex-col justify-between" >
            <div className="flex flex-col flex-1 h-full  gap-1">
                {links.map((link, index) => (
                    <Link
                        href={link.href}
                        key={index}
                        className={`p-3 ${pathname.includes(link.href) && "bg-accent text-primary font-bold"} rounded-sm w-full font-semibold hover:text-primary text-base flex gap-2 items-center cursor-pointer transition-all duration-200`}
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>


            <AlertDialog>
                <AlertDialogTrigger ref={alertTrigger} className="hidden">Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {chainName === "testnet" ? "You are successfully connected with '5ire Testnet' ✅ " : "You are successfully connected with '5ire Mainnet' ✅"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            This is to confirm you that your wallet is set to '{chainName}'. You can change chains in 5ire Wallet.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>I got it!</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <Button
                disabled={walletLoading}
                onClick={handleConnectButton}
                className={`bg-accent ${walletAddress ? "hover:text-red-400" : "hover:text-primary"} hover:bg-accent p-6 rounded-sm w-full font-semibold text-base flex gap-2 items-center cursor-pointer text-center transition-all duration-200`}>
                <div>
                    {walletLoading
                        ?
                        <span className="w-full flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                        </span>
                        :
                        <>
                            {walletAddress
                                ? <span className="flex items-center justify-center gap-3"> <LogOut className="w-8 h-8" /> {truncateAddress(walletAddress)}</span>
                                :
                                <span className="flex items-center justify-center gap-3"> <Key className="w-8 h-8" />Connect Wallet</span>
                            }
                        </>
                    }
                </div>
            </Button>
        </div>
    );
};

export default SideNavBar;