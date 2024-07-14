import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCakeContext} from '../../context/CakeProvider';
import { ingredientsData } from '../../data/ingredients-data';
import IngredientList from '../ingredient-list/IngredientList';
import CakeHistory from '../cake-history/CakeHistory';
import { XCircleIcon, PrinterIcon } from '@heroicons/react/24/solid';

const CakeRecipeForm = () => {
    const { updateCakes, printShoppingList } = useCakeContext()
    const [cakeName, setCakeName] = useState('');
    const [cakeIngredients, setCakeIngredients] = useState([{  id: uuidv4(), quantity: '', ingredient: '' }]);

    const handleAddIngredient = () => {
        setCakeIngredients([...cakeIngredients, { id: uuidv4(), quantity: '', ingredient: '' }]);
    };
    
    const handleIngredientSelect = (id, key, value) => {
        const newIngredients = [...cakeIngredients];
        newIngredients[id][key] = value;
        setCakeIngredients(newIngredients);
    };

    const removeIngredient = (id) => {
        const newIngredients = cakeIngredients.filter(ingredient => ingredient.id !== id);
        setCakeIngredients(newIngredients);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const cakeId = `cake_${Date.now()}`
        updateCakes({ [cakeId]: { name: cakeName, ingredients: cakeIngredients } })
        setCakeName('');
        setCakeIngredients([{  id: uuidv4(), quantity: '', ingredient: '' }]);
        alert('Cake added successfully');
    };

    return(
        <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col md:flex-row max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl space-y-8 md:space-y-0 md:space-x-3">
                <div className="w-full md:w-1/3 p-4 md:p-6 lg:p-8 max-h-80 mt-2 overflow-y-auto border border-white bg-gray-600 bg-opacity-50 rounded-lg">
                    <CakeHistory />
                </div>
                <div className="w-full md:w-2/3">
                    <div className="flex items-start">
                        <button
                            type="button"
                            data-testid="print-shopping-list"
                            onClick={printShoppingList}
                            className="flex items-center mt-2 mb-3 ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 rounded"
                            >
                                <PrinterIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 mr-2" />
                                Shopping List
                        </button>
                    </div>

                    <form
                        className="max-w-md mx-auto p-4 md:p-6 lg:p-8 border border-white bg-gray-600 bg-opacity-50 rounded-lg"
                        onSubmit={handleSubmit}
                    >
                        <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-bold mb-4">What are you cooking today?</p>
                        <input
                            className="w-full p-2 md:p-3 lg:p-4 mb-4 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Cake Name"
                            value={cakeName}
                            onChange={(e) => setCakeName(e.target.value)}
                            required
                        />
                        {cakeIngredients.map((ingredient, index) => (
                            <div className="flex flex-row items-center mb-2 md:mb-3 lg:mb-4" key={ingredient.id}>
                                <IngredientList
                                key={ingredient.id}
                                index={index}
                                ingredients={ingredientsData}
                                handleIngredientSelect={handleIngredientSelect}
                                />
                                <button
                                    type="button"
                                    data-testid="remove"
                                    onClick={() => removeIngredient(ingredient.id)}
                                    className="ml-2 mr-6 text-red-500 hover:text-red-600"
                                >
                                    <XCircleIcon className="h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"/>
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-col items-center">
                            <button
                                type="button"
                                data-testid="add-ingredient"
                                onClick={handleAddIngredient}
                                className="bg-yellow-900 hover:bg-yellow-950 text-white mt-3 md:mt-4 lg:mt-5 px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-md"
                            >
                                Add Ingredient
                            </button>
                            <button
                                type="submit"
                                data-testid="add-cake"
                                className="bg-blue-500 hover:bg-blue-600 text-white mt-3 md:mt-4 lg:mt-5 px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-4 rounded-md"
                            >
                                Add Cake
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CakeRecipeForm;