import React, { forwardRef } from "react";

// forwardRef mahdollistaa refien käytön Input-komponentissa
export const Input = forwardRef(
  ({ label, type = "text", value, onChange, placeholder = "", className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col mb-4 ${className}`}>
        {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...props} // välittää kaikki muut propsit eteenpäin
        />
      </div>
    );
  }
);

