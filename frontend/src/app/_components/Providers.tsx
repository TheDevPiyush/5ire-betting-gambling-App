"use client"
import { ThemeProvider } from '@/lib/ThemeProvider'
import React, { useEffect, useState } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import SideNavBar from './SideNavbar'
import { DollarSign, Globe, GroupIcon, MessageCircle, Wrench } from 'lucide-react'
import { WalletContext } from '@/context/walletContext'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';

const links = [
    {
        href: "/overview",
        icon: <Globe className="w-5 h-5" />,
        label: "Overview",
    },
    {
        href: "/pools",
        icon: <DollarSign className="w-5 h-5" />,
        label: "Pools",
    },
    {
        href: "/resources",
        icon: <Wrench className="w-5 h-5" />,
        label: "Resources",
    },
    {
        href: "/support",
        icon: <MessageCircle className="w-5 h-5" />,
        label: "Support",
    },
];

export default function Providers({ children }: any) {
    const [walletAddress, setWalletAddress] = useState<string | undefined>();
    const [walletLoading, setWalletLoading] = useState<boolean | undefined>();
    const [chainName, setChainName] = useState<string | undefined>("");
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster />

            <NextTopLoader showSpinner={false} color='#6D28D9' />
            <WalletContext.Provider value={{ walletAddress, setWalletAddress, walletLoading, setWalletLoading, chainName, setChainName }}>
                <body
                    className={`antialiased flex gap-5 h-screen items-center w-full`}>
                    <div className='w-2/12 h-[95%]'>
                        <SideNavBar isOpen={false} setIsOpen={() => { }} links={links} />
                    </div>
                    <div className='h-[95%] bg-accent/30 w-full p-3 font-semibold overflow-auto'>
                        {children}
                    </div>
                </body>
            </WalletContext.Provider>
        </ThemeProvider >
    )
}
