import { ArrowUpRight, Briefcase, GraduationCap, History, MapPin, Target } from "lucide-react"

import { about, experience, fullStacks, skills } from "@/data/portfolio"
import { Reveal, SectionHeading } from "@/components/reveal"

const FACT_ICONS = {
  location: MapPin,
  work: Briefcase,
  history: History,
  focus: Target,
  education: GraduationCap,
} as const

/* Numbers are counted from your own data, so they stay accurate as you edit */
const technologyCount = new Set(skills.flatMap((g) => g.items)).size
const stats = [
  { value: String(experience.length), label: "Companies worked with" },
  { value: String(fullStacks.length), label: "Full stacks: .NET and Node.js" },
  { value: `${technologyCount}+`, label: "Technologies and tools" },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="about-title"
          title={about.heading}
          subtitle="Full-stack developer working across the .NET and Node.js ecosystems."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((text, i) => (
              <p key={text} className={i === 0 ? "text-xl leading-relaxed font-medium text-foreground" : undefined}>
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-card p-4 text-center shadow-xs">
                  <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <dl className="divide-y rounded-xl border bg-card shadow-xs">
              {about.facts.map((fact) => {
                const Icon = FACT_ICONS[fact.icon]
                return (
                  <div key={fact.label} className="flex items-start gap-4 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-primary">
                      <Icon className="size-[18px]" />
                    </span>
                    <div>
                      <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                      <dd className="font-semibold">
                        {"href" in fact && fact.href ? (
                          <a
                            href={fact.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 underline-offset-4 hover:text-primary hover:underline"
                          >
                            {fact.value}
                            <ArrowUpRight className="size-4 shrink-0 text-primary" />
                          </a>
                        ) : (
                          fact.value
                        )}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
