import "./globals.css";
import React from "react";
import { getSkethes } from "@/lib/db/sketch-actions";
import SketchCard from "@/components/SketchCard";
import { Sketch } from "@/common.types";
import Categories from "@/components/Categories";
type SearchParams = {
  category?: string | null;
}
type Props = {
  searchParams: SearchParams;
}
const Home = async ({ searchParams: { category }}: Props) => {
  const sketeches = await getSkethes(category);
  if (sketeches.length === 0) {
    return (
      <section className="flex-start flex-col paddings mb-16">
        <Categories />
        <p className="no-result-text text-center">Sketches not found!</p>
      </section>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="sketchs-grid">
        {sketeches.map((sk: Sketch) => (
          <SketchCard key={sk.id} sketch={sk} />
        ))}
      </section>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
