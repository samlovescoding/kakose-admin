import React from "react";

const TodayBookings = React.lazy(() =>
  import("./dashboard/TodayBookings")
);
const Inventory = React.lazy(() =>
  import("./dashboard/Inventory")
);
const BookingsHistory = React.lazy(() =>
  import("./dashboard/BookingsHistory")
);
const Members = React.lazy(() =>
  import("./dashboard/Members")
);
const MembersEdit = React.lazy(() =>
  import("./dashboard/MembersEdit")
);
const NewMember = React.lazy(() =>
  import("./dashboard/NewMember")
);
const Products = React.lazy(() =>
  import("./dashboard/Products")
);
const NewProduct = React.lazy(() =>
  import("./dashboard/NewProduct")
);
const TodayOrders = React.lazy(() =>
  import("./dashboard/TodayOrders")
);
const OrderHistory = React.lazy(() =>
  import("./dashboard/OrderHistory")
);
const ClubSettings = React.lazy(() =>
  import("./dashboard/ClubSettings")
);
const ProfileSettings = React.lazy(() =>
  import("./dashboard/ProfileSettings")
);
const ClubAdmins = React.lazy(() =>
  import("./dashboard/ClubAdmins")
);
const ClubUsersNew = React.lazy(() =>
  import("./dashboard/ClubUsersNew")
);
const Clubs = React.lazy(() => import("./dashboard/Clubs"));
const NewClub = React.lazy(() =>
  import("./dashboard/NewClub")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/bookings/today",
    exact: true,
    name: "Today Bookings",
    component: TodayBookings,
  },
  {
    path: "/bookings",
    exact: true,
    name: "Bookings History",
    component: BookingsHistory,
  },
  // Members
  {
    path: "/members",
    exact: true,
    name: "Members",
    component: Members,
  },
  {
    path: "/members/:id/edit",
    exact: true,
    name: "Members Edit",
    component: MembersEdit,
  },
  {
    path: "/members/create",
    exact: true,
    name: "New Member",
    component: NewMember,
  },
  // Pro Shop
  {
    path: "/products",
    exact: true,
    name: "Products",
    component: Products,
  },
  {
    path: "/products/create",
    exact: true,
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/orders/today",
    exact: true,
    name: "Today Orders",
    component: TodayOrders,
  },
  {
    path: "/inventory",
    exact: true,
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/orders",
    exact: true,
    name: "Order History",
    component: OrderHistory,
  },
  // Settings
  {
    path: "/settings/club",
    exact: true,
    name: "Club Settings",
    component: ClubSettings,
  },
  {
    path: "/settings/profile",
    exact: true,
    name: "Profile Settings",
    component: ProfileSettings,
  },
  {
    path: "/users",
    exact: true,
    name: "Club Admins",
    component: ClubAdmins,
  },
  // Admin
  {
    path: "/clubs",
    exact: true,
    name: "Clubs",
    component: Clubs,
  },
  {
    path: "/clubs/create",
    exact: true,
    name: "New Club",
    component: NewClub,
  },
  {
    path: "/clubs/:id/user-create",
    exact: true,
    component: ClubUsersNew,
  },
];

export default routes;
