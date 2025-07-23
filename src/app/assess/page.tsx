// src/app/assess/page.tsx
import { DeviceAssessmentForm } from '@/components/DeviceAssessmentForm';

export default function AssessPage() {
  return (
    // Add background gradient, ensure text colors work in light/dark
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-10 pt-10 sm:pt-20 bg-gradient-to-br from-green-50 via-sky-100 to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      <DeviceAssessmentForm />
    </div>
  );
}