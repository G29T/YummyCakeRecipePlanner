import React from 'react';
import './App.css';
import CakeRecipeForm from './components/cake-recip-form/CakeRecipeForm';
import ShoppingList  from './components/shopping-list/ShoppingList';
import { useCakeContext} from './context/CakeProvider'


function App() {
  const { displayShoppingList } = useCakeContext();

  return (
    <div className="App background">
      <div className="content">
        <CakeRecipeForm />
        {displayShoppingList && <ShoppingList />}
      </div>
    </div>
  );
}

export default App;
