import { Home, Settings, Users, Globe, Bell, School } from "lucide-react";


export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Admin",
    href: "/pages/admin",
    icon: Users,
  },
  {
    label: "User",
    href: "/pages/user",
    icon: Users,
  },
  {
    label: "Countries",
    href: "/pages/countries",
    icon: Globe,
  },
  {
    label: "School & University",
    href: "/pages/schools",
    icon: School,
  },
  {
    label: "Notification",
    href: "/pages/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/pages/settings",
    icon: Settings,
  },
];