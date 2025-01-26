import { useState } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { Ingredient, ingredients } from './assets/resources';

export type AppContext = {
  selectedIngredients: Ingredient[],
  toggleIngredient: (source: Ingredient) => void,
}

function App() {

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(ingredients);

  const toggleIngredient = (source: Ingredient) => {
      const index = selectedIngredients.findIndex(i => i.key == source.key);
      if (index == -1) {
        throw new Error("Ingredient not found!");
      }

      // Update the stored value
      var sI = selectedIngredients;
      sI[index].active = !sI[index].active;
      setSelectedIngredients([...sI]);
  }

  return (
    <>
      <Column>
        <MainPage context={{selectedIngredients, toggleIngredient}}/>
      </Column>
    </>
  )
}

export default App
