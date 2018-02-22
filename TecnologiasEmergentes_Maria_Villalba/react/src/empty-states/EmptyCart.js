import React, {Component} from 'react';

const EmptyCart = (props) =>{
    return(
        <div className="empty-cart">
            <img src="../src/assets/cart-empty.png" alt="empty-cart"/>
            <h2>No hay artículos en el carrito de compras!</h2>
        </div>
    )
};

export default EmptyCart;
