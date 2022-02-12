import { useState } from "react";
import "./styles/App.css";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [id, setID] = useState(null);

  function handleDelete() {
    console.log("ID: " + id);
  }

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid
        setSelectedImage={setSelectedImage}
        handleDelete={handleDelete}
        setID={setID}
      />
      {selectedImage && (
        <Modal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
