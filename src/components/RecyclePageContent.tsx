// src/app/recycle/page.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MapPin, Phone, Globe, Star, Clock, Building, Info, Loader2, BrainCircuit } from 'lucide-react';
import { getNearbyRecyclingLocations, PlaceResult } from '@/app/_actions/assessmentActions';
import { getGeminiDeviceInsights } from '@/app/_actions/assessmentActions';

// Interface can be defined here or imported if needed elsewhere

export default function RecyclePage() {
  const searchParams = useSearchParams();

  // Get parameters from URL
  const locationQueryParam = searchParams.get('location');
  const deviceType = searchParams.get('deviceType');
  const workingStatus = searchParams.get('workingStatus');
  const cosmeticCondition = searchParams.get('cosmeticCondition');
  const accessories = searchParams.get('accessories');

  // State for Places API
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState<boolean>(true);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const displayLocation = locationQueryParam ? decodeURIComponent(locationQueryParam) : "your area";

  // State for Gemini Insights
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(true);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // Effect to Fetch Places
  useEffect(() => {
    const fetchPlaces = async () => {
      if (locationQueryParam) {
        const decodedLocation = decodeURIComponent(locationQueryParam);
        setIsLoadingPlaces(true); setPlacesError(null); setPlaces([]);
        const result = await getNearbyRecyclingLocations(decodedLocation);
        if (result.error) setPlacesError(result.error); else setPlaces(result.places ?? []);
        setIsLoadingPlaces(false);
      } else {
        setPlacesError("No location specified in URL.");
        setIsLoadingPlaces(false);
      }
    };
    fetchPlaces();
  }, [locationQueryParam]);

  // Effect to Fetch Gemini Insights
  useEffect(() => {
    const fetchInsights = async () => {
      if (deviceType && workingStatus && cosmeticCondition && accessories) {
        setIsLoadingInsights(true); setInsightsError(null); setInsights(null);
        const details = { deviceType, workingStatus, cosmeticCondition, accessories };
        const result = await getGeminiDeviceInsights(details);
        if (result.error) setInsightsError(result.error); else setInsights(result.insights ?? "No specific insights generated.");
        setIsLoadingInsights(false);
      } else {
        console.warn("Device details missing in URL for Gemini insights.");
        setIsLoadingInsights(false);
      }
    };
    fetchInsights();
  }, [deviceType, workingStatus, cosmeticCondition, accessories]);

  // Component to render a single Place
  const PlaceCard = ({ place }: { place: PlaceResult }) => (
    <li className="mb-4 pb-4 border-b last:border-b-0 bg-card p-4 rounded-md shadow-sm">
       <h3 className="font-semibold text-lg mb-2">{place.name}</h3>
      {place.formatted_address && (<p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><MapPin size={14} /> {place.formatted_address}</p>)}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2">
         {place.formatted_phone_number && (<a href={`tel:${place.formatted_phone_number}`} className="text-muted-foreground hover:text-primary flex items-center gap-1.5"><Phone size={14} /> {place.formatted_phone_number}</a>)}
         {place.website && (<a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"><Globe size={14} /> Website</a>)}
      </div>
       <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm items-center text-muted-foreground">
         {place.rating && place.user_ratings_total && (<span className="flex items-center gap-1"><Star size={14} className='text-yellow-500 fill-yellow-500'/> {place.rating.toFixed(1)} ({place.user_ratings_total} ratings)</span>)}
          {place.opening_hours && (<span className={`font-medium flex items-center gap-1 ${place.opening_hours.open_now ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><Clock size={14}/> {place.opening_hours.open_now ? 'Open Now' : 'Closed Now'}</span>)}
       </div>
    </li>
  );

  // --- UPDATED Helper to format Gemini's text response for HTML ---
  const formatGeminiTextForHTML = (text: string | null): { __html: string } | null => {
    if (!text) return null;
    const formattedLines = text.split('\n').map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return '';
      const formattedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (formattedLine.match(/^(\*|-|\d+\.)\s+/)) {
        return `<p class="mb-1 ml-4">• ${formattedLine.replace(/^(\*|-|\d+\.)\s+/, '')}</p>`;
      }
      if (formattedLine.startsWith('## ')) {
        return `<h4 class="font-semibold mt-3 mb-1">${formattedLine.substring(3)}</h4>`;
      }
      if (formattedLine.startsWith('# ')) {
        return `<h3 class="font-semibold text-lg mt-4 mb-1">${formattedLine.substring(2)}</h3>`;
      }
      return `<p class="mb-1">${formattedLine}</p>`;
    });
    const finalHtml = formattedLines.join('');
    return { __html: finalHtml };
  }
  // --- END UPDATED HELPER ---


  return (
    // --- ADD BACKGROUND GRADIENT TO ROOT DIV ---
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-10 pt-10 sm:pt-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
    {/* --- END BACKGROUND GRADIENT --- */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
           <CardTitle className="text-2xl sm:text-3xl text-center">Recycle or Donate Options</CardTitle>
           <CardDescription className='text-center pt-1'>Suggestions for: <span className='font-medium'>{displayLocation}</span></CardDescription>
           <CardDescription className="text-center text-red-600 dark:text-red-400 font-semibold flex items-center justify-center gap-2 pt-2">
              <AlertTriangle size={18}/> Important: Do NOT throw electronics in regular trash!
           </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* --- Gemini Insights Section --- */}
          {(deviceType && workingStatus && cosmeticCondition && accessories) && (
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 border-b pb-2">
                    <BrainCircuit size={22} /> AI Device Insights (Experimental)
                </h2>
                {isLoadingInsights && ( <div className='flex items-center justify-center gap-2 text-muted-foreground py-4'><Loader2 className='h-5 w-5 animate-spin' /> Loading insights...</div> )}
                {insightsError && ( <p className='text-red-600 dark:text-red-400 text-center py-4'>Error loading insights: {insightsError}</p> )}
                {!isLoadingInsights && !insightsError && insights && (
                    // --- UPDATED RENDERING USING dangerouslySetInnerHTML ---
                    <div
                       className="text-sm pl-2 space-y-2 bg-muted/50 p-4 rounded-md border prose prose-sm dark:prose-invert max-w-none" // Added prose classes
                       dangerouslySetInnerHTML={formatGeminiTextForHTML(insights) || { __html: '' }} // Use dangerouslySetInnerHTML
                    />
                    // --- END UPDATED RENDERING ---
                )}
                 {!isLoadingInsights && !insightsError && !insights && ( <p className='text-muted-foreground text-center py-4 italic'>No specific insights generated.</p> )}
              </div>
          )}


           {/* --- Places API Results Section --- */}
           <div>
             <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 border-b pb-2">
                <Building size={22} /> Nearby Locations (via Google Maps)
             </h2>
              {isLoadingPlaces && ( <div className='flex items-center justify-center gap-2 text-muted-foreground py-6'><Loader2 className='h-6 w-6 animate-spin' /> Searching for locations...</div> )}
              {placesError && ( <p className='text-red-600 dark:text-red-400 text-center py-6 font-medium'><Info size={18} className='inline mr-1 mb-0.5'/> Error: {placesError}</p> )}
              {!isLoadingPlaces && !placesError && places.length > 0 && (
                 <ul className="space-y-1">
                   {places.map(place => <PlaceCard key={place.place_id} place={place} />)}
                    <p className="text-xs italic text-muted-foreground pt-3 text-center">Data provided by Google Maps. Please verify hours and details before visiting.</p>
                 </ul>
              )}
               {!isLoadingPlaces && !placesError && places.length === 0 && ( <p className='text-muted-foreground text-center py-6 italic'>No specific e-waste recycling or donation centers found nearby via Google Maps for &quot;{displayLocation}&quot;. Try searching online or check your local council&apos;s website.</p> )}
           </div>

          {/* --- Data Wipe Reminder --- */}
          <div className="!mt-10 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md text-center">
             <p className="font-semibold text-yellow-800 dark:text-yellow-300">Remember to Factory Reset your device and remove SIM/SD cards before recycling or donating, if possible!</p>
          </div>

          {/* --- Back Button --- */}
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