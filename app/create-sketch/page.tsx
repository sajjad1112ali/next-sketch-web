import Modal from "@/components/Modal";
import SketchForm from "@/components/SketchForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const createSketch = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Create a new project</h3>
      <SketchForm type="create" session={session} />
    </Modal>
  );
};

export default createSketch;
