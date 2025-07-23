# E-Waste Wise



A web application designed to help users responsibly manage their electronic waste by assessing device conditions and providing guidance on reselling, recycling, or donating options, including nearby location suggestions and AI-powered insights.

**Built for the Google Solutions Challenge.**

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment) 
- [Future Improvements](#future-improvements)
- [Contact](#contact)

---

## Problem Statement

Electronic waste (e-waste) is a growing global problem. Improper disposal leads to environmental pollution and the loss of valuable resources. Many users are unsure about the best way to handle their old or broken electronics – whether they can be resold, need special recycling, or can be donated. Finding reliable local disposal options can also be challenging.

## Solution

E-Waste Wise provides a simple web interface to:

1.  **Assess Device Condition:** Users answer quick questions about their electronic device (type, working status, cosmetic condition, accessories).
2.  **Determine Best Path:** Based on the assessment, the application determines if the device is more suitable for **Reselling** or **Recycling/Donation**.
3.  **Provide Actionable Options:**
    *   **Resell Page:** Offers tips and lists relevant platforms (tailored for India: OLX, Cashify, Exchange programs) for selling used electronics.
    *   **Recycle/Donate Page:**
        *   Uses the **Google Maps Places API** to find nearby e-waste recycling centers, donation points, and relevant scrap dealers based on the user's provided location.
        *   Leverages the **Google Gemini API** (gemini-1.5-flash-latest) to provide experimental AI-driven insights, including a component breakdown (highlighting recyclable/hazardous parts) and potential repurposing ideas for the specific device.

## Key Features

*   **Device Assessment Form:** Simple, multi-step form using `shadcn/ui` components.
*   **Conditional Redirection:** Server-side logic directs users to the appropriate results page.
*   **Accurate Location Search:** Integrates **Google Maps Places API** for reliable nearby recycling/donation center lookup.
*   **AI-Powered Insights:** Utilizes **Google Gemini API** to analyze device details and provide component breakdown and repurposing suggestions.
*   **India-Specific Resell Info:** Provides relevant platforms and tips for the Indian market.
*   **Dark Mode:** Theme switching based on system preference or manual toggle, built with `next-themes`.
*   **Responsive Design:** Functional layout on different screen sizes (thanks to Tailwind CSS).
*   **Modern Tech Stack:** Built with Next.js App Router and Server Actions.

## Tech Stack

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **Server Logic:** Next.js Server Actions
*   **APIs:**
    *   Google Maps Places API (Text Search)
    *   Google Gemini API (via `@google/generative-ai` SDK)
*   **Theming:** `next-themes`
*   **Icons:** `lucide-react`

## Deployment 

* **Deployed At:**  *https://e-waste-wise.vercel.app/*
## Future Improvements

*   Integrate user accounts to save device history.
*   Allow users to provide more specific device models for potentially more accurate Gemini insights.
*   Use browser Geolocation API to automatically detect user location (with permission).
*   Implement more robust error handling and user feedback.
*   Expand the manually curated list or add filtering based on specific materials accepted.
*   Refine UI/UX further.

## Contact

[Dev Marwah] - [https://github.com/DevSquaared]

Project Link: [https://github.com/DevSquaared/e-waste_wise]

---