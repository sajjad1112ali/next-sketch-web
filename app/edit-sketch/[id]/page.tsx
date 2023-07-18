import { Sketch } from "@/common.types";
import Modal from "@/components/Modal";
import SketchForm from "@/components/SketchForm";
import { getSketheDetails } from "@/lib/db/sketch-actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditSketch = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  const sketchData = (await getSketheDetails(id)) as Sketch;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit sketch</h3>
      <SketchForm type="edit" session={session} sketch={sketchData} />
    </Modal>
  );
};

export default EditSketch;
