import { addDoc, collection, onSnapshot, orderBy, serverTimestamp, query } from "firebase/firestore";
import { useState } from "react"
import {db} from "../Firebase/firebase";

export default function useOrder() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [order,setOrder]=useState([]);

    const addOrder=async(item,total)=>{
        try{
            setLoading(true);
            setError(null);

            await addDoc(collection(db,"orders"),{
                orderItem:item,
                orderTotal: total,
                status: "Pending",
                createdAt: serverTimestamp()
            });
            setLoading(false)

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    };

    const getOrder=async()=>{
        try{
            setLoading(true);
            setError(null);

            const q=query(collection(db,"orders"),orderBy('createdAt'));

            return onSnapshot(q,(snapShot)=>{
                const data=snapShot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setOrder(data);
                setLoading(false);
            })

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

  return {loading,error,addOrder,order,getOrder}
}
