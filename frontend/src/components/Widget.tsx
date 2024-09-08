import React from "react";
import classNames from "classnames";

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, children, className }) => {
  return (
    <div
      className={classNames(
        "px-6 pb-6 bg-white/85 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg flex-1 overflow-auto max-w-lg space-y-4",
        className
      )}
    >
      <div className="sticky bg-white/95 top-0 py-4 border-b border-gray-200 z-10">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="text-gray-500">{children}</div>
    </div>
  );
};

export default Widget;
