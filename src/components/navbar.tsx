"use client";

import links from "@/lib/links";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const activePathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href} className="relative">
            <Link
              href={link.href}
              className={cn(
                "flex text-lg gap-2 items-center capitalize px-3 py-2 transition duration-500 relative z-10",
                {
                  "text-secondary": activePathname === link.href,
                }
              )}
            >
              <link.icon />
              {link.label}
            </Link>

            {activePathname === link.href && (
              <motion.div
                layoutId="active-link"
                className="w-full h-full bg-primary rounded-md absolute top-0 left-0"
              ></motion.div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
