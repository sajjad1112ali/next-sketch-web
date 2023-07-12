import './globals.css';
import React from "react";
import { getSkethes } from '@/lib/db/sketch-actions';
import SketchCard from '@/components/SketchCard';
import { Sketch } from '@/common.types';

const Home = async () => {
  const sketeches = await getSkethes();
  if (sketeches.length === 0) {
    return (<section>
      <h1>Categories</h1>
      <p className='no-result-text text-center'>Sketches not found!</p>

    </section>)
  }
  return (
    <section className='flex-start flex-col paddings mb-16'>
      <h1>Categories</h1>
      <section className='sketchs-grid'>
        {
          sketeches.map((sk: Sketch) => (<SketchCard key={sk.id} sketch={sk}/>))
        }
      </section>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
