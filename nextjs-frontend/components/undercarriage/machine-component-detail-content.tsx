"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Mail,
  Truck,
  MapPin,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Settings,
  Package,
  Shield,
  Info,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMachineSlug, BUSINESS_INFO } from "@/lib/url-utils";
import { getTrackSizesForMachine, cleanModelForDisplay } from "@/lib/data/full-machine-data";
import {
  UndercarriageComponent,
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
  getUndercarriageComponents,
  getComponentUrl,
} from "@/lib/data/undercarriage-data";
import {
  VerifiedPart,
  getVerifiedPartsForMachine,
} from "@/lib/data/verified-parts-data";
import {
  StagedPart,
  getStagedPartsForMachine,
} from "@/lib/data/staged-parts-data";
import { SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES } from "@/lib/config/staged-parts-flags";
import RequestQuoteForm from "@/components/forms/request-quote-form";

interface MachineComponentDetailContentProps {
  brand: string;
  model: string;
  componentType: UndercarriageComponent;
  equipmentType?: string;
  trackSizes?: string[];
}

// Rich component-specific content for SEO and customer education
const COMPONENT_CONTENT: Record<UndercarriageComponent, {
  short: string;
  intro: string;
  aboutTitle: string;
  aboutContent: string[];
  functionTitle: string;
  functionContent: string;
  signsTitle: string;
  signsIntro: string;
  signs: { title: string; description: string }[];
  maintenanceTips: string[];
  fitmentTitle: string;
  fitmentContent: string[];
}> = {
  "bottom-roller": {
    short: "Support and distribute machine weight across the track",
    intro: "Bottom rollers are essential undercarriage components that bear the full weight of your machine while guiding the track along its path. Also known as track rollers or lower rollers, these components work in demanding conditions and are critical to machine performance and track longevity.",
    aboutTitle: "About Bottom Rollers",
    aboutContent: [
      "Bottom rollers (also called track rollers or lower rollers) are mounted along the track frame and roll against the inside of the rubber track. They carry the entire weight of the machine and distribute it evenly across the track, reducing point loading and premature track wear.",
      "Each roller contains sealed bearings and lubricant that allow smooth rotation under heavy loads. The outer shell is typically hardened steel designed to resist wear from abrasive materials like sand, gravel, and debris.",
      "Quality bottom rollers feature double-sealed or triple-sealed bearings to prevent contamination and extend service life. The seal design is critical in harsh environments where mud, water, and fine particles can compromise bearing function.",
    ],
    functionTitle: "How Bottom Rollers Work",
    functionContent: "Bottom rollers ride along the inside of the track, supporting the machine's weight while allowing the track to move freely. They maintain track alignment and prevent the track from contacting the track frame. As the track rotates, the rollers spin on their bearings, distributing load and reducing friction.",
    signsTitle: "Signs You May Need Replacement Bottom Rollers",
    signsIntro: "Regular inspection of your bottom rollers can prevent costly track damage and downtime. Watch for these warning signs that indicate replacement may be needed:",
    signs: [
      {
        title: "Flat Spots or Uneven Wear",
        description: "Visible flat spots on the roller surface indicate bearing failure or seized rotation. This causes the roller to slide rather than roll, damaging both the roller and the track inner surface.",
      },
      {
        title: "Wobbling or Excessive Play",
        description: "Side-to-side movement or bearing play causes track misalignment and uneven wear. This often indicates worn bearings or internal damage that will worsen rapidly.",
      },
      {
        title: "Leaking Seals or Oil Weeping",
        description: "Oil around the roller face or shaft indicates seal failure. Without proper lubrication, bearings will fail quickly, often within hours of continued operation.",
      },
      {
        title: "Grinding or Unusual Noise",
        description: "Metallic grinding, squealing, or rumbling during operation suggests bearing damage or debris contamination. Stop operation and inspect immediately to prevent further damage.",
      },
      {
        title: "Track Derailment or Walking",
        description: "Worn rollers lose their ability to guide the track properly, leading to the track walking off to one side or complete derailment. This can cause significant damage to the track and undercarriage.",
      },
      {
        title: "Premature Track Wear",
        description: "If your tracks are wearing faster than expected, damaged bottom rollers may be causing uneven contact or increased friction. Replacing worn rollers can significantly extend track life.",
      },
    ],
    maintenanceTips: [
      "Inspect bottom rollers during every daily walk-around, looking for leaks, flat spots, and debris accumulation",
      "Check track tension regularly - improper tension accelerates roller and track wear",
      "Keep the undercarriage clean to prevent abrasive buildup that damages seals",
      "Replace rollers showing wear before they damage your rubber tracks",
      "Consider replacing all rollers on one side if multiple show similar wear patterns",
      "Document roller hours and operating conditions to predict replacement intervals",
    ],
    fitmentTitle: "Fitment Verification",
    fitmentContent: [
      "Bottom roller specifications can vary by serial number, production year, and undercarriage configuration. Some machines have solid-mount rollers while others use suspension-mount designs.",
      "Always verify your machine's serial number before ordering. Our team can cross-reference your serial to confirm the correct roller style, mounting pattern, and quantity.",
      "If you are unsure about roller specifications, contact us with your machine serial number and we will confirm exact fitment at no charge.",
    ],
  },
  "sprocket": {
    short: "Drive the track and transfer power from the final drive",
    intro: "Drive sprockets are the power transfer point between your machine's final drive and the rubber track. The sprocket teeth engage with the track lugs, converting hydraulic motor rotation into forward or reverse machine movement.",
    aboutTitle: "About Drive Sprockets",
    aboutContent: [
      "The drive sprocket is mounted directly to the final drive output and meshes with the track drive lugs. As the sprocket rotates, its teeth engage and push against the track lugs, propelling the machine forward or backward.",
      "Sprocket teeth are precision-machined to match the track lug pitch and profile. Over time, teeth wear and can become hooked, sharp, or misshapen, causing inefficient power transfer and accelerated track lug wear.",
      "Aftermarket sprockets are manufactured to OEM specifications using hardened steel alloys. Proper heat treatment ensures the tooth surface resists wear while the core remains tough enough to handle impact loads.",
    ],
    functionTitle: "How Drive Sprockets Work",
    functionContent: "The sprocket receives rotational power from the final drive motor. As it turns, each tooth engages with a track drive lug, pushing the track around the undercarriage. The sprocket effectively acts as a gear, transferring all drive force to the track. Proper tooth-to-lug engagement is critical for efficient power transfer and track longevity.",
    signsTitle: "Signs You May Need a Replacement Sprocket",
    signsIntro: "Worn sprockets directly impact track life and machine performance. Early detection prevents costly track damage:",
    signs: [
      {
        title: "Hooked or Sharp Sprocket Teeth",
        description: "Normal wear causes teeth to develop a hook shape on the drive side. Severely hooked teeth grab and release the track lugs abruptly, causing skipping and premature lug wear.",
      },
      {
        title: "Track Slipping or Skipping Under Load",
        description: "When sprocket teeth can no longer properly engage track lugs, the track may slip or skip, especially when pushing, climbing grades, or carrying heavy loads.",
      },
      {
        title: "Accelerated Track Lug Wear",
        description: "Worn sprockets cause uneven contact with track lugs, concentrating wear on specific points. If track lugs are wearing faster than expected, inspect the sprocket.",
      },
      {
        title: "Visible Tooth Damage or Cracks",
        description: "Chipped, cracked, or broken teeth cause track damage and uneven wear. Even one damaged tooth affects the entire track engagement pattern.",
      },
      {
        title: "Excessive Vibration During Travel",
        description: "Worn sprockets create an irregular engagement pattern that causes vibration, noise, and jerky movement, especially at higher travel speeds.",
      },
      {
        title: "Track Derailment Issues",
        description: "Severely worn sprockets may fail to maintain proper track engagement, contributing to track derailment during operation.",
      },
    ],
    maintenanceTips: [
      "Inspect sprocket teeth regularly for hook wear, cracks, and chips",
      "When installing new tracks, evaluate sprocket condition - worn sprockets will accelerate new track wear",
      "Measure tooth height or profile against OEM specifications to determine wear percentage",
      "Keep the sprocket area clean of debris that can interfere with track engagement",
      "Document sprocket hours to establish replacement intervals for your operating conditions",
      "Replace sprockets in pairs (left and right) when possible for balanced performance",
    ],
    fitmentTitle: "Fitment Verification",
    fitmentContent: [
      "Sprocket specifications vary by machine model, serial number, and in some cases by track type. Tooth count, bolt pattern, and hub dimensions must match your machine exactly.",
      "Some machines have serial number breaks where sprocket design changed during production. Providing your serial number ensures we match the correct part.",
      "Our team can verify sprocket specifications including tooth count, bolt circle, and mounting dimensions before shipment.",
    ],
  },
  "idler": {
    short: "Guide the track and maintain proper tension",
    intro: "Front idlers (also called track idlers) guide the rubber track around the front of the undercarriage while helping maintain proper track tension. The idler works with the track adjuster to keep consistent tension as operating conditions change.",
    aboutTitle: "About Track Idlers",
    aboutContent: [
      "The idler is positioned at the front of the undercarriage, opposite the drive sprocket. It guides the track around the front of the machine and maintains track alignment. The idler also absorbs shock loads when the machine encounters obstacles or uneven terrain.",
      "Idlers contain sealed bearings similar to bottom rollers but are designed to handle higher loads and maintain track alignment under varying terrain conditions. The idler shell may feature single, double, or triple flanges depending on machine design.",
      "The idler assembly includes the track adjuster mechanism, which uses hydraulic or mechanical pressure to maintain proper track tension. Correct tension is critical - too loose causes derailment risk, too tight accelerates wear on all undercarriage components.",
    ],
    functionTitle: "How Track Idlers Work",
    functionContent: "The idler rotates freely on bearings as the track moves around it. Spring or hydraulic pressure pushes the idler forward to maintain track tension. The idler flanges guide the track laterally, preventing it from walking off the undercarriage. On uneven terrain, the idler absorbs impact and allows the track adjuster to compensate for variations.",
    signsTitle: "Signs You May Need a Replacement Idler",
    signsIntro: "Idler problems affect track tension, alignment, and overall undercarriage performance. Watch for these indicators:",
    signs: [
      {
        title: "Track Wandering or Walking Off",
        description: "If the track consistently drifts to one side or tends to walk off the undercarriage, the idler may have worn flanges or internal damage affecting alignment.",
      },
      {
        title: "Uneven Idler Surface Wear",
        description: "Inspect the idler shell for flat spots, grooves, or uneven wear patterns. These indicate bearing problems or misalignment that will worsen if not addressed.",
      },
      {
        title: "Noisy Operation or Grinding Sounds",
        description: "Squealing, grinding, or rumbling from the front of the undercarriage often indicates idler bearing wear or seal failure.",
      },
      {
        title: "Track Tension Problems",
        description: "If track tension cannot be maintained or the track seems loose even after adjustment, the idler or adjuster mechanism may be damaged.",
      },
      {
        title: "Leaking Seals",
        description: "Oil or grease weeping from around the idler indicates seal failure. Contamination will quickly destroy the bearings.",
      },
      {
        title: "Wobbling or Excessive Movement",
        description: "Side-to-side wobble when rotating the idler suggests bearing wear. This affects track guidance and will cause premature track wear.",
      },
    ],
    maintenanceTips: [
      "Check track tension daily and adjust as needed - proper tension extends idler and track life",
      "Inspect idler for wear, damage, and seal leaks during routine maintenance",
      "Keep the undercarriage clean to prevent debris from damaging idler seals",
      "When inspecting idlers, also check bottom rollers and sprockets - undercarriage components often wear together",
      "Document idler condition and hours to predict replacement timing",
      "If replacing the idler, also inspect the track adjuster mechanism for wear or damage",
    ],
    fitmentTitle: "Fitment Verification",
    fitmentContent: [
      "Idler specifications vary significantly by machine model and serial number. Flange configuration (single, double, or triple), shaft dimensions, and overall size must match exactly.",
      "Some machines require specific idler variants based on undercarriage configuration or production changes. Always verify with your serial number.",
      "Contact us with your machine details, and we will confirm the correct idler specifications including flange style and dimensions.",
    ],
  },
  "carrier-roller": {
    short: "Support the top return portion of the track",
    intro: "Carrier rollers (also called top rollers or return rollers) support the upper span of the track as it returns from the front idler to the rear sprocket. Not all machines have carrier rollers - they are typically found on larger excavators and some dozer configurations.",
    aboutTitle: "About Carrier Rollers",
    aboutContent: [
      "Carrier rollers are positioned along the top of the track frame to support the track's return span. They prevent the track from sagging, reduce track slap against the frame, and help maintain consistent track tension throughout the system.",
      "Like bottom rollers, carrier rollers contain sealed bearings and are designed for continuous rotation under load. However, they typically handle lighter loads since they only support the track's weight, not the machine's weight.",
      "Carrier rollers are more common on larger tracked equipment. Many compact track loaders and mini excavators do not have carrier rollers - the track frame design supports the return span directly.",
    ],
    functionTitle: "How Carrier Rollers Work",
    functionContent: "The carrier roller rotates freely on bearings as the track passes over it. By supporting the track's upper span, it reduces stress on the track and prevents excessive sag that could interfere with operation or cause track slapping.",
    signsTitle: "Signs You May Need Replacement Carrier Rollers",
    signsIntro: "Carrier roller issues are often more noticeable because they are visible during operation:",
    signs: [
      {
        title: "Excessive Track Sag",
        description: "If the upper track span sags significantly between support points, carrier rollers may be seized or the bearings may have failed.",
      },
      {
        title: "Track Slapping or Bouncing",
        description: "A bouncing or slapping track on the return side indicates carrier rollers are not properly supporting the track. This causes noise and accelerated wear.",
      },
      {
        title: "Visible Roller Wear",
        description: "Flat spots, grooves, or uneven wear on the carrier roller surface indicate problems requiring attention.",
      },
      {
        title: "Seized or Non-Rotating Roller",
        description: "A roller that does not spin freely will cause rapid wear to both the roller shell and the track inner surface.",
      },
      {
        title: "Track Derailment Issues",
        description: "Failed carrier rollers can contribute to track derailment, especially on rough terrain or during aggressive operation.",
      },
    ],
    maintenanceTips: [
      "Visually inspect carrier rollers during daily walk-arounds - they are easily visible",
      "Spin each roller by hand to verify free rotation",
      "Check for oil leaks around the roller seals",
      "Keep the upper track area clean of debris",
      "Replace seized rollers immediately to prevent track damage",
    ],
    fitmentTitle: "Fitment Verification",
    fitmentContent: [
      "Carrier roller specifications vary by machine model. Verify your machine actually uses carrier rollers before ordering - many compact machines do not have them.",
      "Contact us with your machine model and serial number to confirm carrier roller requirements and specifications.",
    ],
  },
};

