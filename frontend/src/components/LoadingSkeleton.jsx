function LoadingSkeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[2rem] border border-border/15 bg-white/5 ${className}`}
    />
  );
}


export default LoadingSkeleton;
