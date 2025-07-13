import type { Metadata } from "next";
import './globals.css'


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
      <body
      className="vsc-initialized"
      >
        {children}
      </body>
    </html>
  );
}
