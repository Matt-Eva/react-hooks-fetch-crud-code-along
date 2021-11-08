import React from "react";

function Item({ item, addToCart, handleDelete}) {

  const updatedItem = {
    id: item.id,
    isInCart: !item.isInCart
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={()=>addToCart(updatedItem)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={()=>handleDelete(item)}>Delete</button>
    </li>
  );
}

export default Item;
