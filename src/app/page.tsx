// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Import icons for the steps
import { Recycle, Search, DollarSign, Gift, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    // Keep main container, maybe add padding at bottom
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center pb-20">

      {/* Hero Section (Keep as is) */}
      <div className="space-y-6 max-w-4xl mb-24"> {/* Added margin-bottom */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          Give Your <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">E-Waste</span> <br />
          A New Purpose.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Don&apos;t let old electronics gather dust or harm the environment. Assess your device&apos;s condition and discover the best options: resell for cash, recycle responsibly, or donate for reuse.
        </p>
        <Link href="/assess">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Recycle className="mr-2 h-5 w-5" /> Assess My Device Now
          </Button>
        </Link>
      </div>

      {/* --- How It Works Section --- */}
      <section className="w-full max-w-5xl space-y-12"> {/* Section container */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Simple Steps, Big Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border shadow-sm dark:border-zinc-700">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-3">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">1. Assess Your Device</h3>
            <p className="text-muted-foreground text-sm">
              Answer a few quick questions about your device&apos;s type, condition, and accessories. It only takes a minute!
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border shadow-sm dark:border-zinc-700">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-3">
              {/* Combined icon concept */}
               <div className="flex items-center justify-center">
                    <DollarSign className="h-8 w-8 transform -rotate-12" />
                    <Recycle className="h-8 w-8 transform rotate-12" />
               </div>
            </div>
            <h3 className="text-xl font-semibold">2. Get Options</h3>
            <p className="text-muted-foreground text-sm">
              Based on your answers, we&apos;ll instantly suggest the best path: potential resale value or responsible recycling/donation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border shadow-sm dark:border-zinc-700">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-3">
              <Gift className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">3. Act Responsibly</h3>
            <p className="text-muted-foreground text-sm">
              Find relevant platforms for selling or locate nearby centers for easy recycling or donation in your area (feature coming soon!).
            </p>
          </div>

        </div>
         {/* Optional link again */}
         <div className="text-center mt-12">
            <Link href="/assess">
                <Button variant="ghost" className="text-lg group">
                    Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
      </section>
      {/* --- End How It Works Section --- */}


      {/* Add more sections later (e.g., Why recycle) */}
      {/* <div className="mt-20"> ... More content ... </div> */}

    </main>
  );
}