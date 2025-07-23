// src/app/recycle/page.tsx
import { Suspense } from 'react';
import  RecyclePageContent  from '@/components/RecyclePageContent'; // Import the new component
import { Loader2 } from 'lucide-react'; // Import Loader for fallback

export default function RecyclePage() {
  // This component is now simple and can remain a Server Component

  // Define a fallback UI to show while the client component loads
  const loadingFallback = (
    <div className="flex justify-center items-center min-h-[400px]"> {/* Adjust min-height as needed */}
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );

  return (
    // Add the gradient background here on the page container
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-10 pt-10 sm:pt-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
       {/* Wrap the client component in Suspense */}
       <Suspense fallback={loadingFallback}>
         <RecyclePageContent />
       </Suspense>
    </div>
  );
}