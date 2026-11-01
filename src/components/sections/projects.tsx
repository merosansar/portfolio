import { ArrowUpRight, ExternalLink } from "lucide-react"

import { projects, type Project } from "@/data/portfolio"
import { GitHubIcon } from "@/components/icons"
import { Reveal, SectionHeading } from "@/components/reveal"
import { TechIcon } from "@/components/tech-icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/* Cover colours, used in turn for each project */
const COVERS = [
  "from-blue-600 to-indigo-700",
  "from-sky-500 to-blue-700",
  "from-indigo-600 to-violet-700",
  "from-slate-700 to-slate-900",
]

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="projects-title"
          title="Featured projects"
          subtitle="A selection of applications I've built. Open a project to see the problem, my approach and the result."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} cover={COVERS[i % COVERS.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** A stylised browser window showing the project name and its main logos */
function Cover({ project, cover, className }: { project: Project; cover: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${cover} ${className ?? ""}`}>
      <div aria-hidden="true" className="absolute -right-10 -bottom-16 size-56 rounded-full bg-white/10" />
      <div aria-hidden="true" className="absolute -top-12 -left-10 size-40 rounded-full bg-white/5" />
      <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-xl border border-white/20 bg-white/95 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1.5 dark:bg-[#111a2e]/95">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-2.5 dark:border-white/10">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 h-4 flex-1 rounded bg-black/5 dark:bg-white/10" />
        </div>
        <div className="p-5">
          <p className="text-2xl font-extrabold tracking-tight text-[#0f1b33] dark:text-white">{project.title}</p>
          <div className="mt-2 space-y-1.5">
            <span className="block h-2 w-3/4 rounded bg-black/8 dark:bg-white/10" />
            <span className="block h-2 w-1/2 rounded bg-black/8 dark:bg-white/10" />
          </div>
          <div className="mt-4 flex gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="grid size-9 place-items-center rounded-lg border border-black/5 bg-white shadow-xs dark:border-white/10 dark:bg-white/5">
                <TechIcon name={tech} className="size-5" />
              </span>
            ))}
          </div>
          <div aria-hidden="true" className="mt-5 grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((n) => (
              <span key={n} className="block h-16 rounded-lg border border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, cover }: { project: Project; cover: string }) {
  return (
    <Dialog>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        <DialogTrigger asChild>
          <button type="button" className="block text-left" aria-label={`Open ${project.title} details`}>
            <Cover project={project} cover={cover} className="aspect-[16/10]" />
          </button>
        </DialogTrigger>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>{project.role}</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium tabular-nums">{project.year}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
          <p className="mt-2 text-muted-foreground">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-md bg-brand-soft px-2.5 py-1 text-xs font-semibold text-primary">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 pt-6">
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="h-9">
                View details
                <ArrowUpRight />
              </Button>
            </DialogTrigger>
            {project.links.live && (
              <Button asChild variant="outline" size="sm" className="h-9">
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Live
                </a>
              </Button>
            )}
            {project.links.source && (
              <Button asChild variant="ghost" size="icon" aria-label={`${project.title} source code`}>
                <a href={project.links.source} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-[18px]" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>

      <CaseStudy project={project} cover={cover} />
    </Dialog>
  )
}

function CaseStudy({ project, cover }: { project: Project; cover: string }) {
  const { caseStudy, links } = project
  return (
    <DialogContent
      className="flex max-h-[92svh] flex-col gap-0 overflow-y-auto p-0 focus:outline-none sm:max-w-2xl [&>button:last-child]:rounded-full [&>button:last-child]:bg-background/90 [&>button:last-child]:p-1.5 [&>button:last-child]:opacity-100"
      onOpenAutoFocus={(event) => {
        event.preventDefault()
        ;(event.currentTarget as HTMLElement | null)?.focus()
      }}
    >
      <Cover project={project} cover={cover} className="aspect-[16/7] w-full shrink-0" />
      <div className="p-6 md:p-8">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{project.role}</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium tabular-nums">{project.year}</span>
          </div>
          <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-base">{project.summary}</DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6 border-t pt-6">
          <div>
            <h4 className="font-bold">The problem</h4>
            <p className="mt-2 text-muted-foreground">{caseStudy.problem}</p>
          </div>
          <div>
            <h4 className="font-bold">What I did</h4>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              {caseStudy.approach.map((step) => (
                <li key={step} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/20 bg-brand-soft p-4">
            <h4 className="font-bold text-primary">The result</h4>
            <p className="mt-1.5">{caseStudy.outcome}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="flex items-center gap-2 rounded-lg border bg-surface px-3 py-1.5 text-sm font-medium">
                <TechIcon name={tech} className="size-4" />
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {(links.live || links.source) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.live && (
              <Button asChild>
                <a href={links.live} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Visit the live site
                </a>
              </Button>
            )}
            {links.source && (
              <Button asChild variant="outline">
                <a href={links.source} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-4" />
                  View the source code
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </DialogContent>
  )
}
