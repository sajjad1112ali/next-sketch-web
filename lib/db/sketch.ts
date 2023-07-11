import { SketchForm } from "@/common.types";
import prisma from "@/lib/db/prisma";

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const createNewSketch = async (
  form: SketchForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  
  if (imageUrl.url) {

    return 'Sketch save successfully'
  }
  return 'Sketch save successfully'
};
