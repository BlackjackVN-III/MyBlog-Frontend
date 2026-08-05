import React from "react";

export default function Avatar({
  initials,
  size = "md",
  src,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  src?: string;
}) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  if (src) {
    return <img src={src} alt={initials} className={`${sizes[size]} rounded-full object-cover`} />;
  }
  return (
    <div className={`${sizes[size]} rounded-full bg-primary/20 text-accent font-semibold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}
