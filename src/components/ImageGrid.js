import useFirestore from "../utils/hooks/useFirestore";
import { motion } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";

export default function ImageGrid({ setSelectedImage, handleDelete, setID }) {
  const { docs } = useFirestore("images-tb");

  function deleteImage(_id) {
    setID(_id);
    handleDelete();
  }

  if (docs.length >= 1) {
    return (
      <div className="img-grid">
        {docs &&
          docs
            .slice(0)
            .reverse()
            .map(doc => {
              return (
                <>
                  {doc.url && (
                    <motion.div
                      className="img-wrap"
                      key={doc.id}
                      layout
                      whileHover={{ opacity: 1 }}
                      onClick={e => {
                        e.stopPropagation();
                        setID(doc.id);
                        setSelectedImage(doc.url);
                      }}>
                      <motion.img
                        src={doc.url}
                        alt="uploaded pic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      />
                      <AiFillDelete
                        className="image-delete-button delete-button"
                        onClick={e => {
                          e.stopPropagation();
                          deleteImage(doc.id);
                        }}
                      />
                    </motion.div>
                  )}
                </>
              );
            })}
      </div>
    );
  } else {
    return (
      <div className="image-container">
        <h2>No images uploaded</h2>
      </div>
    );
  }
}
