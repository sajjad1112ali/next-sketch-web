"use client";
import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="flexBetween w-full flex-wrap overflow-auto">
      <ul className="flex gap-5 shrink-0">
        {categoryFilters.map((category: string) => (
          <button key={category}>{category}</button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
