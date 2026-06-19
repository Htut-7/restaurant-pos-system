import { useState } from "react";
import { db } from "../Firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function useMenu() {
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState([]);

  const addMenu = async (name, category, price, image) => {
    try {
      setAddLoading(true);
      setError(null);

      const q = query(
        collection(db, "menu"),
        where("menuName", "==", name.trim()),
      );

      const snapShot = await getDocs(q);

      if (!snapShot.empty) {
        throw new Error("Menu already exists");
      }

      const ref = await addDoc(collection(db, "menu"), {
        menuName: name.trim(),
        menuCategory: category,
        menuPrice: Number(price),
        menuImage: image,
        createdAt: serverTimestamp(),
      });
      setAddLoading(false);
      return ref;
    } catch (error) {
      setError(error.message);
      setAddLoading(false);
    }
  };

  const getMenu = () => {
    try {
      setLoading(true);
      setError(null);

      const q = query(collection(db, "menu"), orderBy("createdAt"));

      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMenu(data);
        setLoading(false);
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteMenu=async(id)=>{
    try{
        setLoading(false);
        setError(null);

        await deleteDoc(doc(db,"menu",id));
        setLoading(false);
    }catch(error){
        setError(error.message);
        setLoading(false);
    }
  };

  const updateMenu=async(id,name,category,price,image)=>{
    try{
      setLoading(true);
      setError(null);

      await updateDoc(doc(db,"menu",id),{
        menuName:name,
        menuCategory: category,
        menuPrice: price,
        menuImage: image,
        createdAt: serverTimestamp()
      });

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  const getSingleMenu=async(id)=>{
    try{
      setLoading(true);
      setError(null);

      const snapShot=await getDoc(doc(db,"menu",id));

      if(!snapShot.exists()){
        throw new Error('Error')
      }

      return{
        id:snapShot.id,
        ...snapShot.data()
      };

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  return { error, addLoading, addMenu, loading, getMenu, menu, deleteMenu, updateMenu, getSingleMenu };
}
