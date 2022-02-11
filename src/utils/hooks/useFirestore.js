import { useState, useEffect } from "react";
import { firestore } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useFirestore = collectionName => {
  const [docs, setDocs] = useState([]);
  const imageRef = collection(firestore, collectionName);

  useEffect(() => {
    const getImages = async () => {
      const data = await getDocs(imageRef);
      console.log(data);

      setDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      // let images = [];

      // data.docs.map(doc =>
      //   images.push({
      //     id: doc.id,
      //     url: doc.data().url,
      //     createdAt: doc.data().createdAt,
      //   })
      // );
      // setDocs(images);
    };

    getImages();
    // eslint-disable-next-line
  }, [collectionName, docs]);

  return { docs };
};

export default useFirestore;
