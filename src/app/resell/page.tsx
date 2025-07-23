// src/app/resell/page.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Use Card for nice formatting

export default function ResellPage() {
  return (
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-10 pt-10 sm:pt-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      <Card className="w-full max-w-2xl"> {/* Wider card */}
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl text-center">Resell or Exchange Your Device</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Based on your device&apos;s condition, selling or exchanging it could be a good option! Here are some popular choices in India and some tips:
          </p>

          <div>
            <h2 className="text-lg font-semibold mb-3">Popular Options in India:</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <span className="font-medium">OLX / Quikr:</span> General classifieds platforms for selling directly to other users. You set the price. (Requires meeting buyers).
                {/* You can optionally add links later: <a href="https://www.olx.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">(Link)</a> */}
              </li>
              <li>
                <span className="font-medium">Cashify:</span> Specializes in buying used phones, laptops, and other gadgets directly. They evaluate your device and offer a price. Convenient pickup options.
                 {/* <a href="https://www.cashify.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">(Link)</a> */}
              </li>
              <li>
                <span className="font-medium">Flipkart / Amazon India Exchange:</span> When buying a new device, these platforms often offer an exchange value for your old one. Value depends on the new purchase and old device condition.
                 {/* <a href="https://www.flipkart.com/mobile-exchange-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">(Flipkart Link)</a> */}
              </li>
               <li>
                <span className="font-medium">Manufacturer Trade-In Programs:</span> Companies like Apple, Samsung, etc., often have their own trade-in programs when you buy directly from them. Check their official Indian websites.
              </li>
               <li>
                <span className="font-medium">Local Mobile Repair Shops:</span> Some local shops might buy used phones, especially for parts, but prices may vary significantly.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Tips for Selling/Exchange:</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <span className="font-medium">Factory Reset:</span> <span className="font-bold text-red-600 dark:text-red-400">Crucial!</span> Wipe all your personal data completely before selling. Remove Google/iCloud accounts first, then perform the reset.
              </li>
              <li>
                 <span className="font-medium">Remove SIM/SD Cards:</span> Don&apos;t forget these!
              </li>
              <li>
                <span className="font-medium">Clean It Up:</span> A clean device looks more valuable.
              </li>
              <li>
                <span className="font-medium">Honest Description:</span> Accurately describe the model, condition, accessories, and any issues for direct sales. For exchange/buyback, answer their diagnostic questions truthfully.
              </li>
               <li>
                <span className="font-medium">Check Prices:</span> Look at similar listings on OLX/Quikr or get quotes from Cashify/exchange programs to get an idea of value.
              </li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline">Back to Assessment</Button>
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}