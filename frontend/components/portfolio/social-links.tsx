"use client";

import type { ComponentType } from "react";
import { Globe, Mail, Phone } from "lucide-react";
import type { SocialLinks as Links } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, XIcon } from "./brand-icons";

type IconType = ComponentType<{ className?: string }>;

const ORDER: { key: keyof Links; icon: IconType; label: string; href: (v: string) => string }[] = [
  { key: "email", icon: Mail, label: "Email", href: (v) => `mailto:${v}` },
  { key: "phone", icon: Phone, label: "Phone", href: (v) => `tel:${v}` },
  { key: "linkedin", icon: LinkedinIcon, label: "LinkedIn", href: (v) => v },
  { key: "github", icon: GithubIcon, label: "GitHub", href: (v) => v },
  { key: "website", icon: Globe, label: "Website", href: (v) => v },
  { key: "twitter", icon: XIcon, label: "X", href: (v) => v },
];

export function SocialLinks({
  links,
  className,
}: {
  links: Links;
  className?: string;
}) {
  const items = ORDER.filter((o) => links[o.key]);
  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map(({ key, icon: Icon, label, href }) => (
        <a
          key={key}
          href={href(links[key] as string)}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="glass flex size-11 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-primary"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
