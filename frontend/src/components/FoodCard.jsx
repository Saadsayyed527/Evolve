// src/components/FoodCard.js
import React from 'react';

function FoodCard({ food }) {
  return (
    <div className="food-card">
      <h3>{food.name}</h3>
      <p>Quantity: {food.quantity}</p>
      <p>Pickup Location: {food.location}</p>
    </div>
  );
}

export default FoodCard;
