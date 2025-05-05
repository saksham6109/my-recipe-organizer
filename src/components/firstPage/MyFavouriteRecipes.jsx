import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import FavouriteRecipeModal from "./FavouriteRecipeModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NutritionModal from "../NutritionalModal";
import Button from "../Button";

const MyFavouriteRecipes = () => {
  const createdRecipes = useSelector(
    (state) => state.recipes?.createdRecipes || []
  );
  const favorites = useSelector((state) => state.myOwnFavorites || []);
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
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    updateScrollButtons();
    scrollContainer.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [favorites, createdRecipes]);

  const myFavs = createdRecipes.filter((recipe) =>
    favorites.find((fav) => fav.id === recipe.id)
  );

  if (myFavs.length === 0) return null;

  return (
    <div className="p-6 h-[350px] mt-3 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 mt-6">My Favourite Recipes</h2>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-50 -translate-y-1/2 bg-gray-100 hover:bg-gray-300 px-2 py-4 rounded-md z-10"
        >
          <IoIosArrowBack />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-50 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 px-2 py-4 rounded-md z-10"
        >
          <IoIosArrowForward />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden space-x-6 pr-4 h-[250px] scroll-smooth"
      >
        {myFavs.map((recipe) => (
          <div
            key={recipe.id}
            className="min-w-[250px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            onClick={() => handleView(recipe)}
          >
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}

            <h3 className="text-lg font-semibold text-left mt-3">
              {recipe.name}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                  setSelectedNutrition({
                    protein: recipe.protein ?? Math.floor(Math.random() * 30),
                    carbs: recipe.carbs ?? Math.floor(Math.random() * 50),
                    fats: recipe.fats ?? Math.floor(Math.random() * 20),
                  });
                }}
                text="Nutri Info"
              />

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleView(recipe);
                }}
                text="View"
              />
            </div>
          </div>
        ))}
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

export default MyFavouriteRecipes;
