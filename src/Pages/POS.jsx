import { useEffect, useState } from "react";
import "../Css/POS.css";
import useMenu from "../Hooks/useMenu";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import useCart from "../Hooks/useCart";
import useCategory from "../Hooks/useCategory";
import useOrder from "../Hooks/useOrder";

export default function POS() {
  const { getMenu, menu } = useMenu();
  const { addCart, getCart, cart, deleteCart, increaseCart, decreaseCart } =
    useCart();
  const { category, getCategory } = useCategory();
  const [selectCategory, setSelectCategory] = useState("All");
  const {addOrder}=useOrder();

  useEffect(() => {
    getMenu();
    getCategory();
  }, []);

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (item) => {
    const exists = cart.find((c) => c.name === item.menuName);

    if (exists) {
      alert("Item already exists");
      return;
    }
    await addCart(
      item.menuName,
      item.menuCategory,
      item.menuPrice,
      item.menuImage,
    );
  };

  const deleteItem = async (e, id) => {
    e.preventDefault();
    await deleteCart(id);
  };

  const filterMenu =
    selectCategory === "All"
      ? menu
      : menu.filter((item) => item.menuCategory === selectCategory);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.mPrice) * item.mQuantity,
    0,
  );

  const addItem=async(e)=>{
    e.preventDefault();
    await addOrder(cart, total);
    for (const item of cart) {
    await deleteCart(item.id);
  }
  }

  return (
    <div className="pos">
      <div className="pos-header">
        <h2>Point of Sale</h2>
        <p>
          Select menu items, build orders, and process transactions quickly and
          efficiently
        </p>
      </div>

      <div className="category-section">
        <div className="category-container">
          <button onClick={() => setSelectCategory("All")}>All</button>
          {category.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectCategory(c.categoryName)}
            >
              {c.categoryName}
            </button>
          ))}
        </div>
      </div>

      <div className="food-card">
        <div className="food-card-container">
          {filterMenu.length === 0 ? (
            <div className="empty-food">
              <h3>Out of Service</h3>
              <p>No items available in this category right now.</p>
            </div>
          ) : (
            filterMenu.map((m) => (
              <div className="single-food" key={m.id}>
                <img src={m.menuImage} alt={m.menuName} />

                <div className="food-detail">
                  <h3>{m.menuName}</h3>
                  <p>Price: {m.menuPrice}฿</p>
                  <span>Category: {m.menuCategory}</span>
                </div>

                <div className="food-btn">
                  <button type="button" onClick={() => addToCart(m)}>
                    <FaShoppingCart />
                    Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="checkout-section">
        <div className="checkout-container">
          <h2>Check Out</h2>

          <div className="checkout-table">
            {cart.map((ca) => (
              <div className="cart-item" key={ca.id}>
                <img src={ca.mImage} alt={ca.name} />

                <div className="cart-info">
                  <h3>{ca.name}</h3>
                  <p>Price: {ca.mPrice}฿</p>
                  <span>Category: {ca.mCategory}</span>
                  <p>Quantity: {ca.mQuantity}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => decreaseCart(ca.id, ca.mQuantity)}>
                    -
                  </button>

                  <span>{ca.mQuantity}</span>

                  <button onClick={() => increaseCart(ca.id, ca.mQuantity)}>
                    +
                  </button>
                </div>

                <button
                  className="delete-cart-btn"
                  onClick={(e) => deleteItem(e, ca.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="checkout-footer">
            <h3>Total: ฿{total}</h3>

            <button className="checkout-order-btn" onClick={addItem}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
