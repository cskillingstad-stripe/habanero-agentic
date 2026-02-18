import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import {
  Box,
  Flex,
  MantineProvider,
  mantineHtmlProps,
  ScrollArea,
} from '@mantine/core';
import { Header } from '@/components/Header';
import { MessageInput } from '@/components/MessageInput';
import { Iphone } from '@/components/Iphone';

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
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}
      >
        <MantineProvider forceColorScheme="light">
          <Flex direction="column" h="100vh" justify="center" align="center">
            <Iphone>
              <Box style={{ position: 'sticky', top: 0, zIndex: 1, flexShrink: 0, background: 'var(--mantine-color-body)' }}>
                <Header />
              </Box>
              <ScrollArea flex={1}>{children}</ScrollArea>
              <MessageInput />
            </Iphone>
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
