import { Network } from "lucide-react"

import { cn } from "@/lib/utils"
import azure from "@/assets/tech/azure.svg"
import bootstrap from "@/assets/tech/bootstrap.svg"
import csharp from "@/assets/tech/csharp.svg"
import css3 from "@/assets/tech/css3.svg"
import docker from "@/assets/tech/docker.svg"
import dotnet from "@/assets/tech/dotnet.svg"
import dotnetcore from "@/assets/tech/dotnetcore.svg"
import git from "@/assets/tech/git.svg"
import github from "@/assets/tech/github.svg"
import gitlab from "@/assets/tech/gitlab.svg"
import html5 from "@/assets/tech/html5.svg"
import javascript from "@/assets/tech/javascript.svg"
import mongodb from "@/assets/tech/mongodb.svg"
import mssql from "@/assets/tech/microsoftsqlserver.svg"
import nestjs from "@/assets/tech/nestjs.svg"
import nextjs from "@/assets/tech/nextjs.svg"
import nodejs from "@/assets/tech/nodejs.svg"
import postgresql from "@/assets/tech/postgresql.svg"
import react from "@/assets/tech/react.svg"
import shadcn from "@/assets/tech/shadcn.svg"
import tailwindcss from "@/assets/tech/tailwindcss.svg"
import typescript from "@/assets/tech/typescript.svg"

/* Logos from Devicon (MIT). Black logos are flipped to white in dark mode. */
const ICONS: Record<string, { src: string; dark?: boolean }> = {
  HTML: { src: html5 },
  CSS: { src: css3 },
  JavaScript: { src: javascript },
  TypeScript: { src: typescript },
  "React.js": { src: react },
  "Next.js": { src: nextjs, dark: true },
  "Tailwind CSS": { src: tailwindcss },
  Bootstrap: { src: bootstrap },
  "shadcn/ui": { src: shadcn, dark: true },
  "ASP.NET Core": { src: dotnetcore },
  "ASP.NET Core microservices": { src: dotnetcore },
  "ASP.NET MVC": { src: dotnet },
  ".NET": { src: dotnet },
  "C#": { src: csharp },
  "Node.js": { src: nodejs },
  "Nest.js": { src: nestjs },
  "Nest.js microservices": { src: nestjs },
  "SQL Server": { src: mssql },
  PostgreSQL: { src: postgresql },
  MongoDB: { src: mongodb },
  Azure: { src: azure },
  Docker: { src: docker },
  Git: { src: git },
  GitHub: { src: github, dark: true },
  "GitHub Actions": { src: github, dark: true },
  GitLab: { src: gitlab },
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name]
  if (!icon) {
    return <Network aria-hidden="true" className={cn("size-5 text-primary", className)} />
  }
  return (
    <img
      src={icon.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn("size-5 object-contain", icon.dark && "dark:invert", className)}
    />
  )
}
