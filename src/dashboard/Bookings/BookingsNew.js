import React from "react";
import { useParams } from "react-router-dom";

// Custom Imports
import DashboardLayout from "../../layouts/DashboardLayout";

function BookingNew() {
  // Stateful Hooks
  const { member: memberID } = useParams();

  // Effects and Events
  return <DashboardLayout>Hello {memberID}</DashboardLayout>;
}

export default BookingNew;
