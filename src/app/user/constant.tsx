import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconCertificate,
  IconClipboardCheck,
  IconUser,
  IconBuilding,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Manage Your Organisation",
    path: "/user/manage-organisation",
    icon: <IconBuilding width="24" height="24" />,
  },
  {
    title: "Issue Certificate",
    path: "/user/issue-certificate",
    icon: <IconCertificate width="24" height="24" />,
  },
  {
    title: "Manage Certificates",
    path: "/user/manage-certificates",
    icon: <IconClipboardCheck width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <IconUser width="24" height="24" />,
  },
];
