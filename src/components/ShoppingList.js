import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

useEffect(()=>{
  fetch("http://localhost:4000/items")
  .then(r => r.json())
  .then(data => setItems(data))
}, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSubmit(e, item) {
    e.preventDefault()
    const configObj = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    fetch("http://localhost:4000/items", configObj)
    .then(r => r.json())
    .then(newItem => setItems([...items, newItem]))
  }

  function addToCart(item) {
    const configObj={
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    fetch(`http://localhost:4000/items/${item.id}`, configObj)
    .then(r => r.json())
    .then(updatedItem => {
      const updatedItems = items.map(item =>{
        if (item.id === updatedItem.id){
          return updatedItem
        } else{
          return item
        }
      })
      setItems(updatedItems)
    })
  }

  function handleDelete(deletedItem){
    fetch(`http://localhost:4000/items/${deletedItem.id}`,{
      method: "DELETE"
    })
      .then(r => r.json())
      .then(() => {
        const fewerItems = items.filter(item => item.id !== deletedItem.id);
        setItems(fewerItems)
      }) 

  }


  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleSubmit={handleSubmit}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} addToCart={addToCart} handleDelete={handleDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