// Generate rich FAQs for component pages
function getComponentFAQs(brand: string, model: string, component: UndercarriageComponent): { question: string; answer: string }[] {
  const displayName = COMPONENT_DISPLAY_NAMES[component];
  const pluralName = COMPONENT_PLURAL_NAMES[component];
  const content = COMPONENT_CONTENT[component];
  
  const faqs = [
    {
      question: `What ${displayName.toLowerCase()} part number fits a ${brand} ${model}?`,
      answer: `The correct ${displayName.toLowerCase()} part number for your ${brand} ${model} depends on the serial number and undercarriage configuration. Some machines have design changes during production that affect part compatibility. Contact us with your machine serial number, and we will verify the exact part number at no charge.`,
    },
    {
      question: `How much does a ${brand} ${model} ${displayName.toLowerCase()} cost?`,
      answer: `${displayName} pricing varies based on quality tier and your machine's specific requirements. We offer economy, standard, and OEM-equivalent options at wholesale pricing. Contact us for a free quote with competitive pricing shipped from our Houston warehouse.`,
    },
    {
      question: `How long do ${pluralName.toLowerCase()} typically last?`,
      answer: `${displayName} lifespan depends on operating conditions, maintenance practices, and terrain. In typical applications, replacement intervals range from 2,000 to 4,000 hours. Harsh conditions like abrasive soil, water, or heavy use can shorten this significantly. Regular inspection helps identify wear before it causes track damage.`,
    },
    {
      question: `Should I replace all ${pluralName.toLowerCase()} at once?`,
      answer: `If multiple ${pluralName.toLowerCase()} show similar wear, replacing them together is often more cost-effective and ensures even performance. However, individual ${pluralName.toLowerCase()} can be replaced if only one shows damage or premature failure.`,
    },
    {
      question: `How do I know if my ${brand} ${model} ${pluralName.toLowerCase()} need replacement?`,
      answer: `${content.signsIntro.replace("Watch for these warning signs that indicate replacement may be needed:", "Common signs include")} ${content.signs.slice(0, 3).map(s => s.title.toLowerCase()).join(", ")}, and visible damage. Regular inspection during maintenance helps catch problems early.`,
    },
    {
      question: `Do you ship ${brand} ${model} ${pluralName.toLowerCase()} nationwide?`,
      answer: `Yes, we ship ${brand} undercarriage parts nationwide from our Houston warehouse. Many items are in stock and ship same-day for fast delivery. We can also expedite shipping for urgent needs.`,
    },
    {
      question: `Can I install ${pluralName.toLowerCase()} myself?`,
      answer: `${displayName} replacement typically requires proper equipment including jacks, blocking, and in some cases specialized tools. While experienced operators may perform this work, we recommend professional installation to ensure proper fitment and safe operation. Incorrect installation can cause track damage or safety hazards.`,
    },
  ];
  
  return faqs;
}

