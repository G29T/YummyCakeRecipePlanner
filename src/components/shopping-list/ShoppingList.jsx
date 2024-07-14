import React from 'react'
import { useCakeContext } from '../../context/CakeProvider'
import { v4 as uuidv4 } from 'uuid';
import { XMarkIcon } from '@heroicons/react/24/solid';


export const ShoppingList = () => {
    const { shoppingList, closeShoppingList } = useCakeContext()

    const displayMetric = (ingredient) => {
        if (ingredient === 'egg' || ingredient === "vanilla pod") {
            return '';
        } else if (ingredient === 'milk' || ingredient === 'unicorn tears' || ingredient === 'grand marnier') {
            return ' ml';
        } else {
            return ' g';
        }
    };

    return (
        <div className="relative max-w-sm mx-auto mt-10 p-4 border border-white bg-gray-600 bg-opacity-50 rounded-lg">
             <button
                type="button"
                data-testid="add-ingredient"
                onClick={() =>  closeShoppingList(false)}
                className="absolute top-2 right-2 text-white cursor-pointer"
            >
                <XMarkIcon className="h-7 w-7"/>
            </button>
            <p className="text-xl font-bold text-white mb-4">Shopping list</p>
            {Object.entries(shoppingList || {})
                .map(([ingredient, quantity]) => (
                    <div key={uuidv4()} className="flex justify-between items-center">
                        <p className="text-white font-bold">{ingredient}</p>
                        <p className="text-white font-bold">{quantity}{displayMetric(ingredient)}</p>
                    </div>
                ))
            }  
        </div>
    )

}

export default ShoppingList;