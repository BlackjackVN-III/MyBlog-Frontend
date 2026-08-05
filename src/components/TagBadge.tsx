import React from "react";

export default function TagBadge({
  tag,
  active,
  onClick,
}: {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-white"
          : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-accent"
      }`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {tag}
    </button>
  );
}
