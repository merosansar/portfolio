import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { ArrowUpRight, CalendarDays, CheckCircle2, GraduationCap, MapPin } from "lucide-react"

import { education, experience } from "@/data/portfolio"
import { Reveal, SectionHeading } from "@/components/reveal"

/** Two-letter badge from a company name, e.g. "Smart Solutions…" → "SS" */
function initials(name: string) {
  return name
    .replace(/pvt\.?|ltd\.?|private|limited/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("")
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          id="experience-title"
          title="Experience & education"
          subtitle="Companies where I've designed, built and maintained software, and where I studied."
        />

        <ol ref={listRef} className="relative space-y-6 pl-8 md:pl-12">
          {/* Timeline line that fills as you scroll */}
          <div aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-0.5 rounded-full bg-border md:left-[15px]">
            <motion.div className="absolute inset-0 origin-top bg-primary" style={{ scaleY: reduce ? 1 : progress }} />
          </div>

          {experience.map((job, i) => {
            const points = job.points?.filter(Boolean) ?? []
            const when = job.period || (job.current ? "Present" : "")
            return (
              <li key={job.org} className="relative">
                <span
                  aria-hidden="true"
                  className={
                    "absolute top-7 -left-8 grid size-4 place-items-center rounded-full border-2 md:-left-12 md:size-8 " +
                    (job.current
                      ? "border-primary bg-primary shadow-[0_0_0_6px] shadow-primary/15"
                      : "border-primary/50 bg-background")
                  }
                >
                  {job.current && <span className="hidden size-2.5 rounded-full bg-white md:block" />}
                </span>

                <Reveal delay={i * 0.05}>
                  <article
                    className={
                      "rounded-2xl border bg-card p-6 shadow-xs transition-shadow hover:shadow-md md:p-7 " +
                      (job.current ? "border-primary/40 ring-1 ring-primary/15" : "")
                    }
                  >
                    <div className="flex flex-wrap items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-base font-bold text-primary">
                        {initials(job.org)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold md:text-xl">
                            {job.url ? (
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 underline-offset-4 hover:text-primary hover:underline"
                              >
                                {job.org}
                                <ArrowUpRight className="size-4 shrink-0 text-primary" />
                                <span className="sr-only">(opens company website)</span>
                              </a>
                            ) : (
                              job.org
                            )}
                          </h3>
                          {job.current && (
                            <span className="rounded-full bg-success/12 px-2.5 py-0.5 text-xs font-semibold text-success">
                              Current
                            </span>
                          )}
                        </div>
                        {job.formerly && (
                          <p className="text-sm text-muted-foreground">Formerly {job.formerly}</p>
                        )}
                        {job.role && <p className="mt-0.5 font-medium text-primary">{job.role}</p>}
                        {(when || job.place) && (
                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                            {when && (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-4" />
                                {when}
                              </span>
                            )}
                            {job.place && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="size-4" />
                                {job.place}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {points.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t pt-5 text-muted-foreground">
                        {points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>

        {education.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h3 className="mb-6 flex items-center gap-3 text-xl font-bold md:text-2xl">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary">
                  <GraduationCap className="size-5" />
                </span>
                Education
              </h3>
            </Reveal>
            <div className="space-y-4">
              {education.map((ed) => (
                <Reveal key={ed.degree + ed.school}>
                  <article className="flex flex-wrap items-start gap-4 rounded-2xl border bg-card p-6 shadow-xs md:p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <GraduationCap className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-bold md:text-xl">{ed.degree}</h4>
                      {ed.fullDegree && <p className="text-sm text-muted-foreground">{ed.fullDegree}</p>}
                      <p className="mt-1 font-medium text-primary">
                        {ed.url ? (
                          <a
                            href={ed.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                          >
                            {ed.school}
                            <ArrowUpRight className="size-4 shrink-0" />
                          </a>
                        ) : (
                          ed.school
                        )}
                      </p>
                      {(ed.period || ed.place) && (
                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                          {ed.period && (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="size-4" />
                              {ed.period}
                            </span>
                          )}
                          {ed.place && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-4" />
                              {ed.place}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
