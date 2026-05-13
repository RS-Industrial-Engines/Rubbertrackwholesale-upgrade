import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMachineModels,
  parseMachineSlug,
  getCompatibilityByMachine,
  getProducts,
  MachineModel,
  CompatibilitySearchResult,
} from "@/lib/api";
import { MachineDetailContent } from "@/components/machines/machine-detail-content";
import {
  generateBreadcrumbSchema,
  generateMachineSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";
import {
  machineModels as fallbackMachineModels,
  machineCompatibility,
  getModelsByBrand,
} from "@/lib/data/machine-models";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Get fallback compatibility data for a machine
function getFallbackCompatibility(make: string, model: string): CompatibilitySearchResult | null {
  const key = `${make} ${model}`;
  const trackSizes = machineCompatibility[key];
  
  if (!trackSizes || trackSizes.length === 0) {
    // Check for partial matches
    const makeModels = Object.keys(machineCompatibility);
    const match = makeModels.find(k => 
      k.toLowerCase() === key.toLowerCase() ||
      k.toLowerCase().includes(model.toLowerCase())
    );
    
    if (match) {
      const matchedSizes = machineCompatibility[match];
      return {
        machine: {
          id: 1,
          make: make,
          model: model,
          equipment_type: "Compact Track Loader",
        },
        track_sizes: matchedSizes.map((size, i) => ({
          id: i + 1,
          size,
          width: parseInt(size.split("x")[0]),
          pitch: parseFloat(size.split("x")[1]),
          links: parseInt(size.split("x")[2]),
        })),
        products: [],
      };
    }
    
    return null;
  }

  return {
    machine: {
      id: 1,
      make: make,
      model: model,
      equipment_type: "Compact Track Loader",
    },
    track_sizes: trackSizes.map((size, i) => ({
      id: i + 1,
      size,
      width: parseInt(size.split("x")[0]),
      pitch: parseFloat(size.split("x")[1]),
      links: parseInt(size.split("x")[2]),
    })),
    products: [],
  };
}

// Get fallback related machines
function getFallbackRelatedMachines(make: string, model: string): MachineModel[] {
  const models = getModelsByBrand(make);
  return models
    .filter(m => m !== model)
    .slice(0, 8)
    .map((m, i) => ({
      id: i + 1,
      make: make,
      model: m,
      equipment_type: "Compact Track Loader",
      track_sizes: machineCompatibility[`${make} ${m}`] || [],
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseMachineSlug(slug);

  if (!parsed) {
    return {
      title: "Machine Not Found",
    };
  }

  const { make, model } = parsed;
  const title = `${make} ${model} Rubber Tracks & Undercarriage Parts | Houston TX`;
  const description = `Find compatible rubber tracks, bottom rollers, sprockets, and idlers for ${make} ${model}. Wholesale prices with fast shipping from Houston. In stock & ready to ship.`;

  return {
    title,
    description,
    keywords: [
      `${make} ${model} rubber tracks`,
      `${make} ${model} tracks`,
      `${make} ${model} undercarriage`,
      `${make} ${model} bottom rollers`,
      `${make} ${model} sprockets`,
      `${make} ${model} idlers`,
      `rubber tracks for ${make} ${model}`,
      `${model} rubber tracks`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/machines/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const machines = await getMachineModels();
    if (machines && machines.length > 0) {
      return machines.slice(0, 100).map((machine) => ({
        slug: `${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
      }));
    }
  } catch {
    // Fall back to local data
  }
  
  // Generate from fallback data
  const params: { slug: string }[] = [];
  for (const [brand, models] of Object.entries(fallbackMachineModels)) {
    models.slice(0, 10).forEach(model => {
      params.push({
        slug: `${brand.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`,
      });
    });
  }
  return params.slice(0, 100);
}

export default async function MachineDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseMachineSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { make, model } = parsed;

  let compatibility: CompatibilitySearchResult | null = null;
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let relatedMachines: MachineModel[] = [];

  try {
    const [apiCompatibility, apiProducts, apiRelatedMachines] = await Promise.all([
      getCompatibilityByMachine(make, model).catch(() => null),
      getProducts({ brand: make, q: model }).catch(() => []),
      getMachineModels().catch(() => []),
    ]);
    
    // Use API data if available, otherwise fall back
    compatibility = apiCompatibility || getFallbackCompatibility(make, model);
    products = apiProducts || [];
    relatedMachines = apiRelatedMachines && apiRelatedMachines.length > 0
      ? apiRelatedMachines.filter((m) => m.make?.toLowerCase() === make.toLowerCase() && m.model !== model).slice(0, 8)
      : getFallbackRelatedMachines(make, model);
  } catch (error) {
    console.error("Failed to fetch machine data, using fallback:", error);
    compatibility = getFallbackCompatibility(make, model);
    relatedMachines = getFallbackRelatedMachines(make, model);
  }

  const trackSizes = compatibility?.track_sizes?.map((t) => t.size) || [];
  const equipmentType = compatibility?.machine?.equipment_type || "Construction Equipment";

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Machines", url: `${SITE_URL}/machines` },
    { name: `${make} ${model}`, url: `${SITE_URL}/machines/${slug}` },
  ];

  const faqs = [
    {
      question: `What size rubber tracks fit a ${make} ${model}?`,
      answer: trackSizes.length > 0
        ? `The ${make} ${model} uses ${trackSizes.join(", ")} rubber tracks. We stock all compatible sizes at wholesale prices.`
        : `Contact us for compatible track sizes for your ${make} ${model}. Our experts can help you find the right fit.`,
    },
    {
      question: `How much do ${make} ${model} rubber tracks cost?`,
      answer: `${make} ${model} rubber track prices vary based on quality and supplier. We offer premium aftermarket tracks at 30-50% below OEM prices. Request a quote for current pricing.`,
    },
    {
      question: `How long do rubber tracks last on a ${make} ${model}?`,
      answer: `With proper use and maintenance, rubber tracks on a ${make} ${model} typically last 1,200-2,000 hours. Terrain, operating conditions, and maintenance affect track life.`,
    },
    {
      question: `Do you ship ${make} ${model} tracks to my location?`,
      answer: `Yes! We ship ${make} ${model} rubber tracks nationwide from our Houston warehouse. Most orders ship same-day with delivery in 2-5 business days.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateMachineSchema(make, model, equipmentType, trackSizes)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
        }}
      />
      <MachineDetailContent
        make={make}
        model={model}
        slug={slug}
        compatibility={compatibility}
        products={products}
        relatedMachines={relatedMachines}
        faqs={faqs}
      />
    </>
  );
}
