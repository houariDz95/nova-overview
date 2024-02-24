"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: 'Overview',
      active: pathname === `/`,
    },
    {
      href: `/products`,
      label: 'products',
      active: pathname === `/product`,
    },
    {
      href: `/flexy`,
      label: 'flexy',
      active: pathname === `/flexy`,
    },
    {
      href: `/people`,
      label: 'people',
      active: pathname === `/people`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};