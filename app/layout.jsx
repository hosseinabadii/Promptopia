import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import "./globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="container app">
          <Navbar session={session} />
          {children}
        </main>
      </body>
    </html>
  );
}
