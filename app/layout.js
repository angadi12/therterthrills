import "./globals.css";
import { NextuiProviderWrapper } from "./provider";
import { Roboto } from "next/font/google";
import { Providers } from "@/lib/Redux/provider";
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";


const inter = Roboto({
  weight: ["100", "400", "300", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "THE THEATRE THRILLS",
  description: "Experience a private theatre, perfect for your next movie night or celebration. Book Now!",
  keywords: ["private theatre", "movie night", "Farewell","celebration", "booking"],
  authors: [{ name: "THE THEATRE THRILLS" }],
  creator: "THE THEATRE THRILLS",
  publisher: "THE THEATRE THRILLS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "THE THEATRE THRILLS",
    description: "Experience a private theatre, perfect for your next movie night or celebration. Book Now!",
    url: 'https://www.thetheatrethrills.com/',
    siteName: 'THE THEATRE THRILLS',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/awt-website-769f8.appspot.com/o/Logo.png?alt=media&token=d8826565-b850-4d05-8bfa-5be8061f70f6', 
        width: 1200,
        height: 630,
        alt: 'THE THEATRE THRILLS - Private Theatre Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE THEATRE THRILLS',
    description: 'Experience a private theatre, perfect for your next movie night or celebration. Book Now!',
    images: ['https://yourwebsite.com/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      me: ['https://www.thetheatrethrills.com', 'mailto:info@theatrethrills.com'],
    },
  },
};

export default function RootLayout({ children }) {

  
  return (
    <Providers>
      <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <body className={inter.className}>
          <NextuiProviderWrapper>
            {children}
            <Toaster />
          </NextuiProviderWrapper>
        </body>
      </html>
    </Providers>
  );
}
