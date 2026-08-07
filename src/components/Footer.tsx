import React from "react";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { Page } from "../types";

export default function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t border-border mt-16 py-10 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-foreground text-sm" style={{ fontFamily: "var(--font-display)" }}>
              DevLog<span className="text-primary">.</span>
            </span>
          </button>
          <p className="text-xs text-muted-foreground">
            © 2026 BlackjackVN · Made with React, .NET Core & love
          </p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
