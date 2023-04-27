import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  getDoc,
  setDoc,
  where,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "@/services/firebase";
import { toast } from "react-toastify";
import { months } from "@/utils/months";

const db = getFirestore(app);

export const getDBDoc = async (collectionName, id) => {
  try {
    const ref = doc(db, collectionName, id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (e) {
    const errorNotify = () =>
      toast.error(
        "Oops something went wrong. Please check your internet connection."
      );
    errorNotify();
  }
};

export const getDBDocs = async (
  collectionName,
  orderByFromUser = null,
  orderOrder = "asc"
) => {
  try {
    const ref = collection(db, collectionName);
    const q = orderByFromUser
      ? query(ref, orderBy(orderByFromUser, orderOrder))
      : ref;
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (e) {
    console.log(e);
    const errorNotify = () =>
      toast.error(
        "Oops something went wrong. Please check your internet connection."
      );
    errorNotify();
  }
};

export const getDBDocsWhere = async (
  collectionName,
  whereFromUser,
  operator,
  valCmp
) => {
  try {
    const ref = collection(db, collectionName);
    const q = query(ref, where(whereFromUser, operator, valCmp));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (e) {
    console.log(e);
    const errorNotify = () =>
      toast.error(
        "Oops something went wrong. Please check your internet connection."
      );
    errorNotify();
  }
};

export const addDBDoc = async (
  collectionName,
  inputValues,
  { resetForm = null },
  setLoading = null,
  items = null,
  setItems = null
) => {
  try {
    if (setLoading != null) setLoading(true);
    const res = await addDoc(collection(db, collectionName), inputValues);
    const addSupplierSuccessNotify = () => toast.success("Added successfully");
    addSupplierSuccessNotify();
    if (items && setItems) {
      const date = new Date();
      setItems([
        {
          ...inputValues,
          tempDate:
            date.getDate() +
            " " +
            months[date.getMonth()] +
            " " +
            date.getFullYear(),
          id: res.id,
        },
        ...items,
      ]);
    }
    if (setLoading != null) setLoading(false);
    if (resetForm != null) resetForm();
  } catch (e) {
    const errorNotify = () => toast.error("Oops something went wrong.");
    errorNotify();
    setLoading(false);
  }
};

export const deleteDBDoc = async (
  collectionName,
  id,
  items = null,
  setItems = null
) => {
  try {
    let res = prompt(
      "You are about to delete. Are you sure? Type yes to confirm otherwise type no"
    );
    if (res)
      if (res.toLowerCase() == "yes") {
        await deleteDoc(doc(db, collectionName, id));
        const deleteSuccessNotify = () => toast.success("Delete success!");
        deleteSuccessNotify();
        if (items && setItems) {
          const newItems = items.filter((item) => item.id != id);
          setItems(newItems);
        }
      }
  } catch (e) {
    const deleteErrorNotify = () =>
      toast.error("Oops something went wrong while deleting");
    deleteErrorNotify();
  }
};

export const updateDBDoc = async (collectionName, items, id, setLoading) => {
  try {
    setLoading(true);
    const ref = doc(db, collectionName, id);
    await setDoc(ref, items);
    const editSuccessNotify = () => toast.success("Edited successfully");
    editSuccessNotify();
    setLoading(false);
  } catch (e) {
    const errorNotify = () => toast.error("Oops something went wrong.");
    errorNotify();
    setLoading(false);
  }
};
