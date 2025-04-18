"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/sonner"
import '../app/styles/globals.css';
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import type { ReactNode } from "react";

const config = getDefaultConfig({
  appName: "My DEX",
  projectId: "my-lol-project",
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
            <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
