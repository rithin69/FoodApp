import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";

const FoodItems = () => {
  const category = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  const [loading, setLoading] = useState(true); // New state for loading

  const handleToast = (name) => toast.success(`Added ${name} to cart!`);

  // Effect to run once on mount and set loading to false after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    // Cleanup function to clear the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  // Filter the food data based on category and search
  const filteredFood = FoodData.filter((food) => {
    if (category === "All") {
      return food.name.toLowerCase().includes(search.toLowerCase());
    }
    return (
      category === food.category &&
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">
        {loading ? (
          // Show shimmer for all items while loading
          Array.from({ length: FoodData.length }, (_, index) => (
            <Shimmer key={index} />
          ))
        ) : (
          // Once loading is done, display the food items
          filteredFood.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              desc={food.desc}
              rating={food.rating}
              img={food.img}
              handleToast={() => handleToast(food.name)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FoodItems;
