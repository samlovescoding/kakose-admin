import React from "react";

const TodayBookings = React.lazy(() => import("./dashboard/TodayBookings"));
const BookingsHistory = React.lazy(() => import("./dashboard/BookingsHistory"));
const Members = React.lazy(() => import("./dashboard/Members"));
const NewMember = React.lazy(() => import("./dashboard/NewMember"));
const Products = React.lazy(() => import("./dashboard/Products"));
const NewProduct = React.lazy(() => import("./dashboard/NewProduct"));
const TodayOrders = React.lazy(() => import("./dashboard/TodayOrders"));
const OrderHistory = React.lazy(() => import("./dashboard/OrderHistory"));
const ClubSettings = React.lazy(() => import("./dashboard/ClubSettings"));
const ProfileSettings = React.lazy(() => import("./dashboard/ProfileSettings"));
const ClubAdmins = React.lazy(() => import("./dashboard/ClubAdmins"));
const Clubs = React.lazy(() => import("./dashboard/Clubs"));
const NewClub = React.lazy(() => import("./dashboard/NewClub"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/bookings/today",
    name: "Today Bookings",
    component: TodayBookings,
  },
  {
    path: "/bookings",
    name: "Bookings History",
    component: BookingsHistory,
  },
  // Members
  {
    path: "/members",
    name: "Members",
    component: Members,
  },
  {
    path: "/members/create",
    name: "New Member",
    component: NewMember,
  },
  // Pro Shop
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/create",
    name: "New Product",
    component: NewProduct,
  },
  {
    path: "/orders/today",
    name: "Today Orders",
    component: TodayOrders,
  },
  {
    path: "/orders",
    name: "Order History",
    component: OrderHistory,
  },
  // Settings
  {
    path: "/settings/club",
    name: "Club Settings",
    component: ClubSettings,
  },
  {
    path: "/settings/profile",
    name: "Profile Settings",
    component: ProfileSettings,
  },
  {
    path: "/users",
    name: "Club Admins",
    component: ClubAdmins,
  },
  // Admin
  {
    path: "/clubs",
    name: "Clubs",
    component: Clubs,
  },
  {
    path: "/club/create",
    name: "New Club",
    component: NewClub,
  },
];

export default routes;
