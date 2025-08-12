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



//Old code


// MenuItems.jsx
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAddItem, removeItem } from './reducers/cartReducer';

// const MenuItems = ({ title, itemCards = [], isExpanded, onToggle }) => {
//     const dispatch = useDispatch();

//     const handleAddItems=(item)=>{
//         dispatch(setAddItem(item));
//     }

//     const handleRRemoveItems=(item)=>{
//         dispatch(removeItem(item?.card?.info?.id));
//     }

//     const cartItems = useSelector((state) => state.cartReducer.items); // adjust slice name

//     const isInCart = (id) => {
//     return cartItems.some(cartItem => cartItem.card.info.id === id);
// };


//     return (
//         <div className="menu-category">
//             <div
//                 style={{
//                     cursor: 'pointer',
//                     color: '#007bff',
//                     marginBottom: '10px',
//                 }}
//                 onClick={() => onToggle(title)}
//             >
//                 <h4>{title} {isExpanded ? '🔽' : '▶️'}</h4>
//             </div>

//             {isExpanded &&
//                 itemCards.map((item) => {
//                     const { id, name, description, price, defaultPrice, imageId } = item.card.info;
//                     return (
//                         <div key={id} className="menu-item" style={{ marginLeft: '20px' }}>
//                             <h5>{name} - ₹{(defaultPrice || price || 0) / 100}</h5>
//                             <p>{description}</p>
//                             {imageId && (
//                                 <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${imageId}`}
//                                     alt={name}
//                                     style={{
//                                         width: '200px',
//                                         borderRadius: '8px',
//                                         marginTop: '8px',
//                                     }}
//                                 />
//                             )}
//                             <button onClick={()=>handleAddItems(item)}>Add +</button>
//                             {isInCart(item.card.info.id) && (
//                                 <button onClick={() => handleRRemoveItems(item)}> - </button>
//                             )}
//                         </div>
//                     );
//                 })}
//         </div>
//     );
// };

// export default MenuItems;
