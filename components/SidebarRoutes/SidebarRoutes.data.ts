import {
  BarChart4,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Building2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PanelsTopLeft, //otro icono d dashboard
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  BarChart,
  LayoutDashboard,
} from "lucide-react";

export const dataGeneralSideBar = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Companies", icon: BarChart, href: "/companies" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
];

export const dataToolSideBar = [
  { label: "Faqs", icon: CircleHelpIcon, href: "/faqs" },
  { label: "Analytics", icon: BarChart4, href: "/analytics" },
];

export const dataSupportSideBar = [
  { label: "Settings", icon: Settings, href: "/setting" },
  { label: "Security", icon: ShieldCheck, href: "/analytics" },
];
