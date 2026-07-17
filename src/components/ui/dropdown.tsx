"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

interface DropdownContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(
  undefined
)

function useDropdown() {
  const ctx = React.useContext(DropdownContext)
  if (!ctx) throw new Error("Dropdown components must be used within <Dropdown>")
  return ctx
}

interface DropdownProps {
  children: React.ReactNode
}

function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdown()
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      },
      [ref, triggerRef]
    )

    return (
      <button
        ref={setRefs}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownTrigger.displayName = "DropdownTrigger"

interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

function DropdownContent({
  className,
  children,
  align = "start",
  sideOffset = 4,
  ...props
}: DropdownContentProps) {
  const { open, triggerRef } = useDropdown()
  const [position, setPosition] = React.useState({ top: 0, left: 0 })

  React.useLayoutEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const alignOffset =
        align === "end"
          ? rect.width
          : align === "center"
            ? rect.width / 2
            : 0
      setPosition({
        top: rect.bottom + sideOffset + window.scrollY,
        left: rect.left - alignOffset + window.scrollX,
      })
    }
  }, [open, align, sideOffset, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-700 bg-[#0f172a] p-1 text-slate-200 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
      style={{ position: "absolute", top: position.top, left: position.left }}
      {...props}
    >
      {children}
    </div>,
    document.body
  )
}
DropdownContent.displayName = "DropdownContent"

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean
}

function DropdownItem({
  className,
  children,
  inset,
  ...props
}: DropdownItemProps) {
  const { setOpen } = useDropdown()

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white disabled:pointer-events-none disabled:opacity-50",
        inset && "pl-8",
        className
      )}
      onClick={(e) => {
        props.onClick?.(e)
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
DropdownItem.displayName = "DropdownItem"

function DropdownSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-slate-700", className)}
      {...props}
    />
  )
}
DropdownSeparator.displayName = "DropdownSeparator"

function DropdownLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-semibold text-slate-400", className)}
      {...props}
    />
  )
}
DropdownLabel.displayName = "DropdownLabel"

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
}
