import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Header from "./header";

export default function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const handleSelect = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onDateSelect && onDateSelect(date);
  };

  const monthName = currentDate.toLocaleString("fi-FI", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* App header */}
      <Header />

      {/* Page content */}
      <div className="flex flex-col items-center flex-1 bg-linear-to-br from-blue-200 via-slate-100 to-blue-200 p-6">
        {/* Title row */}
        <div className="w-full max-w-xl flex items-center mb-6">
            <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-blue-600 hover:underline"
            >
            ← Takaisin
            </button>

            <h1 className="flex-1 text-center text-2xl font-bold">
            Kalenteri
            </h1>

            {/* spacer jotta otsikko pysyy keskellä */}
            <div className="w-20" />
        </div>

        <div className="bg-white rounded-xl shadow p-4 w-full max-w-xl">
          {/* Month navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => changeMonth(-1)}>
              ←
            </Button>

            <h2 className="font-semibold capitalize">{monthName}</h2>

            <Button variant="outline" onClick={() => changeMonth(1)}>
              →
            </Button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
            {["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) =>
              day ? (
                <button
                  key={i}
                  onClick={() => handleSelect(day)}
                  className={`p-2 rounded-md hover:bg-blue-100 transition
                    ${
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === month
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                >
                  {day}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}