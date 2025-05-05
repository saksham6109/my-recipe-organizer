import React, { useEffect, useState, useRef } from "react";
import FavouriteRecipeModal from "./FavouriteRecipeModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NutritionModal from "../NutritionalModal";
import Loader from "./Loader";
import Button from "../Button";

const Popular = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true); 
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();
        if (data.meals) {
          setMeals(data.meals.slice(0, 15));
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchMeals();
  }, []);
  
  

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
    if (!scrollRef.current) return;
  
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };
  

  useEffect(() => {
  if (!scrollRef.current) return;

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
    <div className="p-2 h-[350px] relative overflow-hidden mt-13">
      <h2 className="text-2xl font-bold mb-4">Popular Recipes</h2>

      {loading ? (
  <div className="h-[350px] flex items-center justify-center">
    <Loader />
  </div>
) : (
  <>
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
        className="flex overflow-x-auto overflow-y-hidden space-x-6 pr-4 pb-5 h-[310px] scroll-smooth"
      >
        {meals.map((meal) => (
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
                onClick={() =>
                  setSelectedNutrition({
                    protein: Math.floor(Math.random() * 30),
                    carbs: Math.floor(Math.random() * 50),
                    fats: Math.floor(Math.random() * 20),
                  })
                }
              
               text= "Nutri Info"
              />
              <Button
                onClick={() => handleView(meal)}
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
  </>
)}

      
    </div>
  );
};

export default Popular;
