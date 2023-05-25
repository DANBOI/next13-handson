import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@components/Provider";
import Nav from "@components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next13 App",
  description: "next13 learning project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <Nav />
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
