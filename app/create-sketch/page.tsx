import Modal from "@/components/Modal";
import SketchForm from "@/components/SketchForm";

const createSketch = () => {
  return (
    <Modal>
      <h3 className="modal-head-text">Create a new project</h3>
      <SketchForm />
    </Modal>
  );
};

export default createSketch;
