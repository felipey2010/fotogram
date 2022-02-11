import { useState, useContext } from "react";
import { AppContext } from "../utils/Context";
import ProgressBar from "./ProgressBar";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const allowed_image_types = ["image/png", "image/jpg", "image/jpeg"];
  const { setPicture } = useContext(AppContext);

  //Function to upload selected image
  function handleChange(e) {
    let selected_image = e.target.files[0];

    setPicture(selected_image);

    if (selected_image && allowed_image_types.includes(selected_image.type)) {
      setError("");
      setFile(selected_image);
    } else {
      setFile(null);
      setError("Please select a valid image file (png or jpeg)");
    }
  }

  return (
    <form className="upload-form">
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>

      {/* Display error or name of file selected */}
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="file">{file.name}</div>}
        {file && <ProgressBar setFile={setFile} />}
      </div>
    </form>
  );
}
