import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMachineModels,
  parseMachineSlug,
  getCompatibilityByMachine,
  getProducts,
} from "@/lib/api";
import { MachineDetailContent } from "@/components/machines/machine-detail-content";
import {
  generateBreadcrumbSchema,
  generateMachineSchema,
  generateFAQPageSchema,
} from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
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
      canonical: `https://rubbertrackwholesale.com/machines/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const machines = await getMachineModels();
    return machines.slice(0, 100).map((machine) => ({
      slug: `${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
    }));
  } catch {
    return [];
  }
}

export default async function MachineDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseMachineSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { make, model } = parsed;

  let compatibility = null;
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let relatedMachines: Awaited<ReturnType<typeof getMachineModels>> = [];

  try {
    [compatibility, products, relatedMachines] = await Promise.all([
      getCompatibilityByMachine(make, model).catch(() => null),
      getProducts({ brand: make, q: model }).catch(() => []),
      getMachineModels().catch(() => []),
    ]);
  } catch (error) {
    console.error("Failed to fetch machine data:", error);
  }

  const trackSizes = compatibility?.track_sizes?.map((t) => t.size) || [];
  const equipmentType = compatibility?.machine?.equipment_type || "Construction Equipment";

  // Filter related machines by same brand, excluding current
  const filteredRelated = relatedMachines
    .filter((m) => m.make?.toLowerCase() === make.toLowerCase() && m.model !== model)
    .slice(0, 8);

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Machines", url: "https://rubbertrackwholesale.com/machines" },
    { name: `${make} ${model}`, url: `https://rubbertrackwholesale.com/machines/${slug}` },
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
        relatedMachines={filteredRelated}
        faqs={faqs}
      />
    </>
  );
}
