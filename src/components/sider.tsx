import { sidebarLinks } from "@/constants/const";
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="space-y-2 border-r border-gray-200">
      {sidebarLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center pr-15 px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
        >
          <Icon size={20} className="mr-2" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
