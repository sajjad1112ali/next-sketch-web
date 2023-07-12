import { SketchForm } from "@/common.types";
const { NEXT_API_BASE_URL } = process.env;
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${NEXT_API_BASE_URL}/api/upload`, {
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
    const response = await fetch(`${NEXT_API_BASE_URL}/api/sketch`, {
      method: "POST",
      body: JSON.stringify({ data }),
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
