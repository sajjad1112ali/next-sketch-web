"use client";
import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get('category');
  const handleTag = (category: string) => {
    router.push(`${pathName}?category=${category}`)
  };
  return (
    <div className="flexBetween w-full flex-wrap overflow-auto">
      <ul className="flex gap-5 shrink-0">
        {categoryFilters.map((category: string) => (
          <button
            key={category}
            type="button"
            onClick={() => handleTag(category)}
            className={`${category === filter ? 'bg-light-white-300 font-medium' : 'font-normal'} px-4 py-3 capitalize rounded-lg whitespace-nowrap`}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
