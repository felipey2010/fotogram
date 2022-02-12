import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { db, firestore } from "../firebase-config";
import { useContext } from "react";
import { AppContext } from "../Context";
import { useSnackbar } from "notistack";

export default function useStorage() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const imageRef = collection(firestore, "images-tb");
  const { picture, setPicture } = useContext(AppContext);

  // For notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    closeSnackbar();
    // Check if file exists
    if (!picture) return;

    function saveURL(url) {
      const new_image = {
        url: url,
      };

      addDoc(imageRef, new_image)
        .then(res => {
          const old_image = doc(imageRef, res.id);
          //Set the id to be the same as the automatically generated id by firebase
          updateDoc(old_image, {
            id: res.id,
            createdAt: new Date().toISOString(),
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    const storageRef = ref(
      db,
      `/images/${new Date().toISOString() + "_" + picture.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, picture);

    uploadTask.on(
      "state_changed",
      snap => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      err => {
        setError(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            enqueueSnackbar("File uploaded", {
              variant: "success",
              preventDuplicate: true,
            });
            saveURL(url);
            setUrl(url);
            setPicture([]);
          })
          .catch(err => {
            enqueueSnackbar("Failed to upload", {
              variant: "error",
              preventDuplicate: true,
            });
            setError(err);
          });
      }
    );

    // eslint-disable-next-line
  }, [picture]);

  return { progress, url, error };
}
