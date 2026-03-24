"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType | null>(null);

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = React.useCallback((open: boolean) => setOpen(open), []);

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetTrigger must be used within Sheet");

  return (
    <button
      className={className}
      onClick={() => context.onOpenChange(true)}
      type="button"
    >
      {children}
    </button>
  );
}

export function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") context.onOpenChange(false);
    };

    if (context.open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [context.open, context.onOpenChange]);

  if (!context.open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs transition-opacity"
        onClick={() => context.onOpenChange(false)}
      />
      {/* Content */}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition-transform",
          side === "right" && "right-0 top-0 h-full w-3/4 max-w-sm border-l",
          side === "left" && "left-0 top-0 h-full w-3/4 max-w-sm border-r",
          side === "top" && "left-0 top-0 w-full border-b",
          side === "bottom" && "left-0 bottom-0 w-full border-t",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            onClick={() => context.onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
            type="button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </>
  );
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error("SheetClose must be used within Sheet");

  return (
    <button onClick={() => context.onOpenChange(false)} type="button">
      {children}
    </button>
  );
}

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  );
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
