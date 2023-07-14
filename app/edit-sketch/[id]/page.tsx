import Modal from "@/components/Modal";
import SketchForm from "@/components/SketchForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditSketch = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Edit sketch</h3>
      <SketchForm type="edit" session={session} />
    </Modal>
  );
};

export default EditSketch;
