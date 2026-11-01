import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Mail, MapPin, Send } from "lucide-react"
import { toast } from "sonner"

import { profile } from "@/data/portfolio"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { Reveal, SectionHeading } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Errors = Partial<Record<"name" | "email" | "message", string>>

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      toast.success("Email address copied")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Couldn't copy. Select the address and copy it instead.")
    }
  }

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const next: Errors = {}
    if (!name) next.name = "Enter your name."
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an email address like name@example.com."
    if (message.length < 10) next.message = "Write a little more so I know how to help."
    setErrors(next)
    if (Object.keys(next).length) return

    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    toast.success("Opening your email app", {
      description: "Your message is filled in. Press send there to deliver it.",
    })
    form.reset()
  }

  const channels = [
    {
      icon: <Mail className="size-5" />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      action: (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={copyEmail}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="shrink-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
            </motion.span>
          </AnimatePresence>
        </Button>
      ),
    },
    {
      icon: <LinkedInIcon className="size-5" />,
      label: "LinkedIn",
      value: "Connect with me",
      href: profile.socials.linkedin,
    },
    {
      icon: <GitHubIcon className="size-5" />,
      label: "GitHub",
      value: profile.socials.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href: profile.socials.github,
    },
    {
      icon: <MapPin className="size-5" />,
      label: "Location",
      value: profile.location,
    },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="contact-title"
          title="Get in touch"
          subtitle="Have a role, a project or a question? Send me a message and I'll get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary">
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                    <p className="truncate font-semibold">{c.value}</p>
                  </div>
                </>
              )
              return (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-xs transition-colors hover:border-primary/40"
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-4 rounded-lg"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex min-w-0 flex-1 items-center gap-4">{inner}</div>
                  )}
                  {c.action}
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form noValidate onSubmit={sendMessage} className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-bold">Send a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">I usually reply within two working days.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name" error={errors.name}>
                  <Input id="name" name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} />
                </Field>
                <Field id="email" label="Your email" error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Field id="message" label="Message" error={errors.message} className="sm:col-span-2">
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about the role or project"
                    aria-invalid={!!errors.message}
                  />
                </Field>
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                <Send />
                Send message
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={"grid gap-2 " + (className ?? "")}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
