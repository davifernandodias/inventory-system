import type { Metadata } from "next";
import '../globals.css'


export const metadata: Metadata = {
  title: "Cardápio Online",
  description: "Gerencie seu estabelecimento de forma segura e simples.",
  icons: {
    icon: '../favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
