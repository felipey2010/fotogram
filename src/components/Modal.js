import { motion } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";

export default function Modal({
  setSelectedImage,
  selectedImage,
  handleDelete,
}) {
  // Close modal only when the backdrop is clicked
  const handleClick = e => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImage(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <motion.div
        className="selected-image-div"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}>
        <motion.img src={selectedImage} alt="selected pic" />
        {selectedImage && (
          <AiFillDelete
            className="modal-delete-button delete-button"
            onClick={() => handleDelete()}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
