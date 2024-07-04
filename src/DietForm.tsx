// src/DietForm.tsx
import React, { useState } from "react";

interface DietFormProps {
  addDietItem: (item: {
    name: string;
    calories: string;
    servingSize: string;
  }) => void;
}

const DietForm: React.FC<DietFormProps> = ({ addDietItem }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [servingSize, setServingSize] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && calories.trim() && servingSize.trim()) {
      addDietItem({ name, calories, servingSize });
      setName("");
      setCalories("");
      setServingSize("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-darkMode-foreground rounded-lg"
    >
      <h2 className="text-lg font-semibold mb-4 text-black dark:text-darkMode-text">
        Add Diet Item
      </h2>
      <div className="mb-4">
        <label className="block text-black dark:text-darkMode-text">
          Item Name
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-darkMode-text">
          Calories
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-black dark:text-darkMode-text">
          Serving Size
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-darkMode-foreground text-black dark:text-darkMode-text"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-primary-light dark:bg-primary-dark text-white p-2 rounded-lg"
      >
        Add Item
      </button>
    </form>
  );
};

export default DietForm;
