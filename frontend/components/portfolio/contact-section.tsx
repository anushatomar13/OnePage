"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Mail, Phone, Send } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "./primitives";
import { SocialLinks } from "./social-links";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  "w-full rounded-xl border border-input bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40";

export function ContactSection({ portfolio }: { portfolio: Portfolio }) {
  const { hero } = portfolio;
  const to = hero.links.email;
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    // No mail server — compose a message in the visitor's own client.
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    if (to) window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={SECTION_META.contact.eyebrow}
            title="Let's build something."
          />
          <Reveal delay={0.12}>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Have a role, a project, or just want to say hello? My inbox is
              always open.
            </p>

            <div className="mt-8 space-y-3">
              {to && (
                <a
                  href={`mailto:${to}`}
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  {to}
                </a>
              )}
              {hero.links.phone && (
                <a
                  href={`tel:${hero.links.phone}`}
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  {hero.links.phone}
                </a>
              )}
            </div>

            <SocialLinks links={hero.links} className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="glass rounded-3xl p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-7" />
                </div>
                <h3 className="mt-5 text-xl font-medium">Message ready</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Your email client should have opened with the message drafted.
                  Just hit send.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <input
                    className={inputClass}
                    placeholder="Your name"
                    aria-label="Your name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-destructive">
                      Please enter your name.
                    </p>
                  )}
                </div>
                <div>
                  <input
                    className={inputClass}
                    placeholder="Your email"
                    aria-label="Your email"
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-destructive">
                      Please enter a valid email.
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    rows={4}
                    className={cn(inputClass, "resize-none")}
                    placeholder="Your message"
                    aria-label="Your message"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">
                      Please write a message.
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send message
                  <Send className="size-4" />
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
