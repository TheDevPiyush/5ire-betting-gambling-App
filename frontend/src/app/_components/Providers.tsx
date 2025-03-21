"use client"
import { ThemeProvider } from '@/lib/ThemeProvider'
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import SideNavBar from './SideNavbar'
import { Gamepad2, List, MessageCircle, User2Icon, } from 'lucide-react'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';
import '@rainbow-me/rainbowkit/styles.css';
import {
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { _5ireMainnetConfig, _5ireTestnetConfig } from '@/lib/WagmiConfig';
const links = [
    {
        href: "/games",
        icon: <Gamepad2 className="w-5 h-5" />,
        label: "Games",
    },
    {
        href: "/account",
        icon: <User2Icon className="w-5 h-5" />,
        label: "Account",
    },
    {
        href: "/resources",
        icon: <List className="w-5 h-5" />,
        label: "Resources",
    },
    {
        href: "/support",
        icon: <MessageCircle className="w-5 h-5" />,
        label: "Support",
    },
];

const queryClient = new QueryClient();
export default function Providers({ children }: any) {

    const config = getDefaultConfig({
        appName: '5ire Games',
        projectId: '53b84ce689dd6fc6ceb9f7b7439439b5',
        chains: [_5ireTestnetConfig, _5ireMainnetConfig],
        ssr: true,
    });

    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster />

            <NextTopLoader showSpinner={false} color='#6D28D9' />
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider theme={darkTheme()} modalSize='compact'>
                        <body
                            className={`antialiased flex gap-5 h-screen items-center w-full`}>
                            <div className='w-2/12 h-[95%]'>
                                <SideNavBar isOpen={false} setIsOpen={() => { }} links={links} />
                            </div>
                            <div className='h-[95%] bg-accent/30 w-full p-3 font-semibold overflow-auto'>
                                {children}
                            </div>
                        </body>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider >
    )
}
