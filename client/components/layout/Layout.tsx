import { PropsWithChildren } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/ModeToggle";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-extrabold tracking-tight text-xl">
              Legal Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.to ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign in</Button>
            </SignInButton>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Explore
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ModeToggle />
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <a
              href="https://builder.io/c/docs/projects"
              target="_blank"
              rel="noreferrer"
            >
              Deploy
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Legal Hub. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/" className="hover:text-foreground">
            Terms
          </a>
          <a href="/" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative h-8 w-8 grid place-items-center rounded-lg bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-sm">
      <span className="text-xs font-bold">LH</span>
    </div>
  );
}
