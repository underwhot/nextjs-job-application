// import { AreaChart, Layers, AppWindow } from "lucide-react";

// type NavLink = {
//   href: string;
//   label: string;
//   icon: any;
// };

// const links: NavLink[] = [
//   {
//     href: "/add-job",
//     label: "add job",
//     icon: <Layers />,
//   },
//   {
//     href: "/jobs",
//     label: "all jobs",
//     icon: <AppWindow />,
//   },
//   {
//     href: "/stats",
//     label: "stats",
//     icon: <AreaChart />,
//   },
// ];

// export default links;


import { AreaChart, Layers, AppWindow } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: Layers,
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: AppWindow,
  },
  {
    href: "/stats",
    label: "stats",
    icon: AreaChart,
  },
];

export default links;