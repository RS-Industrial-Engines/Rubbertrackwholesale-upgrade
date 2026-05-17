/**
 * Staged parts review helpers.
 * Maps StagedPart fields to the same component types used by verified parts
 * so the review page can render machine links, breadcrumbs, and schemas identically.
 */
import { StagedPart, STAGED_PARTS } from "@/lib/data/staged-parts-data";
import { UndercarriageComponent } from "@/lib/data/undercarriage-data";
import { getValidatedMachineLink } from "@/lib/data/verified-parts-data";
import { cleanModelForDisplay } from "@/lib/data/full-machine-data";

/**
 * Map staged part_category to UndercarriageComponent
 * StagedPart uses "roller" for bottom rollers, while the system uses "bottom-roller"
 */
const STAGED_CATEGORY_TO_COMPONENT: Record<string, UndercarriageComponent | null> = {
  "roller": "bottom-roller",
  "sprocket": "sprocket",
  "idler": "idler",
  "carrier-roller": "carrier-roller",
  "track": null, // tracks are not undercarriage components in the current system
};

export function getComponentTypeFromStagedPart(part: StagedPart): UndercarriageComponent | null {
  return STAGED_CATEGORY_TO_COMPONENT[part.part_category] || null;
}

export function getStagedPartBySlug(slug: string): StagedPart | null {
  return STAGED_PARTS.find((p) => p.slug === slug) || null;
}

export function getAllStagedPartSlugs(): string[] {
  return STAGED_PARTS.filter((p) => p.slug).map((p) => p.slug);
}

/**
 * Get compatible machine links for a staged part.
 * Same logic as getCompatibleMachinesForPart but works with StagedPart interface.
 */
export function getCompatibleMachinesForStagedPart(
  part: StagedPart,
  componentType: UndercarriageComponent
): {
  verified: Array<{ brand: string; model: string; slug: string; url: string }>;
  unverified: Array<{ brand: string; model: string }>;
} {
  const verified: Array<{ brand: string; model: string; slug: string; url: string }> = [];
  const unverified: Array<{ brand: string; model: string }> = [];

  for (const modelName of part.compatible_models) {
    const link = getValidatedMachineLink(part.brand, modelName, componentType);

    if (link) {
      verified.push({
        brand: part.brand,
        model: cleanModelForDisplay(modelName),
        slug: link.slug,
        url: link.url,
      });
    } else {
      unverified.push({
        brand: part.brand,
        model: cleanModelForDisplay(modelName),
      });
    }
  }

  return { verified, unverified };
}

/**
 * Auto-generate a slug for staged parts that don't have one yet.
 * Format: brand-partNumber-category (e.g., "bobcat-6693239-bottom-roller")
 */
export function generateStagedSlug(part: StagedPart): string {
  if (part.slug) return part.slug;

  return `${part.brand}-${part.primary_part_number}-${part.part_category}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
