"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const caminho = usePathname();
  const ativo = caminho === href;

  return (
    <Link
      href={href}
      className={ativo ? "menu-link ativo" : "menu-link"}
      aria-current={ativo ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
