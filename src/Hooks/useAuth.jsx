import { useState } from "react";
import {db,auth} from "../Firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {serverTimestamp, setDoc, doc, updateDoc } from "firebase/firestore";

export default function useAuth() {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const signUp=async(name,email,password)=>{
    try{
      setLoading(true);
      setError(null);

      const res=await createUserWithEmailAndPassword(auth,email,password);
      await setDoc(doc(db,"users",res.user.uid),{
        userId:res.user.uid,
        name,
        email,
        createdAt: serverTimestamp()
      });
      setLoading(false);
      return (res.user);

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  const signIn=async(email,password)=>{
    try{
      setLoading(true);
      setError(null);

      let res=await signInWithEmailAndPassword(auth,email,password);
      await updateDoc(doc(db,"users",res.user.uid),{
        lastLogin: serverTimestamp()
      })
      setLoading(false);
      return (res.user);

    }catch(error){
      setError(error.message);
      setLoading(false)
    }
  }

  const logOut=async()=>{
    try{
      setLoading(true);
      setError(null);

      await signOut(auth);

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  return {loading,error,signUp,signIn,logOut}
}
