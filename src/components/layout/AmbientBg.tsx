const LAYERS = [
  'ambient-base',
  'ambient-depth',
  'ambient-quant-orbit',
  'ambient-quant-ceiling',
  'ambient-quant-wall ambient-quant-wall--left',
  'ambient-quant-wall ambient-quant-wall--right',
  'ambient-quant-glow',
  'ambient-quant-grid',
] as const;

/** Fixed full-screen background (neutral + quant 3D). Styles: `src/styles/ambient.css`. */
export function AmbientBg() {
  return (
    <div className="site-ambient-bg" aria-hidden="true">
      {LAYERS.map((classes) => (
        <div key={classes} className={`ambient-layer ${classes}`} />
      ))}
    </div>
  );
}
