// src/components/header.tsx
import Link from 'next/link';
import { ModeToggle } from './mode-toggle'; // Import the toggle
import { Recycle } from 'lucide-react'; // Example logo icon

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjust max-width as needed */}

        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <Recycle className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">E-Waste Wise</span>
          {/* Replace with your actual logo/name */}
        </Link>

        {/* Navigation (Optional - can add later) */}
        {/* <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
          <Link href="/resources" className="transition-colors hover:text-foreground/80 text-foreground/60">Resources</Link>
        </nav> */}

        {/* Mode Toggle */}
        <div className="flex items-center"> {/* ml-auto pushes it right if no nav */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}