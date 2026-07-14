import Link from "next/link";

interface SiteNavbarLinksProps {
  items: Array<{ title: string; href: string }>;
}

export function SiteNavbarLinks({ items }: SiteNavbarLinksProps) {
  return (
    <nav className="hidden items-center gap-4 text-xs font-medium md:gap-6 md:flex md:text-sm">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="transition hover:text-primary">
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
