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
            const ingredientMap = {};
            // console.log('print', Object.values(cakes).map(item => item.ingredients))
       
            Object.values(cakes).map(item => item.ingredients).flat().forEach(ingredient => { 
                const { ingredient: ingredientName, quantity } = ingredient;
                if (ingredientMap[ingredientName]) {
                    ingredientMap[ingredientName] += parseInt(ingredient.quantity || '0')
                } else {
                    ingredientMap[ingredientName] = parseInt(ingredient.quantity || '0');
                }
            })
    
            // console.log("Ingredient Map" + JSON.stringify(ingredientMap))
    

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