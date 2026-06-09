// Fixed lookup of EXACTLY the 4 wide sizes that have an established
// inch (Standard) + millimeter (Metric) dual convention. Every other size
// keeps its current mm-only display — do NOT compute inches for other sizes.
type DualDimension = {
  standard: { width: string; pitch: string; links: string };
  metric: { width: string; pitch: string; links: string };
};

const DUAL_DIMENSION_SIZES: Record<string, DualDimension> = {
  "381x101.6x42": {
    standard: { width: "15in", pitch: "4in", links: "42" },
    metric: { width: "381mm", pitch: "101.6mm", links: "42" },
  },
  "457x101.6x50": {
    standard: { width: "18in", pitch: "4in", links: "50" },
    metric: { width: "457mm", pitch: "101.6mm", links: "50" },
  },
  "457x101.6x51": {
    standard: { width: "18in", pitch: "4in", links: "51" },
    metric: { width: "457mm", pitch: "101.6mm", links: "51" },
  },
  "457x101.6x56": {
    standard: { width: "18in", pitch: "4in", links: "56" },
    metric: { width: "457mm", pitch: "101.6mm", links: "56" },
  },
};

export function getDualDimension(size: string): DualDimension | null {
  if (!size) return null;
  return DUAL_DIMENSION_SIZES[size.trim().toLowerCase()] ?? null;
}

export function DualDimensionTable({ size }: { size: string }) {
  const dim = getDualDimension(size);
  if (!dim) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Track Dimensions for {size}</caption>
        <thead>
          <tr className="bg-secondary text-foreground">
            <th scope="col" className="px-4 py-2 text-left font-semibold">
              Track Dimensions
            </th>
            <th scope="col" className="px-4 py-2 text-right font-semibold">
              Width
            </th>
            <th scope="col" className="px-4 py-2 text-right font-semibold">
              Pitch
            </th>
            <th scope="col" className="px-4 py-2 text-right font-semibold">
              Links
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <th scope="row" className="px-4 py-2 text-left text-muted-foreground font-medium">
              Standard
            </th>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.standard.width}</td>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.standard.pitch}</td>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.standard.links}</td>
          </tr>
          <tr className="border-t border-border">
            <th scope="row" className="px-4 py-2 text-left text-muted-foreground font-medium">
              Metric
            </th>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.metric.width}</td>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.metric.pitch}</td>
            <td className="px-4 py-2 text-right font-medium text-foreground">{dim.metric.links}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
