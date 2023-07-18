"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
const { API_BASE_URL } = process.env;

type Props = {
  sketchId: number;
};

const SketchActions = ({ sketchId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const deleteSketch = async (id: number) => {
    const response = await fetch(`/api/sketch?id=${id}`, {
      method: "GET",
    });
    return response.json();
  };

  const handleDeleteSketch = async () => {
    setIsDeleting(true);

    try {
      await deleteSketch(sketchId);

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-sketch/${sketchId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteSketch}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default SketchActions;
