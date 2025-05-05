import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionModal = ({ nutrition, onClose }) => {
  const data = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      data: [nutrition.protein, nutrition.carbs, nutrition.fats],
      backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
      borderWidth: 1,
    }]
  };

  return (
    <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <h2 className="text-xl font-bold mb-2">
          {nutrition.mealName ? `${nutrition.mealName} - Nutrition Breakdown` : 'Nutrition Breakdown'}
        </h2>
        <Pie data={data} />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default NutritionModal;
