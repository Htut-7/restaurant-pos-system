import { useEffect, useState } from "react";
import "../Css/Categories.css";
import useCategory from "../Hooks/useCategory";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Categories() {
  const [name, setName] = useState("");

  const {  error, addCategory, getCategory, category, deleteCategory, addLoading } = useCategory();

  const addHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    const category = await addCategory(name);
    if (category) {
      setName("");
      await getCategory();
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const deleteItem=async(e,id)=>{
    e.preventDefault();
    await deleteCategory(id);
    await getCategory();
  }

  return (
    <div className="categories">
      <div className="categories-container">
        <h2>Categories</h2>
        <p>Manage restaurant menu categories.</p>

        <div className="categories-grid">
          <div className="category-form-card">
            <h3>Add new Category</h3>

            <form className="category-form" onSubmit={addHandler}>
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter Category Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              {error && <p className="category-error">{error}</p>}

              <button className="category-btn" type="submit" disabled={addLoading}>
                {addLoading ? <span className="category-spinner"></span> : "Add"}
              </button>
            </form>
          </div>

          <div className="available-catg">
            <h2>Availabale Categories</h2>

            <div className="available-container">
              {category.map((c) => (
                <div className="single-category" key={c.id}>
                  <h3>{c.categoryName}</h3>

                  <div className="single-btn">
                    <button onClick={(e)=>deleteItem(e,c.id)} className="delete-btn" type="button">
                      <FaTrash />
                    </button>

                    <Link to={`/editcategory/${c.id}`}>
                      <FaPencil />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
