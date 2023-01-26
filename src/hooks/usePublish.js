import {
    setDoc,
    doc,
    deleteDoc,
    Timestamp,
    onSnapshot,
    query,
    collection,
    where,
    getDoc,
} from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";

const usePublish = () => {
    const publishDocument = (userId, id, file) => {
        return new Promise(async (resolve, reject) => {
            const storageRef = ref(storage, `publish/${userId}/${id}`);

            try {
                const snapshot = await uploadBytesResumable(storageRef, file);
                const url = await getDownloadURL(snapshot.ref);

                const document = {
                    id,
                    userId,
                    url,
                    createdAt: Timestamp.now(),
                };

                const snap = await getDoc(doc(db, "publish", userId));

                if (snap.exists()) {
                    const data = snap.data();
                    await setDoc(doc(db, "publish", userId), {
                        documents: [...data.documents, document],
                    });
                } else {
                    await setDoc(doc(db, "publish", userId), {
                        documents: [document],
                    });
                }
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };

    const getPublishedDocuments = (userId, setData) => {
        onSnapshot(doc(db, "publish", userId), (snap) => {
            if (snap.exists()) setData(snap.data().documents);
            else setData([]);
        });
    };

    const deletePublishedDocument = (userId, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await deleteObject(ref(storage, `publish/${userId}/${id}`));
                await deleteDoc(doc(db, "publish", id));
                resolve(true);
            } catch (e) {
                reject(e);
            }
        });
    };

    return {
        publishDocument,
        getPublishedDocuments,
        deletePublishedDocument,
    };
};

export default usePublish;
