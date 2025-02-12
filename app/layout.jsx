import Navbar from "@/components/Navbav";
import Providers from "./Providers";
import { getSession } from "./auth";
import "./globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="container app">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
