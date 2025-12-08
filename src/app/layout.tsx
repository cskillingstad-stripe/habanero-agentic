import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import {
  ColorSchemeScript,
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
  title: 'Habanero Checkout',
  description: 'Habanero Checkout',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
      >
        <MantineProvider>
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
