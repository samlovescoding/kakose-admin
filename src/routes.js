import React from "react";

// Bookings
const BookingsNew = React.lazy(() =>
  import("./dashboard/Bookings/BookingsNew")
);

// Clubs
const Clubs = React.lazy(() => import("./dashboard/Clubs/Clubs"));
const ClubsNew = React.lazy(() => import("./dashboard/Clubs/ClubsNew"));

// Members
const Members = React.lazy(() => import("./dashboard/Members/Members"));
const MembersEdit = React.lazy(() => import("./dashboard/Members/MembersEdit"));
const MembersNew = React.lazy(() => import("./dashboard/Members/MembersNew"));
const MembersImport = React.lazy(() =>
  import("./dashboard/Members/MemberImport")
);

// Orders
const Orders = React.lazy(() => import("./dashboard/Orders/Orders"));
const OrdersToday = React.lazy(() => import("./dashboard/Orders/OrdersToday"));

// Settings
const SettingsClub = React.lazy(() =>
  import("./dashboard/Settings/SettingsClub")
);
const SettingsProfile = React.lazy(() =>
  import("./dashboard/Settings/SettingsProfile")
);

// Member Types
const MemberTypes = React.lazy(() =>
  import("./dashboard/MemberTypes/MemberTypes")
);
const MemberTypesNew = React.lazy(() =>
  import("./dashboard/MemberTypes/MemberTypesNew")
);

// Tee Templates
const TeeTemplates = React.lazy(() =>
  import("./dashboard/TeeTemplates/TeeTemplates")
);
const TeeTemplatesCreate = React.lazy(() =>
  import("./dashboard/TeeTemplates/TeeTemplatesCreate")
);

// Tee Sheets
const Sheets = React.lazy(() => import("./dashboard/Sheets/Sheets"));

// Shop
const Products = React.lazy(() => import("./dashboard/Shop/Products"));
const ProductsNew = React.lazy(() => import("./dashboard/Shop/ProductsNew"));
const ProductsEdit = React.lazy(() => import("./dashboard/Shop/ProductsEdit"));

// Users
const Users = React.lazy(() => import("./dashboard/Users/Users"));
const UsersNew = React.lazy(() => import("./dashboard/Users/UsersNew"));
const UsersNewAdmin = React.lazy(() =>
  import("./dashboard/Users/UsersNewAdmin")
);

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
