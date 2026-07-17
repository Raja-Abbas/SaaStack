import { Layers } from "lucide-react"

import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean
}

function Logo({ className, dark = false, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 shadow-inner">
        <Layers className="h-4 w-4 text-[#3b82f6]" />
      </div>
      <span className={cn("text-lg font-bold tracking-tight", dark ? "text-slate-900" : "text-white")}>
        SaaStack
      </span>
    </div>
  )
}

export { Logo }
