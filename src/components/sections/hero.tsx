import { motion, useReducedMotion } from "motion/react"
import { ArrowDown, Briefcase, Download, Mail, MapPin } from "lucide-react"

import { profile } from "@/data/portfolio"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { TechIcon } from "@/components/tech-icon"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const EASE = [0.22, 1, 0.36, 1] as const

/* Two rows of logos under the hero: the first scrolls left, the second right */
const STRIP_ROWS = [
  ["ASP.NET Core", "ASP.NET MVC", "C#", "Node.js", "Nest.js", "React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  ["Tailwind CSS", "Bootstrap", "shadcn/ui", "SQL Server", "PostgreSQL", "MongoDB", "Azure", "Docker", "Git", "GitHub", "GitLab"],
]

export function Hero() {
  const reduce = useReducedMotion()

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        }

  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: <GitHubIcon className="size-[18px]" /> },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: <LinkedInIcon className="size-[18px]" /> },
    { label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="size-[18px]" /> },
  ]

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Background: faint grid and a soft blue glow */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[38rem] rounded-full bg-primary/15 blur-3xl dark:bg-primary/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[-15%] -z-10 size-[28rem] rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-32 pb-16 md:px-8 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-24">
        {/* Intro */}
        <div>
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span>
              Currently at{" "}
              {profile.currentlyUrl ? (
                <a
                  href={profile.currentlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {profile.currently}
                </a>
              ) : (
                profile.currently
              )}
            </span>
          </motion.p>

          <motion.p {...rise(0.12)} className="mt-6 text-lg font-semibold text-primary sm:text-xl">
            Hi, I'm
          </motion.p>
          <motion.h1
            id="hero-title"
            {...rise(0.18)}
            className="mt-1 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            {profile.fullName}
          </motion.h1>

          <motion.p {...rise(0.25)} className="mt-4 text-xl font-semibold text-foreground/85 sm:text-2xl">
            {profile.role}
          </motion.p>

          <motion.p {...rise(0.32)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View my work
                <ArrowDown />
              </a>
            </Button>
            {profile.resumeUrl ? (
              <Button asChild size="lg" variant="outline" className="bg-background/80">
                <a href={profile.resumeUrl} download>
                  <Download />
                  Download CV
                </a>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="bg-background/80">
                <a href="#contact">Contact me</a>
              </Button>
            )}
          </motion.div>

          <motion.div {...rise(0.48)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Tooltip key={s.label}>
                  <TooltipTrigger asChild>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                    >
                      {s.icon}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{s.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Photo with floating stack cards */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:max-w-[24rem]"
        >
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-primary/30" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-blue-600 to-indigo-700 shadow-2xl shadow-primary/25">
            {profile.photo ? (
              <img src={profile.photo} alt={`Portrait of ${profile.fullName}`} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span aria-hidden="true" className="text-[6rem] font-extrabold tracking-tight text-white/90 sm:text-[8rem]">
                  {profile.initials}
                </span>
                <span className="sr-only">Add your photo in src/data/portfolio.ts</span>
              </div>
            )}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          </div>

          <FloatingCard className="-left-3 top-8 sm:-left-12 sm:top-10" delay={0}>
            <TechIcon name="ASP.NET Core" className="size-8" />
            <div>
              <p className="text-sm font-semibold">ASP.NET Core</p>
              <p className="text-xs text-muted-foreground">C# and microservices</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-right-3 top-[62%] sm:-right-10" delay={1.2}>
            <TechIcon name="Nest.js" className="size-8" />
            <div>
              <p className="text-sm font-semibold">Node.js &amp; Nest.js</p>
              <p className="text-xs text-muted-foreground">APIs and microservices</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-bottom-6 -left-3 sm:-left-8" delay={2.4}>
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-primary">
              <Briefcase className="size-[18px]" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Currently at</p>
              <p className="text-sm font-semibold">{profile.currently}</p>
            </div>
          </FloatingCard>
        </motion.div>
      </div>

      {/* Technology strips: hover to pause */}
      <div className="border-y bg-surface/80 py-6 backdrop-blur">
        <p className="mb-4 text-center text-sm font-medium text-muted-foreground">Technologies I work with</p>
        <div className="mx-auto max-w-6xl space-y-3 px-5 md:px-8">
          {STRIP_ROWS.map((row, r) => (
            <LogoRow key={r} items={row} reverse={r % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** One endless row of logos. The list is repeated 4 times and moved by half its width,
    so the loop is seamless on any screen size. */
function LogoRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee overflow-hidden">
      <ul
        className={
          (reverse ? "marquee-track-reverse" : "marquee-track") +
          " flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3"
        }
      >
        {repeated.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="mr-4 flex shrink-0 items-center gap-2.5 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-xs motion-reduce:aria-hidden:hidden"
          >
            <TechIcon name={name} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={"absolute flex items-center gap-3 rounded-xl border bg-card/95 px-3.5 py-2.5 shadow-lg backdrop-blur " + (className ?? "")}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}
