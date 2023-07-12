import prisma from "@/lib/db/prisma";
export const getSkethes =async () => {
    const sketches = await prisma.sketch.findMany();
      return sketches;
}
