import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import FavouriteRecipeModal from "./FavouriteRecipeModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NutritionModal from "../NutritionalModal";
import Button from "../Button";

const Favourite = () => {
  const meals = useSelector((state) => state.favorites);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null);

  const scrollRef = useRef(null);

  const handleView = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const updateScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    updateScrollButtons();

    scrollContainer.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [meals]);

  return (
    <div className="p-5 h-[370px] relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Favourite Recipes</h2>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 px-2 py-4 rounded-md z-10"
        >
          <IoIosArrowBack />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 px-2 py-4 rounded-md z-10"
        >
          <IoIosArrowForward />
        </button>
      )}

<div
  ref={scrollRef}
  className="flex overflow-x-auto overflow-y-hidden space-x-6 pr-4 pb-6 h-[310px] scroll-smooth"
>
  {meals.filter((meal) => meal.idMeal).length === 0 ? (
    <p className="text-gray-500">No favorites yet.</p>
  ) : (
    meals
      .filter((meal) => meal.idMeal) 
      .map((meal) => (
        <div
          key={meal.idMeal}
          className="min-w-[250px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-40 object-cover rounded-md"
            onClick={() => handleView(meal)}
          />
          <h3 className="flex justify-items-start text-lg font-semibold text-center mt-3">
            {meal.strMeal}
          </h3>
          <p className="text-sm text-gray-500">
              {meal.strTags}
            </p>
          <div className="flex justify-between items-center mt-2">
            <Button
              text="Nutri Info"
              onClick={() =>
                setSelectedNutrition({
                  protein: Math.floor(Math.random() * 30),
                  carbs: Math.floor(Math.random() * 50),
                  fats: Math.floor(Math.random() * 20),
                })
              }  
            />
            <Button
              onClick={() => handleView(meal)}
              text='view'
            />
          </div>
        </div>
      ))
  )}
</div>

      <FavouriteRecipeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        meal={selectedMeal}
      />
      {selectedNutrition && (
        <NutritionModal
          nutrition={selectedNutrition}
          onClose={() => setSelectedNutrition(null)}
        />
      )}
    </div>
  );
};

export default Favourite;
