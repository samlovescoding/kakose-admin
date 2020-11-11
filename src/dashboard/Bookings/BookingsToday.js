import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Custom Imports
import useUser from "../../hooks/useUser";
import DashboardLayout from "../../layouts/DashboardLayout";

function TodayBookings() {
  // Stateful Hooks
  const { user } = useUser();
  const history = useHistory();

  // Effects and Events
  useEffect(() => {
    if (user.role === "admin") {
      history.push("/clubs");
    }
  }, []);

  return <DashboardLayout>Today Bookings</DashboardLayout>;
}

export default TodayBookings;
