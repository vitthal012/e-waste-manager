// src/components/DeviceAssessmentForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from 'react';
import { processAssessment } from '@/app/_actions/assessmentActions';


export function DeviceAssessmentForm() {
  // --- State Variables ---
  const [deviceType, setDeviceType] = useState<string>('');
  const [workingStatus, setWorkingStatus] = useState<string>('fully_working');
  const [cosmeticCondition, setCosmeticCondition] = useState<string>('good');
  const [accessories, setAccessories] = useState<string>('some');
  const [location, setLocation] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  // --- Button Click Handler ---
  const handleFindOptions = () => {
    if (!deviceType) {
      alert("Please select a device type.");
      return;
    }
    if (!location.trim()) {
      alert("Please enter your City or Pincode.");
    }
    const formData = { deviceType, workingStatus, cosmeticCondition, accessories, location };
    startTransition(() => {
      processAssessment(formData);
    });
  };

  // --- COMPLETE JSX STRUCTURE ---
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Tell Us About Your Device</CardTitle>
        <CardDescription>Answer a few questions to find the best options.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Question 1: Device Type */}
        <div className="space-y-2">
          <Label htmlFor="device-type">1. What type of device is it?</Label>
          <Select value={deviceType} onValueChange={setDeviceType}>
            <SelectTrigger id="device-type" className="w-full">
              <SelectValue placeholder="Select device type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile_phone">Mobile Phone</SelectItem>
              {/* Add other types later */}
            </SelectContent>
          </Select>
        </div>

        {/* Question 2: Working Status */}
        <div className="space-y-2">
          <Label>2. Is the device generally working?</Label>
          <RadioGroup value={workingStatus} defaultValue="fully_working" onValueChange={setWorkingStatus}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fully_working" id="q2-yes" />
              <Label htmlFor="q2-yes">Yes, fully working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partial" id="q2-partial" />
              <Label htmlFor="q2-partial">Partially working (some issues)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not_working" id="q2-no" />
              <Label htmlFor="q2-no">No, not working</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 3: Cosmetic Condition */}
        <div className="space-y-2">
          <Label>3. What is the cosmetic condition?</Label>
          <RadioGroup value={cosmeticCondition} defaultValue="good" onValueChange={setCosmeticCondition}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="like_new" id="q3-new" />
              <Label htmlFor="q3-new">Like New (no visible marks)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="q3-good" />
              <Label htmlFor="q3-good">Good (minor scratches/wear)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fair" id="q3-fair" />
              <Label htmlFor="q3-fair">Fair (visible scratches/dents)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poor" id="q3-poor" />
              <Label htmlFor="q3-poor">Poor (cracked screen, major damage)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 4: Accessories */}
        <div className="space-y-2">
          <Label>4. Do you have the original box and accessories?</Label>
          <RadioGroup value={accessories} defaultValue="some" onValueChange={setAccessories}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="original" id="q4-yes" />
              <Label htmlFor="q4-yes">Yes, original box & charger/cables</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="some" id="q4-some" />
              <Label htmlFor="q4-some">Some accessories (e.g., charger only)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="q4-no" />
              <Label htmlFor="q4-no">No accessories or box</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">5. Your Location (City / Pincode)</Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g., Mumbai or 400001"
            value={location} // <-- Bind value
            onChange={(e) => setLocation(e.target.value)} // <-- Update state
          />
          <p className="text-xs text-muted-foreground">Needed to find nearby recycling options.</p>
        </div>
        {/* --- END LOCATION INPUT --- */}

      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleFindOptions}
          disabled={!deviceType || isPending}
        >
          {isPending ? "Processing..." : "Find Options"}
        </Button>
      </CardFooter>
    </Card>
  );
}
