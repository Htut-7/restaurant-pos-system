import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase/firebase";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const addCart = async (name, category, price, image) => {
    try {
      setLoading(true);
      setError(null);

      await addDoc(collection(db, "cart"), {
        name: name,
        mCategory: category,
        mPrice: price,
        mImage: image,
        mQuantity: 1,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const q = query(collection(db, "cart"), orderBy("createdAt"));

      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCart(data);
        setLoading(false);
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteCart = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await deleteDoc(doc(db, "cart", id));
      setLoading(false);
      return res;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const increaseCart = async (id, quantity) => {
    await updateDoc(doc(db, "cart", id), {
      mQuantity: Number(quantity || 0) + 1,
    });
  };

  const decreaseCart = async (id, quantity) => {
    if (quantity === 1) {
      await deleteDoc(doc(db, "cart", id));
      return;
    }
    await updateDoc(doc(db, "cart", id), {
      mQuantity: Number(quantity) - 1,
    });
  };

  return {
    loading,
    error,
    addCart,
    getCart,
    cart,
    deleteCart,
    increaseCart,
    decreaseCart,
  };
}
