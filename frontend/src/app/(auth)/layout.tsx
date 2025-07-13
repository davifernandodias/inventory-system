import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import '../globals.css'
import Header from "@/components/header";


export const metadata: Metadata = {
  title: "Cardápio Online",
  description: "Gerencie seu estabelecimento de forma segura e simples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
