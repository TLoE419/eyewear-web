"use client";
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  text,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-[rgb(136,99,64)]",
    white: "border-white",
    gray: "border-gray-400",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 border-t-transparent rounded-full animate-spin
        `}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

// 全屏載入動畫
export function FullScreenLoader({ text = "載入中..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  );
}

// 卡片載入骨架
export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-4 md:gap-2 lg:gap-2 xl:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gray-200 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// 圖片載入骨架
export function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner size="md" color="gray" />
      </div>
    </div>
  );
}
