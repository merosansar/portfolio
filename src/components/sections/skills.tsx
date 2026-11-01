import { Cloud, Database, Layers, Monitor, Server } from "lucide-react"

import { fullStacks, skills, type SkillGroup } from "@/data/portfolio"
import { Reveal, SectionHeading } from "@/components/reveal"
import { TechIcon } from "@/components/tech-icon"

const GROUP_ICONS: Record<SkillGroup["icon"], typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  cloud: Cloud,
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="skills-title"
          title="Skills & technologies"
          subtitle="The tools I use to design, build and ship web applications, from the interface to the cloud."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group, i) => {
            const Icon = GROUP_ICONS[group.icon]
            return (
              <Reveal key={group.group} delay={(i % 2) * 0.08}>
                <article className="h-full rounded-2xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 md:p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-primary">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{group.group}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 rounded-lg border bg-surface px-3 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-brand-soft"
                      >
                        <TechIcon name={item} className="size-5 shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Two full stacks */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {fullStacks.map((stack, i) => (
            <Reveal key={stack.name} delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-indigo-700 p-6 text-white shadow-lg shadow-primary/20 md:p-7">
                <div aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full bg-white/10" />
                <div className="relative flex items-center gap-3">
                  <Layers className="size-5 text-white/80" />
                  <h3 className="text-xl font-bold">{stack.name}</h3>
                </div>
                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#0f1b33]"
                    >
                      <TechIcon name={item} className="size-4 dark:invert-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
