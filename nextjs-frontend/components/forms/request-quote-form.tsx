"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BUSINESS_INFO } from "@/lib/url-utils";

interface RequestQuoteFormProps {
  /** Pre-fill machine brand if known */
  machineBrand?: string;
  /** Pre-fill machine model if known */
  machineModel?: string;
  /** Pre-fill track size if known */
  trackSize?: string;
  /** Pre-fill part number if known */
  partNumber?: string;
  /** Pre-fill category (rubber-tracks, bottom-rollers, etc.) */
  category?: string;
  /** Source page for tracking */
  sourcePage?: string;
  /** Optional title override */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Compact mode for inline forms */
  compact?: boolean;
}

const PARTS_OPTIONS = [
  { id: "rubber-tracks", label: "Rubber Tracks" },
  { id: "bottom-rollers", label: "Bottom Rollers" },
  { id: "sprockets", label: "Sprockets" },
  { id: "idlers", label: "Idlers" },
  { id: "final-drives", label: "Final Drives" },
  { id: "other", label: "Other" },
];

export default function RequestQuoteForm({
  machineBrand = "",
  machineModel = "",
  trackSize = "",
  partNumber = "",
  category = "",
  sourcePage = "",
  title = "Request a Quote",
  subtitle = "Get wholesale pricing on rubber tracks and undercarriage parts. We respond within 2 business hours.",
  compact = false,
}: RequestQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    machineBrand,
    machineModel,
    trackSize,
    partNumber,
    quantity: "",
    message: "",
    partsNeeded: category ? [category] : [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePartToggle = (partId: string) => {
    setFormData((prev) => ({
      ...prev,
      partsNeeded: prev.partsNeeded.includes(partId)
        ? prev.partsNeeded.filter((p) => p !== partId)
        : [...prev.partsNeeded, partId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Build message body with all fields
    const messageBody = `
QUOTE REQUEST

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Company: ${formData.company || "Not provided"}

MACHINE INFORMATION
Brand: ${formData.machineBrand || "Not specified"}
Model: ${formData.machineModel || "Not specified"}
Track Size: ${formData.trackSize || "Not specified"}

PARTS NEEDED
${formData.partsNeeded.length > 0 ? formData.partsNeeded.map(p => `- ${PARTS_OPTIONS.find(opt => opt.id === p)?.label || p}`).join("\n") : "Not specified"}

Part Number: ${formData.partNumber || "Not provided"}
Quantity: ${formData.quantity || "Not specified"}

ADDITIONAL NOTES
${formData.message || "None"}

Source Page: ${sourcePage || window.location.href}
    `.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || `noemail-${Date.now()}@placeholder.com`,
          phone: formData.phone,
          message: messageBody,
          subject: `Quote Request: ${formData.machineBrand || "General"} ${formData.machineModel || ""}`.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-primary/50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quote Request Received!
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Thank you for your request. Our team will review your inquiry and get back to you within 2 business hours.
          </p>
          <div className="bg-secondary rounded-lg p-4 inline-block">
            <p className="text-foreground font-semibold mb-1">For Fastest Response</p>
            <Link
              href={BUSINESS_INFO.phoneTel}
              className="text-primary hover:text-primary/80 text-lg font-bold flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call: {BUSINESS_INFO.phone}
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={compact ? "border-0 shadow-none bg-transparent" : ""}>
      {!compact && (
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {subtitle && (
            <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
          )}
        </CardHeader>
      )}
      <CardContent className={compact ? "p-0" : ""}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-muted-foreground text-sm">(optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">
                Company <span className="text-muted-foreground text-sm">(optional)</span>
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="ABC Construction"
                className="bg-secondary"
              />
            </div>
          </div>

          {/* Machine Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Machine Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="machineBrand" className="text-foreground">Brand</Label>
                <Input
                  id="machineBrand"
                  value={formData.machineBrand}
                  onChange={(e) => setFormData({ ...formData, machineBrand: e.target.value })}
                  placeholder="Kubota, CAT, Bobcat..."
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineModel" className="text-foreground">Model</Label>
                <Input
                  id="machineModel"
                  value={formData.machineModel}
                  onChange={(e) => setFormData({ ...formData, machineModel: e.target.value })}
                  placeholder="SVL75, 259D, T650..."
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackSize" className="text-foreground">Track Size</Label>
                <Input
                  id="trackSize"
                  value={formData.trackSize}
                  onChange={(e) => setFormData({ ...formData, trackSize: e.target.value })}
                  placeholder="400x86x52"
                  className="bg-secondary"
                />
              </div>
            </div>
          </div>

          {/* Parts Needed */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Parts Needed</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PARTS_OPTIONS.map((part) => (
                <label
                  key={part.id}
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
                >
                  <Checkbox
                    id={part.id}
                    checked={formData.partsNeeded.includes(part.id)}
                    onChange={() => handlePartToggle(part.id)}
                  />
                  <span className="text-foreground text-sm font-medium">{part.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partNumber" className="text-foreground">
                Part Number <span className="text-muted-foreground text-sm">(if known)</span>
              </Label>
              <Input
                id="partNumber"
                value={formData.partNumber}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                placeholder="e.g., RT400X86X52"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-foreground">
                Quantity
              </Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="1, 2, 4..."
                className="bg-secondary"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Additional Notes
            </Label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your equipment, specific needs, or any questions..."
              className="flex w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </div>

          {/* Hidden source page */}
          <input type="hidden" name="sourcePage" value={sourcePage || ""} />

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href={BUSINESS_INFO.phoneTel}>
                <Phone className="h-4 w-4 mr-2" />
                Call: {BUSINESS_INFO.phone}
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
