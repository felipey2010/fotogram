import useFirestore from "../utils/hooks/useFirestore";
import { motion } from "framer-motion";

export default function ImageGrid({ setSelectedImage }) {
  const { docs } = useFirestore("images-tb");

  if (docs.length >= 1) {
    return (
      <div className="img-grid">
        {docs &&
          docs.map(doc => {
            return (
              <motion.div
                className="img-wrap"
                key={doc.id}
                layout
                whileHover={{ opacity: 1 }}
                onClick={() => setSelectedImage(doc.url)}>
                <motion.img
                  src={doc.url}
                  alt="uploaded pic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </motion.div>
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
