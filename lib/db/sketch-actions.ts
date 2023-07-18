import prisma from "@/lib/db/prisma";
export const getSkethes = async (category:  string | null | undefined) => {
  let query = {};

  if (category) {
    query = {
      where: {
        category: category,
      },
    };
  }
  const sketches = await prisma.sketch.findMany(query);
  return sketches;
};

export const getSketheDetails = async (id: string) => {
  const sketch = await prisma.sketch.findUnique({
    where: {
      id: parseInt(id),
    }
  });
  return sketch;
};

export const getUserSketchs = async (userId: number) => {
  const sketch = await prisma.sketch.findMany({
    where: {
      userId,
    }
  });
  return sketch;
};
