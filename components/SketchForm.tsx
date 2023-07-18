"use client";
import { SessionInterface, Sketch } from "@/common.types";
import { categoryFilters } from "@/constants";
import { createNewSketch, editSketch } from "@/lib/db/sketch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Button from "./Button";
import CategoriesDD from "./CategoriesDD";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
  sketch?: Sketch;
};
const SketchForm = ({ type, session, sketch }: Props) => {
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    try {
      if (type === "create") {
        await createNewSketch(form, session?.user?.id, "Token");
        router.push("/");
      }
      if (type === "edit") {

        await editSketch(form, sketch?.id!, "Token");
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setisSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Kindly upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setform((prevState) => ({ ...prevState, [fieldName]: value }));
  };
  const getButtonTitle = () => {
    return isSubmitting
      ? `${type === "create" ? "Creating" : "Editing"}`
      : `${type === "create" ? "Create" : "Edit"}`;
  };
  const defaultForm = {
    image: sketch?.image || "",
    title: sketch?.title || "",
    description: sketch?.description || "",
    category: sketch?.category || "",
  };
  const [form, setform] = useState(defaultForm);
  const [isSubmitting, setisSubmitting] = useState(false);
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Chose a poster for you sketch"}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === "create"}
          onChange={handleChangeImage}
          className="form_image-input"
        />
        {form?.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            fill
            alt="Sketch poster"
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeHolder="Something"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeHolder="Explain the characteristics of your sketch"
        setState={(value) => handleStateChange("description", value)}
        isTextArea={true}
      />
      <CategoriesDD
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={getButtonTitle()}
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default SketchForm;
