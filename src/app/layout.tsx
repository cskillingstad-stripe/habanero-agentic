import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '@mantine/core/styles.css';
import {
  Flex,
  MantineProvider,
  mantineHtmlProps,
  ScrollArea,
} from '@mantine/core';
import { Header } from '@/components/Header';
import { MessageInput } from '@/components/MessageInput';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Habanero Agentic',
  description: 'Habanero Agentic',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        {/* Load local Stripe.js if NEXT_PUBLIC_STRIPE_JS_URL is set */}
        {process.env.NEXT_PUBLIC_STRIPE_JS_URL && (
          <Script
            src={process.env.NEXT_PUBLIC_STRIPE_JS_URL}
            strategy="beforeInteractive"
          />
        )}
          <title>Habanero</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
      >
        <MantineProvider forceColorScheme="light">
          <Flex direction="column" h="100vh">
            <Header />
            <ScrollArea flex={1}>{children}</ScrollArea>
            <MessageInput />
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
