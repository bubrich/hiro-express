import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sushi HIRO - Аутентичная японская кухня",
  description: "Свежие суши, роллы и традиционная японская кухня. Доставка по Москве. Заказ через Telegram.",
  keywords: "суши, роллы, японская кухня, доставка, Москва, Telegram заказ",
  authors: [{ name: "Sushi HIRO" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#dc2626",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
