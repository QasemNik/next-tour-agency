import { Footer } from "@/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata = {
  title: "Torino | آژانس مسافرتی تورینو",
  description: "بهترین تورهای مسافرتی با تورینو",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" richColors />
        <Footer />
      </body>
    </html>
  );
}
