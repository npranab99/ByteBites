// MenuItem.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddItem, removeItem } from "./reducers/cartReducer";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.items);

  const handleAddItems = () => {
    dispatch(setAddItem(item));
  };

  const handleRemoveItems = () => {
    dispatch(removeItem(item?.card?.info?.id));
  };

  const cartItem = cartItems.find(
    (cartItem) => cartItem.card.info.id === item.card.info.id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const { id, name, description, price, defaultPrice, imageId } =
    item.card.info;

  return (
    <div key={id} className="menu-item" style={{ marginLeft: "20px" }}>
      <h5>
        {name} - ₹{(defaultPrice || price || 0) / 100}
      </h5>
      <p>{description}</p>
      {imageId && (
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${imageId}`}
          alt={name}
          style={{
            width: "200px",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        />
      )}
      {quantity > 0 ? (
        <div>
          <button onClick={handleRemoveItems}> - </button>
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <button onClick={handleAddItems}> + </button>
        </div>
      ) : (
        <button onClick={handleAddItems}>Add +</button>
      )}
    </div>
  );
};

export default MenuItem;
