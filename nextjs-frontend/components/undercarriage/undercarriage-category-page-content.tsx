"use client";

import Link from "next/link";
import { ChevronRight, Search, Phone, Wrench, Truck, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BUSINESS_INFO } from "@/lib/url-utils";
import {
  UndercarriageComponent,
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
  getMachinesGroupedByBrand,
  getSortedBrandsForComponent,
  PRIORITY_BRANDS,
} from "@/lib/data/undercarriage-data";
import { 
  normalizeBrand, 
  normalizeForMatching,
  getModelSearchVariants,
} from "@/lib/data/full-machine-data";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface UndercarriageCategoryPageContentProps {
  componentType: UndercarriageComponent;
  faqs: { question: string; answer: string }[];
  seoContent: {
    heading: string;
    paragraphs: string[];
  };
}

export function UndercarriageCategoryPageContent({
  componentType,
  faqs,
  seoContent,
}: UndercarriageCategoryPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const displayName = COMPONENT_DISPLAY_NAMES[componentType];
  const pluralName = COMPONENT_PLURAL_NAMES[componentType];
  const urlPath = COMPONENT_URL_PATHS[componentType];
  
  // Get machines grouped by brand
  const machinesByBrand = useMemo(() => getMachinesGroupedByBrand(componentType), [componentType]);
  const sortedBrands = useMemo(() => getSortedBrandsForComponent(componentType), [componentType]);
  
  // Build flat list of all machines for exact matching
  const allMachines = useMemo(() => {
    const machines: Array<{ brand: string; model: string; slug: string }> = [];
    for (const brand of Object.keys(machinesByBrand)) {
      for (const machine of machinesByBrand[brand]) {
        machines.push({ brand, model: machine.model, slug: machine.slug });
      }
    }
    return machines;
  }, [machinesByBrand]);
  
  // Find exact machine match for search query (e.g., "Kubota SVL75" -> /bottom-rollers/kubota-svl75)
  // Handles model name variations: "SVL 75 (Compact Track Loader)" matches "SVL75"
  const exactMachineMatch = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 3) return null;
    
    const query = normalizeForMatching(searchQuery);
    const queryParts = searchQuery.trim().toLowerCase().split(/\s+/);
    
    // Try to extract brand and model from query
    // e.g., "Kubota SVL75" -> brand="kubota", modelQuery="svl75"
    const potentialBrand = queryParts[0];
    const normalizedBrand = normalizeBrand(potentialBrand);
    const modelQuery = queryParts.slice(1).join('');
    const normalizedModelQuery = normalizeForMatching(modelQuery);
    
    // Check for exact brand+model match with model variants
    for (const machine of allMachines) {
      const machineBrandNorm = normalizeBrand(machine.brand);
      
      // Check if brand matches
      const brandMatches = machineBrandNorm === normalizedBrand || 
                          normalizeForMatching(machine.brand) === normalizeForMatching(potentialBrand);
      
      if (!brandMatches) continue;
      
      // Check if model matches using variants
      const modelVariants = getModelSearchVariants(machine.model);
      
      // Check exact model match
      if (modelVariants.some(v => v === normalizedModelQuery)) {
        return machine;
      }
      
      // Check full query against brand+model variants
      const fullQueryNorm = normalizeForMatching(searchQuery);
      for (const variant of modelVariants) {
        const fullWithVariant = normalizeForMatching(`${machine.brand}${variant}`);
        const fullWithSpace = normalizeForMatching(`${machine.brand} ${variant}`);
        if (fullQueryNorm === fullWithVariant || fullQueryNorm === fullWithSpace || fullQueryNorm === variant) {
          return machine;
        }
      }
    }
    
    // Fallback: check for model-only exact match
    for (const machine of allMachines) {
      const modelVariants = getModelSearchVariants(machine.model);
      if (modelVariants.some(v => v === query)) {
        return machine;
      }
    }
    
    return null;
  }, [searchQuery, allMachines]);
  
  // Filter machines based on search - supports brand, model, brand+model
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return sortedBrands;
    
    const query = normalizeForMatching(searchQuery);
    const normalizedBrandQuery = normalizeBrand(searchQuery);
    
    return sortedBrands.filter((brand) => {
      // Check if brand matches (with normalization for CAT/Caterpillar, CASE/Case, etc.)
      const brandNorm = normalizeForMatching(brand);
      const brandNormalized = normalizeBrand(brand);
      
      if (brandNorm.includes(query) || brandNormalized === normalizedBrandQuery) return true;
      
      // Check if any model matches
      const machines = machinesByBrand[brand] || [];
      return machines.some((machine) => {
        const modelNorm = normalizeForMatching(machine.model);
        const fullName = normalizeForMatching(`${brand} ${machine.model}`);
        return modelNorm.includes(query) || fullName.includes(query);
      });
    });
  }, [sortedBrands, machinesByBrand, searchQuery]);
  
  // Get filtered machines for each brand
  const getFilteredMachines = (brand: string) => {
    const machines = machinesByBrand[brand] || [];
    if (!searchQuery.trim()) return machines;
    
    const query = normalizeForMatching(searchQuery);
    const brandNorm = normalizeForMatching(brand);
    
    // If brand matches, show all machines
    if (brandNorm.includes(query) || normalizeBrand(brand) === normalizeBrand(searchQuery)) {
      return machines;
    }
    
    // Otherwise filter machines
    return machines.filter((machine) => {
      const modelNorm = normalizeForMatching(machine.model);
      const fullName = normalizeForMatching(`${brand} ${machine.model}`);
      return modelNorm.includes(query) || fullName.includes(query);
    });
  };
  
  // Handle search form submission - navigate to exact match if found
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exactMachineMatch) {
      router.push(`/${urlPath}/${exactMachineMatch.slug}`);
    }
  };
  
  // Count total machines
  const totalMachines = Object.values(machinesByBrand).reduce((sum, machines) => sum + machines.length, 0);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{pluralName}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
              Undercarriage Components
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {pluralName} for Mini Excavators & Compact Track Loaders
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Find replacement {pluralName.toLowerCase()} for your machine. Premium quality undercarriage components with wholesale pricing from our Houston warehouse.
            </p>
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search machines (e.g., "Kubota SVL75", "CAT 259D")`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
              {exactMachineMatch && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border border-border rounded-lg shadow-lg z-10">
                  <p className="text-sm text-muted-foreground mb-2">Exact match found:</p>
                  <Link
                    href={`/${urlPath}/${exactMachineMatch.slug}`}
                    className="flex items-center justify-between p-3 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <span className="font-semibold">
                      {exactMachineMatch.brand} {exactMachineMatch.model} {pluralName}
                    </span>
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </Link>
                </div>
              )}
            </form>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm">
                <Wrench className="h-4 w-4 text-primary" />
                <span>{totalMachines.toLocaleString()} machines supported</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Houston warehouse</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast nationwide shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Brands Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Find {pluralName} by Machine
          </h2>
          <p className="text-muted-foreground mb-8">
            Select your brand to see available machines with {pluralName.toLowerCase()}.
          </p>
          
          {filteredBrands.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No machines found matching "{searchQuery}". Try a different search term.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {filteredBrands.map((brand) => {
                const machines = getFilteredMachines(brand);
                const isPriority = PRIORITY_BRANDS.includes(brand);
                
                return (
                  <AccordionItem 
                    key={brand} 
                    value={brand}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-lg">{brand}</span>
                        <span className="text-sm text-muted-foreground">
                          ({machines.length} {machines.length === 1 ? "machine" : "machines"})
                        </span>
                        {isPriority && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-4">
                        {machines.map((machine) => (
                          <Link
                            key={machine.slug}
                            href={`/${urlPath}/${machine.slug}`}
                            className="text-sm py-2 px-3 rounded-md bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors text-center truncate"
                            title={`${brand} ${machine.model} ${displayName}`}
                          >
                            {machine.model}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 lg:py-16 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
              {seoContent.heading}
            </h2>
            {seoContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Need Help Finding the Right {displayName}?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our undercarriage experts can help you find the correct {displayName.toLowerCase()} for your machine. 
                  Have your serial number ready for accurate fitment.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Wholesale pricing for contractors and dealers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Expert fitment verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Fast shipping from Houston warehouse</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href={BUSINESS_INFO.phoneTel}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call: {BUSINESS_INFO.phone}
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    {BUSINESS_INFO.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