// Verified Part Card Component
function VerifiedPartCard({ part }: { part: VerifiedPart }) {
  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">
              Verified Fitment - Compatibility Confirmed
            </p>
            <h4 className="font-bold text-lg">{part.primary_part_number}</h4>
          </div>
        </div>
        
        {part.alt_part_numbers.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase mb-1">Alternate Part Numbers</p>
            <p className="text-sm font-medium">{part.alt_part_numbers.join(", ")}</p>
          </div>
        )}
        
        <div className="mb-3">
          <p className="text-xs text-muted-foreground uppercase mb-1">Common Fitment</p>
          <p className="text-sm">{part.compatible_models_text}</p>
        </div>
        
        {part.chassis_mount_notes && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase mb-1">Notes</p>
            <p className="text-sm">{part.chassis_mount_notes}</p>
          </div>
        )}
        
        {part.serial_notes && (
          <div className="mb-3 p-3 bg-amber-100 dark:bg-amber-950/50 rounded-lg border border-amber-300 dark:border-amber-700">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-100 font-medium">
                <span className="font-bold">Serial-specific:</span> {part.serial_notes}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button size="sm" asChild className="flex-1">
            <Link href={`/parts/${part.slug}`}>View Part Details</Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={BUSINESS_INFO.phoneTel}>
              <Phone className="h-4 w-4 mr-2" />
              Call to Confirm
            </Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Call {BUSINESS_INFO.phone} to verify fitment by serial number before ordering
        </p>
      </CardContent>
    </Card>
  );
}

