import React from "react";

// Bookings
import BookingsNew from "./dashboard/Bookings/BookingsNew";

// Clubs
import Clubs from "./dashboard/Clubs/Clubs";
import ClubsNew from "./dashboard/Clubs/ClubsNew";

// Members
import Members from "./dashboard/Members/Members";
import MembersEdit from "./dashboard/Members/MembersEdit";
import MembersNew from "./dashboard/Members/MembersNew";
import MembersImport from "./dashboard/Members/MemberImport";

// Orders
import Orders from "./dashboard/Orders/Orders";
import OrdersToday from "./dashboard/Orders/OrdersToday";

// Settings
import SettingsClub from "./dashboard/Settings/SettingsClub";
import SettingsProfile from "./dashboard/Settings/SettingsProfile";

// Member Types
import MemberTypes from "./dashboard/MemberTypes/MemberTypes";
import MemberTypesNew from "./dashboard/MemberTypes/MemberTypesNew";

// Tee Templates
import TeeTemplates from "./dashboard/TeeTemplates/TeeTemplates";
import TeeTemplatesCreate from "./dashboard/TeeTemplates/TeeTemplatesCreate";

// Tee Sheets
import Sheets from "./dashboard/Sheets/Sheets";

// Shop
import Products from "./dashboard/Shop/Products";
import ProductsNew from "./dashboard/Shop/ProductsNew";
import ProductsEdit from "./dashboard/Shop/ProductsEdit";

// Users
import Users from "./dashboard/Users/Users";
import UsersNew from "./dashboard/Users/UsersNew";
import UsersNewAdmin from "./dashboard/Users/UsersNewAdmin";

const routes = [
  { path: "/", exact: true, name: "Home" },

  // Tee Sheets
  {
    path: "/dashboard",
    exact: true,
    name: "Tee Sheets",
    component: Sheets,
  },
  {
    path: "/sheets",
    exact: true,
    name: "Tee Sheets",
    component: Sheets,
  },
  {
    path: "/sheets/:stamp",
    exact: true,
    name: "Tee Sheets",
    component: Sheets,
  },

  // Tee Templates
  {
    path: "/templates",
    exact: true,
    name: "Tee Templates",
    component: TeeTemplates,
  },
  {
    path: "/templates/create",
    exact: true,
    name: "New Tee Template",
    component: TeeTemplatesCreate,
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
    component: MembersNew,
  },
  {
    path: "/members/import",
    exact: true,
    name: "Import Member",
    component: MembersImport,
  },
  {
    path: "/members/:member/book",
    exact: true,
    name: "New Booking",
    component: BookingsNew,
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
    component: ProductsNew,
  },
  {
    path: "/products/:id/edit",
    exact: true,
    name: "Product Edit",
    component: ProductsEdit,
  },
  {
    path: "/orders/today",
    exact: true,
    name: "Today Orders",
    component: OrdersToday,
  },
  {
    path: "/orders",
    exact: true,
    name: "Order History",
    component: Orders,
  },
  // Settings
  {
    path: "/settings/club",
    exact: true,
    name: "Club Settings",
    component: SettingsClub,
  },
  {
    path: "/settings/profile",
    exact: true,
    name: "Profile Settings",
    component: SettingsProfile,
  },
  // Member Types
  {
    path: "/member-types",
    exact: true,
    name: "Member Types",
    component: MemberTypes,
  },
  {
    path: "/member-types/create",
    exact: true,
    name: "New Member Type",
    component: MemberTypesNew,
  },
  // Users
  {
    path: "/users",
    exact: true,
    name: "Club Users",
    component: Users,
  },
  {
    path: "/users/create",
    exact: true,
    name: "Club User Create",
    component: UsersNew,
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
    component: ClubsNew,
  },
  {
    path: "/clubs/:id/user-create",
    exact: true,
    component: UsersNewAdmin,
  },
];
export default routes;
