import React, { useContext, createContext, useState, useCallback } from 'react'

export const CakeContext = createContext({ 
    cakes: {},
    shoppingList: {}, 
    displayShoppingList: false,
    updateCakes: (data) => {},
    printShoppingList: () => {},
    setDisplayShoppingList: () => Boolean
})

export const CakeProvider = ({ children}) => { 
    const [cakes, setCakes] = useState({});
    const [shoppingList, setShoppingList] = useState({});
    const [displayShoppingList, setDisplayShoppingList] = useState(false);

    const updateCakes = useCallback((data) => { 
        setCakes((prev) => ({  ...prev, ...data}) );
        setDisplayShoppingList(false);
    }, []);


    const printShoppingList = useCallback(() => {
        
        const isEmpty = Object.keys(cakes).length === 0;

        if(!isEmpty){ 
            const cakesKeys = Object.keys(cakes);
            const lastCakesKey = cakesKeys[cakesKeys.length - 1];
            const lastCake = cakes[lastCakesKey];
            const ingredientMap = {};
        
            lastCake.ingredients.forEach(ingredient => {
                const { ingredient: name, quantity } = ingredient;
                if (ingredientMap[name]) {
                    ingredientMap[name] += parseInt(quantity || '0');
                } else {
                    ingredientMap[name] = parseInt(quantity || '0');
                }
            });

            setShoppingList(ingredientMap);
            setDisplayShoppingList(true);
        } else {
            setDisplayShoppingList(false);
            alert("You must introduce a cake first");
        }
    
    }, [cakes]);

    const closeShoppingList = useCallback(() => { 
       setDisplayShoppingList(false);
    }, []);
    
    return ( 
        <CakeContext.Provider value={{ cakes, updateCakes, shoppingList, printShoppingList, displayShoppingList, closeShoppingList }}>{children}</CakeContext.Provider>
    )
}

export const useCakeContext = () => useContext(CakeContext)