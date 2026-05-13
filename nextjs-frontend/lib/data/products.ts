// Fallback product data for when API returns empty
// This provides a good UX while the database is being populated

export interface FallbackProduct {
  id: string;
  title: string;
  brand_name: string;
  category: string;
  size?: string;
  track_size?: string;
  price?: number;
  in_stock: boolean;
  description: string;
  compatible_machines: string[];
  specifications?: Record<string, string>;
}

// Popular rubber track sizes with compatible machines
export const fallbackRubberTracks: FallbackProduct[] = [
  {
    id: "rt-400x86x52",
    title: "400x86x52 Rubber Track - Premium Quality",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "400x86x52",
    track_size: "400x86x52",
    in_stock: true,
    description: "Premium quality 400x86x52 rubber track with continuous steel cord construction. Fits Kubota SVL75, SVL95, Bobcat T650, T740, CAT 259D, 279D, and many more compact track loaders.",
    compatible_machines: ["Kubota SVL75", "Kubota SVL95", "Bobcat T650", "Bobcat T740", "CAT 259D", "CAT 279D", "Takeuchi TL10", "New Holland C227"],
    specifications: {
      width: "400mm",
      pitch: "86mm",
      links: "52",
      type: "CTL/Skid Steer",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-450x86x56",
    title: "450x86x56 Rubber Track - Premium Quality",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "450x86x56",
    track_size: "450x86x56",
    in_stock: true,
    description: "Premium quality 450x86x56 rubber track for larger CTLs. Fits CAT 289D, 299D, Kubota SVL97, John Deere 333G, Bobcat T770, T870, and similar machines.",
    compatible_machines: ["CAT 289D", "CAT 299D", "Kubota SVL97", "John Deere 333G", "Bobcat T770", "Bobcat T870", "Takeuchi TL12", "New Holland C238"],
    specifications: {
      width: "450mm",
      pitch: "86mm",
      links: "56",
      type: "CTL/Skid Steer",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-300x52.5x80",
    title: "300x52.5x80 Rubber Track - Mini Excavator",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "300x52.5x80",
    track_size: "300x52.5x80",
    in_stock: true,
    description: "Premium 300x52.5x80 rubber track for mini excavators. Fits Kubota KX71, KX91, Bobcat E35, E42, CAT 303.5, Takeuchi TB135, and similar 3-5 ton excavators.",
    compatible_machines: ["Kubota KX71", "Kubota KX91", "Bobcat E35", "Bobcat E42", "CAT 303.5", "Takeuchi TB135", "Yanmar VIO35", "Hitachi ZX35"],
    specifications: {
      width: "300mm",
      pitch: "52.5mm",
      links: "80",
      type: "Mini Excavator",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-320x86x52",
    title: "320x86x52 Rubber Track - Compact CTL",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "320x86x52",
    track_size: "320x86x52",
    in_stock: true,
    description: "Premium 320x86x52 rubber track for compact track loaders. Fits Kubota SVL65, Bobcat T595, T550, CAT 239D, New Holland C175, and similar compact CTLs.",
    compatible_machines: ["Kubota SVL65", "Bobcat T595", "Bobcat T550", "CAT 239D", "New Holland C175", "Takeuchi TL8", "Mustang 1750RT"],
    specifications: {
      width: "320mm",
      pitch: "86mm",
      links: "52",
      type: "Compact CTL",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-400x72.5x72",
    title: "400x72.5x72 Rubber Track - Mini Excavator",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "400x72.5x72",
    track_size: "400x72.5x72",
    in_stock: true,
    description: "Premium 400x72.5x72 rubber track for larger mini excavators. Fits Kubota KX121, Bobcat E50, E55, CAT 305, Takeuchi TB145, and similar 5-6 ton excavators.",
    compatible_machines: ["Kubota KX121", "Bobcat E50", "Bobcat E55", "CAT 305", "Takeuchi TB145", "Yanmar VIO50", "Hitachi ZX50"],
    specifications: {
      width: "400mm",
      pitch: "72.5mm",
      links: "72",
      type: "Mini Excavator",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-230x96x33",
    title: "230x96x33 Rubber Track - Compact Excavator",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "230x96x33",
    track_size: "230x96x33",
    in_stock: true,
    description: "Premium 230x96x33 rubber track for compact excavators. Fits Kubota K008, Bobcat E10, CAT 300.9D, and similar micro excavators.",
    compatible_machines: ["Kubota K008", "Bobcat E10", "CAT 300.9D", "Takeuchi TB108", "Yanmar SV08"],
    specifications: {
      width: "230mm",
      pitch: "96mm",
      links: "33",
      type: "Micro Excavator",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-350x52.5x86",
    title: "350x52.5x86 Rubber Track - Mini Excavator",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "350x52.5x86",
    track_size: "350x52.5x86",
    in_stock: true,
    description: "Premium 350x52.5x86 rubber track. Fits Kubota KX101, KX121-2, Bobcat E45, and similar mid-size mini excavators.",
    compatible_machines: ["Kubota KX101", "Kubota KX121-2", "Bobcat E45", "CAT 304", "Takeuchi TB240"],
    specifications: {
      width: "350mm",
      pitch: "52.5mm",
      links: "86",
      type: "Mini Excavator",
      construction: "Continuous Steel Cord",
    },
  },
  {
    id: "rt-180x72x37",
    title: "180x72x37 Rubber Track - Ditch Witch/Vermeer",
    brand_name: "RTW Premium",
    category: "rubber-tracks",
    size: "180x72x37",
    track_size: "180x72x37",
    in_stock: true,
    description: "Premium 180x72x37 rubber track for trenchers and directional drills. Fits Ditch Witch JT20, SK650, Vermeer D10x15, and similar utility equipment.",
    compatible_machines: ["Ditch Witch JT20", "Ditch Witch SK650", "Vermeer D10x15", "Vermeer S600TX", "Toro Dingo TX427"],
    specifications: {
      width: "180mm",
      pitch: "72mm",
      links: "37",
      type: "Utility/Trencher",
      construction: "Continuous Steel Cord",
    },
  },
];

// Fallback undercarriage parts - minimal data for now
export const fallbackBottomRollers: FallbackProduct[] = [
  {
    id: "br-kubota-svl",
    title: "Bottom Roller - Kubota SVL Series",
    brand_name: "RTW Parts",
    category: "bottom-rollers",
    in_stock: true,
    description: "Heavy-duty bottom roller for Kubota SVL65, SVL75, SVL95, SVL97 compact track loaders. OEM quality replacement.",
    compatible_machines: ["Kubota SVL65", "Kubota SVL75", "Kubota SVL95", "Kubota SVL97"],
  },
  {
    id: "br-bobcat-t",
    title: "Bottom Roller - Bobcat T Series",
    brand_name: "RTW Parts",
    category: "bottom-rollers",
    in_stock: true,
    description: "Heavy-duty bottom roller for Bobcat T550, T590, T595, T650, T740, T770, T870 track loaders. OEM quality replacement.",
    compatible_machines: ["Bobcat T550", "Bobcat T590", "Bobcat T595", "Bobcat T650", "Bobcat T740", "Bobcat T770", "Bobcat T870"],
  },
  {
    id: "br-cat-ctl",
    title: "Bottom Roller - CAT CTL Series",
    brand_name: "RTW Parts",
    category: "bottom-rollers",
    in_stock: true,
    description: "Heavy-duty bottom roller for CAT 239D, 249D, 259D, 279D, 289D, 299D track loaders. OEM quality replacement.",
    compatible_machines: ["CAT 239D", "CAT 249D", "CAT 259D", "CAT 279D", "CAT 289D", "CAT 299D"],
  },
];

export const fallbackSprockets: FallbackProduct[] = [
  {
    id: "sp-kubota-svl",
    title: "Drive Sprocket - Kubota SVL Series",
    brand_name: "RTW Parts",
    category: "sprockets",
    in_stock: true,
    description: "Heavy-duty drive sprocket for Kubota SVL65, SVL75, SVL95, SVL97 compact track loaders. OEM quality replacement.",
    compatible_machines: ["Kubota SVL65", "Kubota SVL75", "Kubota SVL95", "Kubota SVL97"],
  },
  {
    id: "sp-bobcat-t",
    title: "Drive Sprocket - Bobcat T Series",
    brand_name: "RTW Parts",
    category: "sprockets",
    in_stock: true,
    description: "Heavy-duty drive sprocket for Bobcat T550, T590, T595, T650, T740, T770, T870 track loaders. OEM quality replacement.",
    compatible_machines: ["Bobcat T550", "Bobcat T590", "Bobcat T595", "Bobcat T650", "Bobcat T740", "Bobcat T770", "Bobcat T870"],
  },
];

export const fallbackIdlers: FallbackProduct[] = [
  {
    id: "id-kubota-svl",
    title: "Front Idler - Kubota SVL Series",
    brand_name: "RTW Parts",
    category: "idlers",
    in_stock: true,
    description: "Heavy-duty front idler for Kubota SVL65, SVL75, SVL95, SVL97 compact track loaders. OEM quality replacement.",
    compatible_machines: ["Kubota SVL65", "Kubota SVL75", "Kubota SVL95", "Kubota SVL97"],
  },
  {
    id: "id-bobcat-t",
    title: "Front Idler - Bobcat T Series",
    brand_name: "RTW Parts",
    category: "idlers",
    in_stock: true,
    description: "Heavy-duty front idler for Bobcat T550, T590, T595, T650, T740, T770, T870 track loaders. OEM quality replacement.",
    compatible_machines: ["Bobcat T550", "Bobcat T590", "Bobcat T595", "Bobcat T650", "Bobcat T740", "Bobcat T770", "Bobcat T870"],
  },
];

export const fallbackFinalDrives: FallbackProduct[] = [
  {
    id: "fd-kubota-svl75",
    title: "Final Drive - Kubota SVL75/SVL75-2",
    brand_name: "RTW Parts",
    category: "final-drives",
    in_stock: true,
    description: "Remanufactured final drive assembly for Kubota SVL75 and SVL75-2 compact track loaders. Includes motor and gearbox.",
    compatible_machines: ["Kubota SVL75", "Kubota SVL75-2"],
  },
  {
    id: "fd-bobcat-t650",
    title: "Final Drive - Bobcat T650",
    brand_name: "RTW Parts",
    category: "final-drives",
    in_stock: true,
    description: "Remanufactured final drive assembly for Bobcat T650 compact track loader. Includes motor and gearbox.",
    compatible_machines: ["Bobcat T650"],
  },
];

// Get fallback products by category
export function getFallbackProducts(category: string): FallbackProduct[] {
  switch (category) {
    case "rubber-tracks":
      return fallbackRubberTracks;
    case "bottom-rollers":
      return fallbackBottomRollers;
    case "sprockets":
      return fallbackSprockets;
    case "idlers":
      return fallbackIdlers;
    case "final-drives":
      return fallbackFinalDrives;
    default:
      return [];
  }
}

// Search fallback products
export function searchFallbackProducts(
  products: FallbackProduct[],
  query: string
): FallbackProduct[] {
  if (!query) return products;
  
  const q = query.toLowerCase().trim();
  
  return products.filter((p) => {
    // Search in title
    if (p.title.toLowerCase().includes(q)) return true;
    // Search in brand
    if (p.brand_name.toLowerCase().includes(q)) return true;
    // Search in description
    if (p.description.toLowerCase().includes(q)) return true;
    // Search in size/track_size
    if (p.size?.toLowerCase().includes(q)) return true;
    if (p.track_size?.toLowerCase().replace(/\s+/g, "").includes(q.replace(/\s+/g, ""))) return true;
    // Search in compatible machines
    if (p.compatible_machines.some((m) => m.toLowerCase().includes(q))) return true;
    
    return false;
  });
}

// Filter fallback products by brand
export function filterFallbackProductsByBrand(
  products: FallbackProduct[],
  brand: string
): FallbackProduct[] {
  const b = brand.toLowerCase().trim();
  
  return products.filter((p) => {
    // Check brand name
    if (p.brand_name.toLowerCase().includes(b)) return true;
    // Check compatible machines for brand
    if (p.compatible_machines.some((m) => m.toLowerCase().startsWith(b))) return true;
    
    return false;
  });
}
