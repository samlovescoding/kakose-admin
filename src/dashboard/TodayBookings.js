import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";
import DashboardLayout from "../layouts/DashboardLayout";

function TodayBookings() {
  const { user } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (user.role === "admin") {
      history.push("/clubs");
    }
  }, []);

  return <DashboardLayout>Today Bookings</DashboardLayout>;
}

export default TodayBookings;
