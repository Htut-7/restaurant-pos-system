import { useState } from "react";
import { db } from "../Firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  doc,
  orderBy,
  onSnapshot,
  updateDoc,
  getDoc
} from "firebase/firestore";

export default function useCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [addLoading,setAddLoading]=useState(false);
  const addCategory = async (name) => {
    try {
      setAddLoading(true);
      setError(null);

      const q = query(
        collection(db, "categories"),
        where("categoryName", "==", name.trim()),
      );

      const snapShot = await getDocs(q);

      if (!snapShot.empty) {
        throw new Error("Category already exists");
      }

      await addDoc(collection(db, "categories"), {
        categoryName: name,
        createdAt: serverTimestamp(),
      });
      setAddLoading(false);
    } catch (error) {
      setError(error.message);
      setAddLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      setLoading(true);
      setError(null);

      const q=query(collection(db,"categories"),orderBy("createdAt"));

      return onSnapshot(q,(snapshot)=>{
        const data=snapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        }));
        setCategory(data);
        setLoading(false);
      })
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteCategory=async(id)=>{
    try{
        setLoading(true);
        setError(null);

        await deleteDoc(doc(db,"categories",id));
        setLoading(false);

    }catch(error){
        setError(error.message);
        setLoading(false);
    }
  }

  const editCategory=async(id,name)=>{
    try{
        setAddLoading(true);
        setError(false);

        await updateDoc(doc(db,"categories",id),{
            categoryName: name,
            createdAt: serverTimestamp()
        });

    }catch(error){
        setError(error.message);
        setLoading(false);
    }
  }

  const getSingle=async(id)=>{
    try{
      setLoading(true);
      setError(null);
      
      const snap=await getDoc(doc(db,"categories",id));

      if(!snap.exists()){
        throw new Error ('Error')
      };

      return {
        id:snap.id,
        ...snap.data()
      };

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  return { loading, error, addCategory, getCategory, category, deleteCategory, addLoading, editCategory, getSingle };
}
