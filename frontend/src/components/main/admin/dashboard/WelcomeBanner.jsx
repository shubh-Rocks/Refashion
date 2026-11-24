import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState();
  const [currentDate, setCurrentDate] = useState();
  const userName =
    user?.fullname || user?.name || user?.username || "Guest User";

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 16) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    const date = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("en-GB", date);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
          {currentDate}
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {greeting}, {userName}
        </h2>

        <p className="text-sm text-gray-600">
          Here's what's happening in the ReWear community.
        </p>
      </div>
    </div>
  );
}
