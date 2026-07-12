type TireSizeDiagramProps = {
  /** Example size string, e.g. "205/55R16 91V". */
  size?: string;
  /** Smaller variant for inline form helpers. */
  compact?: boolean;
};

const DEFAULT_SIZE = '205/55R16 91V';

function parseSize(size: string) {
  const match = size.match(/^(\d{3})\/(\d{2,3})\s*R\s*(\d{2})\s*(.*)$/i);
  if (!match) return null;
  const [, width, ratio, diameter, loadSpeed] = match;
  return { width, ratio, diameter, loadSpeed: (loadSpeed ?? '').trim() };
}

/* Labeled tire-sidewall callout — recreates the classic "205/55R16" width /
   ratio / diameter breakdown customers see on their own tire, styled with
   the site's tokens instead of a bitmap so it stays crisp at any size. */
export function TireSizeDiagram({ size = DEFAULT_SIZE, compact = false }: TireSizeDiagramProps) {
  const parsed = parseSize(size) ?? parseSize(DEFAULT_SIZE)!;
  const h = compact ? 132 : 168;
  const labelY = compact ? 14 : 18;
  const tickTopY = compact ? 20 : 26;
  const boxY = compact ? 34 : 44;
  const boxH = compact ? 76 : 96;
  const numFontSize = compact ? 30 : 40;
  const trailFontSize = compact ? 15 : 19;
  const labelFontSize = compact ? 10 : 12;

  const columns = [
    { key: 'width', label: 'WIDTH', cx: 90 },
    { key: 'ratio', label: 'RATIO', cx: 195 },
    { key: 'diameter', label: 'DIAMETER', cx: 292 },
  ];

  return (
    <svg
      viewBox={`0 0 360 ${h}`}
      width="100%"
      role="img"
      aria-label={`Tire size example: ${size}. Width ${parsed.width}, aspect ratio ${parsed.ratio}, wheel diameter ${parsed.diameter}.`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {columns.map((col) => (
        <g key={col.key}>
          <text
            x={col.cx}
            y={labelY}
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-condensed)',
              fontWeight: 700,
              fontSize: labelFontSize,
              letterSpacing: '0.08em',
              fill: 'var(--steel-300)',
            }}
          >
            {col.label}
          </text>
          <line
            x1={col.cx}
            y1={tickTopY}
            x2={col.cx}
            y2={boxY}
            stroke="var(--signal-orange)"
            strokeWidth={1.5}
          />
        </g>
      ))}

      <rect
        x={0}
        y={boxY}
        width={360}
        height={boxH}
        rx={8}
        fill="var(--graphite-800)"
        stroke="var(--border-default)"
        strokeWidth={1}
      />

      <text
        x={180}
        y={boxY + boxH / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="rr-numeric"
        style={{ fontFamily: 'var(--font-display)', fontSize: numFontSize, fill: 'var(--off-white)' }}
      >
        <tspan style={{ fill: 'var(--signal-orange)' }}>{parsed.width}</tspan>
        <tspan style={{ fill: 'var(--steel-300)' }}> / </tspan>
        <tspan style={{ fill: 'var(--signal-orange)' }}>{parsed.ratio}</tspan>
        <tspan style={{ fill: 'var(--steel-300)' }}> R</tspan>
        <tspan style={{ fill: 'var(--signal-orange)' }}>{parsed.diameter}</tspan>
        {parsed.loadSpeed && (
          <tspan dx={8} style={{ fill: 'var(--steel-300)', fontSize: trailFontSize }}>
            {parsed.loadSpeed}
          </tspan>
        )}
      </text>
    </svg>
  );
}
