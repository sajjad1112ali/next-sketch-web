import { SketchForm } from "@/common.types";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const { data } = await request.json();
     
    try {
        const sketch = await prisma.sketch.create({
            data
          });
      return NextResponse.json(
        sketch,
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error!" },
        { status: 400 }
      );
    }
  }
  