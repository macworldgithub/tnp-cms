import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import app from "./firebaseconfig";

export const uploadBanner = async (file: File) => {
  const storage = getStorage(app);
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `banners/${file.name}`);
    console.log(file, "inf irebase calls");
    uploadBytes(storageRef, file)
      .then((snapshot: any) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve("Uploaded");
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateBanner = async (file: File, previousName: string) => {
  const storage = getStorage(app);
  return new Promise((resolve, reject) => {
    const deleteRef = ref(storage, `banners/${previousName}`);
    const storageRef = ref(storage, `banners/${file.name}`);
    deleteObject(deleteRef)
      .then(() => {
        uploadBytes(storageRef, file)
          .then((snapshot: any) => {
            getDownloadURL(snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
