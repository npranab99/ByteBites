import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

const ItemCart = () => {
    const CartItem = useSelector((store)=>store.cartReducer.items)

    console.log(CartItem,"cart")
    return (
        <div>
            <h1>Cart</h1>
            {CartItem.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                CartItem.map((item) => (
                    <MenuItem key={item.card.info.id} item={item} />
                ))
            )}
        </div>
    );
}

export default ItemCart;
