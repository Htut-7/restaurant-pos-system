import { useEffect, useMemo, useState } from "react";
import "../Css/Menu.css";
import useCategory from "../Hooks/useCategory";
import useMenu from "../Hooks/useMenu";
import { FaTrash, FaPencil, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Menu() {
  const { category, getCategory } = useCategory();
  const {
    addLoading,
    error,
    addMenu,
    menu,
    getMenu,
    deleteMenu,
  } = useMenu();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const unsub = getMenu();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const menuHandler = async (e) => {
    e.preventDefault();

    const result = await addMenu(
      name,
      categoryId,
      price,
      image
    );

    if (result) {
      setName("");
      setCategoryId("");
      setPrice("");
      setImage("");
      setShowForm(false);
    }
  };

  const deleteFood = async (id) => {
    await deleteMenu(id);
  };

  const filteredMenu = useMemo(() => {
    return menu.filter((item) =>
      item.menuName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [menu, search]);

  const averagePrice =
    menu.length > 0
      ? (
          menu.reduce(
            (sum, item) => sum + Number(item.menuPrice),
            0
          ) / menu.length
        ).toFixed(0)
      : 0;

  return (
    <div className="menu-page">

      <div className="menu-header">
        <div>
          <h2>Menu Management</h2>
          <p>Manage restaurant menu items.</p>
        </div>

        <button
          className="add-menu-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Menu Item
        </button>
      </div>

      <div className="menu-stats">
        <div className="stat-card">
          <h3>{menu.length}</h3>
          <span>Total Items</span>
        </div>

        <div className="stat-card">
          <h3>{category.length}</h3>
          <span>Categories</span>
        </div>

        <div className="stat-card">
          <h3>฿{averagePrice}</h3>
          <span>Average Price</span>
        </div>
      </div>

      <div className="menu-toolbar">
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="menu-table-wrapper">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMenu.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.menuImage}
                    alt={item.menuName}
                    className="table-image"
                  />
                </td>

                <td>{item.menuName}</td>

                <td>{item.menuCategory}</td>

                <td>฿{item.menuPrice}</td>

                <td>
                  <div className="table-actions">
                    <Link className="edit-btn" to={`/editmenu/${item.id}`}>
                      <FaPencil />
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteFood(item.id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="menu-modal-overlay">
          <div className="menu-modal">

            <div className="modal-header">
              <h3>Add Menu Item</h3>

              <button
                onClick={() =>
                  setShowForm(false)
                }
              >
                ✕
              </button>
            </div>

            <form onSubmit={menuHandler}>

              <input
                type="text"
                placeholder="Menu Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Category
                </option>

                {category.map((c) => (
                  <option
                    key={c.id}
                    value={c.categoryName}
                  >
                    {c.categoryName}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
              />

              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="preview-image"
                />
              )}

              {error && (
                <p className="menu-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="save-btn"
                disabled={addLoading}
              >
                {addLoading
                  ? "Saving..."
                  : "Save Menu Item"}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}