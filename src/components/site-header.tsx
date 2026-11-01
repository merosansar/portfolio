import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Download, Menu } from "lucide-react"

import { nav, profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const sectionIds = nav.map((item) => item.id)

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const id of [...ids, "top"]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}

export function SiteHeader() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b bg-background/85 shadow-sm backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-md" aria-label={`${profile.name}, back to top`}>
          <LogoMark letter={profile.initials} />
          <span className="text-lg font-bold tracking-tight">{profile.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {profile.resumeUrl && (
            <Button asChild size="sm" className="hidden h-9 px-4 lg:inline-flex">
              <a href={profile.resumeUrl} download>
                <Download />
                Download CV
              </a>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82%] max-w-xs">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="flex items-center gap-2.5 text-lg font-bold">
                  <LogoMark letter={profile.initials} />
                  {profile.name}
                </SheetTitle>
                <SheetDescription>{profile.role}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-3">
                {nav.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent",
                        active === item.id && "bg-brand-soft text-primary"
                      )}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              {profile.resumeUrl && (
                <div className="mt-auto p-6">
                  <Button asChild className="w-full" size="lg">
                    <a href={profile.resumeUrl} download>
                      <Download />
                      Download CV
                    </a>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
