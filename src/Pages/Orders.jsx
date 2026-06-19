import { useEffect } from "react";
import "../Css/Orders.css";
import useOrder from "../Hooks/useOrder";

export default function Orders() {

    const {loading,error,getOrder,order}=useOrder();

    useEffect(()=>{
        getOrder();
    },[]);

  return (
    <div className="orders">
        <div className="orders-container">
            <h3>Orders</h3>
            <p>
                View active orders, update order status, and keep track of all restaurant transactions in one place.
            </p>

            {error && <p className="order-error">{error}</p>}

            {loading && <span className="order-spinner"></span>}

            <div className="order-card">
                {order.map((o)=>(
                    <div className="single-order" key={o.id}>
                        <h3>Order #{o.id.slice(0,6)}</h3>
                       <div className="order-items">
                        {o.orderItem.map((oi)=>(
                            <div key={oi.id}>
                                <p>{oi.name}</p>
                                <span>
                                    {oi.mQuantity} x ฿{oi.mPrice}
                                </span>
                            </div>
                        ))}
                       </div>
                       <h4>Total: {o.orderTotal}฿</h4>
                       <p>Status: {o.status}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