// Researched Part Card Component (for staged/verified-researched parts)
// GOVERNANCE: These are research-based parts requiring serial verification
// They do NOT generate Product schema, sitemap entries, or /parts/[slug] pages
function ResearchedPartCard({ part }: { part: StagedPart }) {
  return (
    <Card className="border-blue-500/30 bg-blue-500/5">
      <CardContent className="p-6">
        {/* Status Badge - Clearly marked as research-based */}
        <div className="flex items-start gap-3 mb-4">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
              Research-Based Fitment — Call to Confirm
            </p>
            <h4 className="font-bold text-lg">{part.primary_part_number}</h4>
            {part.part_subtype && (
              <p className="text-xs text-muted-foreground capitalize">{part.part_subtype} {part.part_category}</p>
            )}
          </div>
        </div>
        
        {/* Product Name */}
        {part.product_name && (
          <p className="text-sm text-muted-foreground mb-4">{part.product_name}</p>
        )}
        
        {/* Part Number Hierarchy - Important for SEO and conversion */}
        <div className="space-y-3 mb-4">
          {/* Primary Part Number - Current/Active */}
          <div className="p-3 bg-background rounded-lg border">
            <p className="text-xs text-muted-foreground uppercase mb-1">Primary Part Number</p>
            <p className="font-bold text-lg">{part.primary_part_number}</p>
          </div>
          
          {/* Alternate / Interchange Numbers */}
          {part.alt_part_numbers.length > 0 && (
            <div className="p-3 bg-background rounded-lg border">
              <p className="text-xs text-muted-foreground uppercase mb-1">Alternate / Interchange Numbers</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {part.alt_part_numbers.map((altNum, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-1 bg-muted rounded text-sm font-medium">
                    {altNum}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Supersession / Interchange Notes - Critical for serial-break understanding */}
          {part.superseded_part_numbers && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-700 dark:text-amber-400 uppercase mb-1 font-medium">
                Supersession / Interchange Notes
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-100">{part.superseded_part_numbers}</p>
            </div>
          )}
        </div>
        
        {/* Compatible Machines */}
        {part.compatible_models_text && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase mb-1">Compatible Machines</p>
            <p className="text-sm">{part.compatible_models_text}</p>
          </div>
        )}
        
        {/* Chassis / Mount Type */}
        {part.chassis_mount_notes && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground uppercase mb-1">Mount Type / Chassis Notes</p>
            <p className="text-sm">{part.chassis_mount_notes}</p>
          </div>
        )}
        
        {/* Serial Number Specific Warning - High visibility */}
        {part.serial_notes && (
          <div className="mb-4 p-3 bg-amber-100 dark:bg-amber-950/50 rounded-lg border border-amber-300 dark:border-amber-700">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-400 uppercase font-bold mb-1">
                  Serial Number Specific
                </p>
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  {part.serial_notes}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Research Disclaimer - Required for governance */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Research-based fitment data.</strong> Please call with your machine serial number 
            to confirm compatibility before ordering. Part numbers and fitment may vary by serial range.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="sm" asChild className="flex-1">
            <Link href={BUSINESS_INFO.phoneTel}>
              <Phone className="h-4 w-4 mr-2" />
              Call to Confirm Fitment
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href="#quote">Request Quote</Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {BUSINESS_INFO.phone} • Houston, TX
        </p>
      </CardContent>
    </Card>
  );
}

export function MachineComponentDetailContent({
  brand,
  model,
  componentType,
  equipmentType = "Tracked Equipment",
  trackSizes = [],
}: MachineComponentDetailContentProps) {
  // Clean model for display (removes descriptors like "(Compact Track Loader)")
  const cleanModel = cleanModelForDisplay(model);
  const slug = createMachineSlug(brand, model);
  const content = COMPONENT_CONTENT[componentType];
  const displayName = COMPONENT_DISPLAY_NAMES[componentType];
  const pluralName = COMPONENT_PLURAL_NAMES[componentType];
  const urlPath = COMPONENT_URL_PATHS[componentType];
  const faqs = getComponentFAQs(brand, cleanModel, componentType);
  
  // Get verified parts for this machine+component
  const verifiedParts = getVerifiedPartsForMachine(brand, model, componentType);
  
  // Get staged/researched parts for this machine+component (verified compatibility data)
  // Controlled by feature flag - can be disabled before production launch
  const stagedParts = SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES 
    ? getStagedPartsForMachine(brand, model, componentType)
    : [];
  
  // Get other available components for this machine
  const availableComponents = getUndercarriageComponents(brand, model);
  const otherComponents = availableComponents.filter((c) => c !== componentType);
  
  // Get track sizes for this machine
  const machineTrackSizes = getTrackSizesForMachine(brand, model);
  
  // Generic component image path
  const componentImagePath = `/images/undercarriage/${componentType}-generic.jpg`;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${urlPath}`} className="hover:text-foreground">
              {pluralName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {brand} {cleanModel}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
                {pluralName} for {equipmentType}
              </p>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                {brand} {cleanModel} {pluralName}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                Replacement {pluralName.toLowerCase()} for {brand} {cleanModel} {equipmentType.toLowerCase()}s. {content.short}. Wholesale pricing with fast shipping from our Houston warehouse.
              </p>
              
              {/* Key benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Wholesale Pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Fast Nationwide Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Houston Warehouse</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Expert Support</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="#quote">Get a Free Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={BUSINESS_INFO.phoneTel}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call: {BUSINESS_INFO.phone}
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Component Image */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
              <Image
                src={componentImagePath}
                alt={`${brand} ${cleanModel} ${displayName} - Replacement undercarriage component`}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Parts Section - Show only if verified parts exist */}
      {verifiedParts.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border bg-green-500/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Verified Part Numbers for {brand} {cleanModel}
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              The following part numbers have been verified through extensive compatibility research, fitment validation, and real-world application history for {brand} {cleanModel} {equipmentType.toLowerCase()}s.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {verifiedParts.map((part) => (
                <VerifiedPartCard key={part.record_id} part={part} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Researched Parts Section - Show staged parts with verified compatibility data */}
      {/* GOVERNANCE: These parts are research-based, NOT fully verified imported/sold parts */}
      {/* They do NOT create /parts/[slug] pages, sitemap entries, or Product schema */}
      {stagedParts.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border bg-blue-50/50 dark:bg-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {verifiedParts.length > 0 ? "Additional " : ""}Researched Part Numbers for {brand} {cleanModel}
              </h2>
            </div>
            <div className="mb-6 p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Research-Based Fitment Data:</strong> The following part numbers have been researched for compatibility 
                with {brand} {cleanModel} {equipmentType.toLowerCase()}s. Part numbers and fitment vary by serial number range. 
                <strong className="block mt-1">Please call {BUSINESS_INFO.phone} with your machine serial number to confirm exact fitment before ordering.</strong>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {stagedParts.map((part) => (
                <ResearchedPartCard key={part.record_id} part={part} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Parts Found - Show call to confirm */}
      {verifiedParts.length === 0 && stagedParts.length === 0 && (
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <Card className="bg-secondary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ClipboardList className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Part Number Verification Required</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We stock {pluralName.toLowerCase()} for the {brand} {cleanModel}, but part numbers vary by serial number and configuration. Contact us with your machine serial number to confirm the exact part number for your {equipmentType.toLowerCase()}.
                    </p>
                    <Button size="sm" asChild>
                      <Link href={BUSINESS_INFO.phoneTel}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call {BUSINESS_INFO.phone} to Confirm Part Number
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* About Section - Rich Educational Content */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
            {content.aboutTitle} for {brand} {cleanModel}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {content.aboutContent.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <Card className="bg-secondary/50 h-fit">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Settings className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">{content.functionTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {content.functionContent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signs of Wear Section */}
      <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              {content.signsTitle}
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            {content.signsIntro}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.signs.map((sign, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2 flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {sign.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {sign.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fitment Verification Section */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
            {content.fitmentTitle}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {content.fitmentContent.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <Card className="bg-primary/5 border-primary/20 h-fit">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Free Fitment Verification</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Not sure which {displayName.toLowerCase()} fits your {brand} {cleanModel}? Contact us with your serial number and we will verify the correct part at no charge.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href={BUSINESS_INFO.phoneTel}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call {BUSINESS_INFO.phone}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`mailto:${BUSINESS_INFO.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Components Section */}
      <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Related {brand} {cleanModel} Parts
          </h2>
          <p className="text-muted-foreground mb-8">
            Complete your undercarriage maintenance with these related components for your {brand} {cleanModel}.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Link to machine page */}
            <Link href={`/machines/${slug}`} className="group">
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary">
                      Rubber Tracks
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {brand} {cleanModel} rubber track sizes and specifications
                  </p>
                  <span className="text-sm text-primary mt-3 group-hover:underline">
                    View tracks
                  </span>
                </CardContent>
              </Card>
            </Link>
            
            {/* Other undercarriage components */}
            {otherComponents.map((component) => (
              <Link
                key={component}
                href={getComponentUrl(brand, model, component)}
                className="group"
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold group-hover:text-primary">
                        {COMPONENT_DISPLAY_NAMES[component]}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground flex-grow">
                      {COMPONENT_CONTENT[component].short}
                    </p>
                    <span className="text-sm text-primary mt-3 group-hover:underline">
                      View {COMPONENT_PLURAL_NAMES[component].toLowerCase()}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Rubber Track Sizes Section */}
      {machineTrackSizes.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Compatible Rubber Track Sizes for {brand} {cleanModel}
            </h2>
            <p className="text-muted-foreground mb-6">
              Find the correct rubber track size for your {brand} {cleanModel}. Always verify with your serial number for accurate fitment.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {machineTrackSizes.map((trackSize) => (
                <Link
                  key={trackSize}
                  href={`/track-size/${trackSize.toLowerCase()}`}
                  className="group"
                >
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="p-4 text-center">
                      <span className="font-semibold text-lg group-hover:text-primary">
                        {trackSize}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        View details
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href={`/machines/${slug}`}>
                  View All {brand} {cleanModel} Rubber Track Options
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Request Quote Form */}
      <section id="quote" className="py-12 lg:py-16 border-b border-border scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Get a Quote for {brand} {cleanModel} {pluralName}
              </h2>
              <p className="text-muted-foreground">
                Contact us with your machine details for competitive wholesale pricing.
                Include your serial number for accurate fitment verification.
              </p>
            </div>
            
            <RequestQuoteForm
              machineBrand={brand}
              machineModel={cleanModel}
              category={componentType}
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions About {brand} {cleanModel} {pluralName}
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

      {/* Trust Signals */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why Choose Rubber Track Wholesale?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Wholesale Pricing</span>
                      <p className="text-sm text-muted-foreground">Competitive pricing direct from our Houston warehouse</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Fast Nationwide Shipping</span>
                      <p className="text-sm text-muted-foreground">Same-day shipping on in-stock items</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Expert Support</span>
                      <p className="text-sm text-muted-foreground">Knowledgeable staff to help with fitment and selection</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Quality Assurance</span>
                      <p className="text-sm text-muted-foreground">Premium components meeting OEM specifications</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg mb-4">Contact Us Today</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={BUSINESS_INFO.phoneTel} className="font-medium hover:text-primary">
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${BUSINESS_INFO.email}`} className="font-medium hover:text-primary">
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Houston, TX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
