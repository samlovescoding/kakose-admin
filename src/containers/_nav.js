import useUser from "../hooks/useUser";

const { user } = useUser();

const clubSidebar = [
  {
    _tag: "CSidebarNavItem",
    name: "Tee Times",
    to: "/bookings",
    icon: "cil-golf",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Booking History",
  //   to: "/bookings",
  //   icon: "cil-book",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Members"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Members",
    to: "/members",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Member",
    to: "/members/create",
    icon: "cil-user-plus",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Member Types",
    to: "/member-types",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Member Type",
    to: "/member-types/create",
    icon: "cil-user-plus",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Pro Shop"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inventory",
    to: "/products",
    icon: "cil-bank",
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Product",
    to: "/products/create",
    icon: "cil-basket",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Order History",
    to: "/orders",
    icon: "cil-chart",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Settings"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Club Settings",
    to: "/settings/club",
    icon: "cil-applications-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile Settings",
    to: "/settings/profile",
    icon: "cil-cog",
  },
];

const clubAdminSidebar = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Admin Panel"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "New User",
    to: "/users/create",
    icon: "cil-user-plus",
  },
];

const adminSidebar = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Admin"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Clubs",
    to: "/clubs",
    icon: "cil-mood-very-good",
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Club",
    to: "/clubs/create",
    icon: "cil-plus",
  },
];

let sidebar = clubSidebar;

if (user) {
  if (user.role === "admin") {
    sidebar = adminSidebar;
  }
  if (user.role === "club_admin") {
    sidebar = [...clubSidebar, ...clubAdminSidebar];
  }
} else {
  window.location = "/";
}

export default sidebar;
