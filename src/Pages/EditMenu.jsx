import { useEffect, useState } from "react";
import "../Css/EditMenu.css";
import useCategory from "../Hooks/useCategory";
import useMenu from "../Hooks/useMenu";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditMenu() {
  const { getCategory, category } = useCategory();
  const {error,updateMenu, getSingleMenu } = useMenu();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading,setLoading]=useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      const menu = await getSingleMenu(id);

      setName(menu.menuName);
      setCategoryId(menu.menuCategory);
      setPrice(menu.menuPrice);
      setImage(menu.menuImage);


    };
    fetchMenu();
  }, [id]);

  const editHandler = async (e) => {
    e.preventDefault();
    await updateMenu(id, name, categoryId, price, image);
    setLoading(false);
    navigate("/menu");
  };


  return (
    <div className="edit-form">
      <div className="edit-container">
        <form onSubmit={editHandler}>
          <h2>Edit Menu Item</h2>
          <p>Update menu details, pricing, category, and image information.</p>

          <div className="edit-input">
            <label>Menu Name</label>
            <input
              type="text"
              placeholder="Enter Menu Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label>Category</label>
           <select
  onChange={(e) => setCategoryId(e.target.value)}
  value={typeof categoryId === "object" ? "" : categoryId}
>
              <option value="">Select Category</option>
              {category.map((c) => (
                <option value={c.categoryName} key={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Menu Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            <label>Image</label>
            <input
              type="text"
              placeholder="Enter Menu Image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />

            {image && <img src={image} alt={name}/>}

            {error && <p className="menuedit-error">{error}</p>}

            <div className="menu-edit">
              <button type="submit" disabled={loading}>
                {loading ? <span className="menuedit-spinner"></span> : "Edit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
