import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** Fades content up into place the first time it scrolls into view */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Centred section title with a short line underneath */
export function SectionHeading({
  id,
  title,
  subtitle,
  className,
}: {
  id: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <Reveal className={cn("mx-auto mb-12 max-w-2xl text-center md:mb-16", className)}>
      <h2 id={id} className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-primary" />
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </Reveal>
  )
}
