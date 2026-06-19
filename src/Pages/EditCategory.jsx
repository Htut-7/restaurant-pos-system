import { useEffect, useState } from "react";
import "../Css/EditCategory.css";
import useCategory from "../Hooks/useCategory";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditCategory() {

  const [showform,setShowForm]=useState(false);
  const [name,setName]=useState('');
  const {editCategory,getSingle}=useCategory();
  const [loading,setLoading]=useState(false);
  const {id}=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchCategory=async()=>{
      const item=await getSingle(id);

        if(item){
          setName(item.categoryName);
        setShowForm(true);
        }
    }
    fetchCategory();
  },[id])

  const CategoryHandler=async(e)=>{
    e.preventDefault();
    await editCategory(id,name)
    setLoading(false);
    navigate('/category');
  }

  return (
    <div className="edit-category">
      <div className="editcategory-container">
        <h2>Edit Category</h2>
        <p>Update Category information to keep your restaurant menu organized and easy to manage.</p>
      </div>

      {showform && <form onSubmit={CategoryHandler}>
        <div className="modal-header">
              <h3>Edit Category Item</h3>

              <Link className="modal-link"
                to='/category'
              >
                ✕
              </Link>
            </div>
        <div className="edit-category-input">
          <label>CategoryName</label>
          <input type="text" placeholder="Enter CategoryName"
          onChange={(e)=>setName(e.target.value)} value={name}
          />

          <div className="edit-category-btn">
            <button type="submit" disabled={loading}>
              {loading ? <span className="edit-category-spinner"></span> : "Edit"}
            </button>
          </div>
        </div>
      </form>}
    </div>
  )
}
