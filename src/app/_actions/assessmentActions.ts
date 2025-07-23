// src/app/_actions/assessmentActions.ts
"use server"; // Mark this file's functions as Server Actions

import { redirect } from 'next/navigation'; // Use next/navigation for redirects in Server Actions
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"; // Import Gemini SDK


// Define the structure of the data we expect from the form

interface AssessmentFormData {
  deviceType: string;
  workingStatus: string;
  cosmeticCondition: string;
  accessories: string;
  location: string;
}
export interface PlaceResult {
    place_id: string; // Unique ID from Google
    name: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
    opening_hours?: { open_now: boolean };
    website?: string;
    formatted_phone_number?: string;
  }
  
  
  const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
  export async function getNearbyRecyclingLocations(location: string): Promise<{ places?: PlaceResult[]; error?: string }> {
    console.log(`Places Action: Searching near "${location}"`);
  
    if (!MAPS_API_KEY) {
      console.error("ERROR: GOOGLE_MAPS_API_KEY environment variable not set.");
      return { error: "Maps API key not configured on the server." };
    }
    if (!location) {
      return { error: "Location not provided." };
    }
  
    // Construct the Places API Text Search URL
    const query = encodeURIComponent(`e-waste recycling OR electronics donation OR scrap dealer electronics near ${location}`);
    const fields = 'place_id,name,formatted_address,rating,user_ratings_total,opening_hours,website,formatted_phone_number';
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&fields=${fields}&key=${MAPS_API_KEY}`;
    try {
      const response = await fetch(url, { cache: 'no-store' }); // Fetch from Google
      const data = await response.json(); // Parse the JSON response
  
      // console.log("Places API Raw Response:", JSON.stringify(data, null, 2)); // For debugging
  
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error("Places API Error:", data.status, data.error_message);
        // Provide more specific errors if possible
        if (data.status === 'REQUEST_DENIED') {
          return { error: "Server configuration error (Maps API Key issue)." };
        }
         if (data.status === 'OVER_QUERY_LIMIT') {
           return { error: "Usage limit reached. Please try again later." };
         }
        return { error: `Could not retrieve locations (${data.status}).` };
      }
  
      const places: PlaceResult[] = data.results || []; // Extract results array
  
      console.log(`Places Action: Found ${places.length} results.`);
      return { places };
  
    } catch (error) {
      console.error("ERROR calling Places API:", error);
      return { error: "Could not connect to location service." };
    }
  }                                                                         
  
  export async function processAssessment(formData: AssessmentFormData) {
    console.log("Server Action received:", formData);
    const { deviceType, workingStatus, cosmeticCondition, accessories, location } = formData;
  
    // --- Determine Base Path ---
    let destinationPath = '/recycle'; // Use a different variable for the base path
    if (
        (workingStatus === 'fully_working' && (cosmeticCondition === 'like_new' || cosmeticCondition === 'good' || cosmeticCondition === 'fair')) ||
        (workingStatus === 'partial' && (cosmeticCondition === 'like_new' || cosmeticCondition === 'good'))
       ) {
      destinationPath = '/resell';
    }
  
    // --- Build Query Parameters ---
    const params = new URLSearchParams();
    // Add parameters common to both paths (or modify as needed)
    params.set('deviceType', deviceType);
    params.set('workingStatus', workingStatus);
    params.set('cosmeticCondition', cosmeticCondition);
    params.set('accessories', accessories);
  
    // Conditionally add location parameter ONLY if going to recycle
    if (destinationPath === '/recycle' && location.trim()) {
        params.set('location', location.trim()); // No need to encode here, URLSearchParams handles it
    }
  
    // --- Construct the Final URL ---
    // Combine the base path and the formatted query parameters
    const finalUrl = `${destinationPath}?${params.toString()}`;
  
    console.log("Server Action decision:", finalUrl); // Log the final URL
  
    // --- Redirect the user ---
    redirect(finalUrl); // Redirect using the fully constructed URL
  }
const MODEL_NAME = "gemini-2.0-flash-lite"; // Or "gemini-1.5-flash-latest" if preferred
const API_KEY = process.env.GOOGLE_API_KEY; // Read key from environment variables

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  ];

  export async function getGeminiSuggestionsForLocation(location: string): Promise<{ suggestions?: string; error?: string }> {
    // console.log(`Gemini Action: Getting suggestions for ${location}`); // Optional server log

    if (!API_KEY) {
        console.error("ERROR: GOOGLE_API_KEY environment variable not set.");
        return { error: "API key not configured on the server." };
    }
    if (!location) {
        return { error: "Location not provided." };
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME, safetySettings });

        // Simple prompt for MVP - can be improved later
        const prompt = `List up to 3 e-waste recycling centers, certified recyclers, or non-profit donation points for electronics near "${location}". Include name and general address or area if possible. Format as a simple list.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // console.log("Gemini Response Text:", responseText); // Optional server log

        return { suggestions: responseText };

    } catch (error) {
        console.error("ERROR calling Gemini API:", error);
        // Provide a more user-friendly error message
        if (error instanceof Error && error.message.includes('API key not valid')) {
            return { error: "Server configuration error (Invalid API Key)." };
        } else if (error instanceof Error && error.message.includes('429')) { // Too Many Requests
             return { error: "Rate limit exceeded. Please try again later." };
        }
         // General error for safety reasons - avoid exposing detailed errors
        return { error: "Could not retrieve suggestions at this time." };
    }
}

// src/app/_actions/assessmentActions.ts
// ... (previous code) ...

interface DeviceDetails {
    deviceType: string;
    workingStatus: string;
    cosmeticCondition: string;
    accessories: string;
}

export async function getGeminiDeviceInsights(details: DeviceDetails): Promise<{ insights?: string; error?: string }> {
    console.log("Gemini Action: Getting insights for", details);

    if (!API_KEY) { /* ... handle missing key ... */ return { error: "API key not configured..." }; }

    // Basic validation on input details
    if (!details.deviceType || !details.workingStatus || !details.cosmeticCondition) {
        return { error: "Incomplete device details provided." };
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
         // Use gemini-1.5-flash-latest for potentially better results if available and desired
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safetySettings });

        // Construct a prompt asking for both breakdown and repurposing ideas
        const prompt = `
            Analyze the following electronic device based on the user's input:
            Device Type: ${details.deviceType}
            Working Status: ${details.workingStatus}
            Cosmetic Condition: ${details.cosmeticCondition}
            Accessories Included: ${details.accessories}

            Provide the following information concisely:
            1.  **Component Breakdown & Handling:** Briefly list key components (like screen, battery, casing, board). For each, mention if it's typically recyclable, potentially hazardous (like batteries), or might have resale value (like a working screen). Keep it short and general.
            2.  **Repurposing Ideas:** If the device is partially working or not working but not in poor cosmetic condition, suggest 1-2 simple, creative reuse or repurposing ideas relevant to the device type. If fully working or poor condition, state that repurposing might not be applicable or suggest donation/recycling.

            Format the response clearly, perhaps using markdown headings or bullet points. Avoid overly technical jargon.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("Gemini Insights Response:", responseText); // Server log for debugging

        return { insights: responseText };

    } catch (error) {
        console.error("ERROR calling Gemini API for insights:", error);
         // ... (more specific error handling like before) ...
        return { error: "Could not retrieve device insights at this time." };
    }
}

    


