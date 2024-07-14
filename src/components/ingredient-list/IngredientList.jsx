import React from 'react';

const IngredientList = ({ index, ingredients, handleIngredientSelect }) => {
  return (
    <div data-testid={`ingredient-list-${index}`} className="flex flex-row items-center">
      <input className="w-16 md:w-20 lg:w-24 p-2 md:p-3 lg:p-4 mr-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
        type="number"
        placeholder="Qty"
        onChange={(e) => handleIngredientSelect(index, 'quantity', e.target.value)}
        data-testid={`ingredient-quantity-${index}`}
        required
      />
      <select className="p-2 md:p-3 lg:p-4 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500" 
        onChange={(e) => handleIngredientSelect(index, 'ingredient', e.target.value)}
        data-testid={`ingredient-select-${index}`}
        required
      >
        <option value="">Select Ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.name}
            data-testid={`ingredient-option-${ingredient.id}`}
          >
            {ingredient.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IngredientList;
