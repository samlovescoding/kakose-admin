export default [
  {
    _tag: "CSidebarNavItem",
    name: "Today Bookings",
    to: "/bookings/today",
    icon: "cil-golf",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Booking History",
    to: "/bookings",
    icon: "cil-book",
  },
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
    _tag: "CSidebarNavTitle",
    _children: ["Pro Shop"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Products",
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
    name: "Today Orders",
    to: "/orders/today",
    icon: "cil-cart",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inventory",
    to: "/inventory",
    icon: "cil-inbox",
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
  {
    _tag: "CSidebarNavItem",
    name: "Club Admins",
    to: "/users",
    icon: "cil-people",
  },
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
