import { ArrowUp, Mail } from "lucide-react"

import { nav, profile } from "@/data/portfolio"
import { GitHubIcon, LinkedInIcon, LogoMark } from "@/components/icons"

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <LogoMark letter={profile.initials} />
              <span className="text-lg font-bold">{profile.name}</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">{profile.role} based in {profile.location}.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
            {[
              { label: "GitHub", href: profile.socials.github, icon: <GitHubIcon className="size-4" /> },
              { label: "LinkedIn", href: profile.socials.linkedin, icon: <LinkedInIcon className="size-4" /> },
              { label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="size-4" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-primary">
            <ArrowUp className="size-4" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
