export default function ProjectArt({ hue, slug }: { hue: number; slug: string }) {
  const c1 = `hsl(${hue} 70% 92%)`, c2 = `hsl(${hue} 55% 40%)`;
  return (
    <svg aria-hidden="true" viewBox="0 0 400 180" className="h-40 w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="180" fill={c1} />
      <g fill="none" stroke={c2} strokeWidth="2" opacity=".8">
        {slug === "pdf-extractor" || slug === "materials-data" ? (<><rect x="120" y="30" width="160" height="120" rx="6" fill="#fff" />{[60, 85, 110].map((y) => <path key={y} d={`M135 ${y}h130`} />)}<path d="M180 45v95M225 45v95" /></>)
          : (<><rect x="90" y="30" width="220" height="120" rx="8" fill="#fff" /><path d="M90 52h220" /><circle cx="104" cy="41" r="3" /><rect x="110" y="68" width="90" height="12" rx="3" /><path d="M110 96h180M110 112h150M110 128h120" /></>)}
      </g>
    </svg>
  );
}
