import { useEffect } from "react";
import useStorage from "../utils/hooks/useStorage";
import { motion } from "framer-motion";

export default function ProgressBar({ setFile }) {
  const { url, progress } = useStorage();

  useEffect(() => {
    if (url.length > 1) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}></motion.div>
  );
}
