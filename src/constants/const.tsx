import { Home, Settings, Users, Globe, Bell, School } from "lucide-react";
import { constRoutes } from "./routes/routes";
import { constrainedMemory } from "process";


export const sidebarLinks = [
  {
    label: "Dashboard",
    href: constRoutes.dashboard,
    icon: Home,
  },
  {
    label: "Admin",
    href: constRoutes.admin,
    icon: Users,
  },
  {
    label: "User",
    href: "/pages/user",
    icon: Users,
  },
  {
    label: "Countries",
    href: "/pages/country",
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