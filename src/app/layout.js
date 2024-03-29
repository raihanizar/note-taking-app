import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Provider } from "@/components/providers/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Catat Cepat ✨✏️",
  description: "Catat Cepat - Tuliskan Idemu",
};

export default function RootLayout({ children }) {
  const fontName = inter.className;
  const bodyClassName = `${fontName} h-dvh flex flex-col`
  return (
    <html lang="en">
      <Provider>
        <body className={bodyClassName}>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
