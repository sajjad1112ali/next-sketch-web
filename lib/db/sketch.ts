import { SketchForm } from "@/common.types";
import { isBase64DataURL } from "../utils";
const API_BASE_URL = process.env.API_BASE_URL;
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const saveSketchToDb = async (data: any) => {
  try {
    const response = await fetch(`/api/sketch`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const updateSketchToDb = async (data: any, sketchId: number) => {
  try {
    console.log(`<<<<<<<<<API_BASE_URL>>>>>>>>>`, API_BASE_URL)
    const response = await fetch(`/api/sketch`, {
      method: "PUT",
      body: JSON.stringify({ data, sketchId }),
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
    const data = {
      ...form,
      image: imageUrl.url,
      userId: creatorId,
    };
    const sketch = await saveSketchToDb(data);
    return "Sketch save successfully";
  }
  return "Sketch save successfully";
};

export const editSketch = async (
  form: SketchForm,
  sketchId: number,
  token: string
) => {
  let updatedForm = { ...form }
  if (isBase64DataURL(form.image)){
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = {
        ...updatedForm,
        image: imageUrl.url,
      };
    }
  }

  const sketch = await updateSketchToDb(updatedForm, sketchId);
  return "Sketch updated successfully";};
