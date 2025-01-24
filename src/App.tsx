import { useEffect, useState } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { BoxEntry, IngredientLevel, Pokemon, pokemonBox } from './assets/resources';
import { getBoxCookie, setBoxCookie } from './helpers/cookieHelpers';

export type AppContext = {
  selectedPokemon: BoxEntry[],
  togglePokemon: (source: Pokemon) => void,
  selectPokemon: (source: Pokemon) => void,
  selectPokemonIngredients: (source: Pokemon, lvl: IngredientLevel) => void,
}

const getBoxInit = () => {
  const cookie = getBoxCookie();
  if (cookie.length > 0) return cookie
  return pokemonBox;
}

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState<BoxEntry[]>(getBoxInit());

  useEffect(() => {
    setBoxCookie(selectedPokemon);
  }, [selectedPokemon])

  const togglePokemon = (source: Pokemon) => {
      const index = selectedPokemon.findIndex(oP => oP.DexNumber == source.dexNumber);
      if (index == -1) {
        throw new Error("Pokemon not found!");
      }

      // Update the stored value
      var oP = selectedPokemon;
      // Only toggle this mon being considered in calculations - the user shouldn't have to reselect everything later.
      oP[index].Perf = !oP[index].Perf;
      setSelectedPokemon([...oP]);
  }

  const selectPokemon = (source: Pokemon) => {
      const index = selectedPokemon.findIndex(oP => oP.DexNumber == source.dexNumber);
      if (index == -1) {
        throw new Error("Pokemon not found!");
      }

      // Update the stored value
      var oP = selectedPokemon;
      // Only toggle this mon being considered in calculations - the user shouldn't have to reselect everything later.
      oP[index].Perf = true;
      setSelectedPokemon([...oP]);
  }

  const selectPokemonIngredients = (source: Pokemon, lvl: IngredientLevel) => {
      const index = selectedPokemon.findIndex(oP => oP.DexNumber == source.dexNumber);
      if (index == -1) {
        throw new Error("Pokemon not found!");
      }

      // Update the stored value
      var oP = selectedPokemon;

      // Make sure this selection is now considered too - saves an extra click for the user.
      oP[index].Perf = true;
      if      (lvl == IngredientLevel.Lvl0)  { }
      else if (lvl == IngredientLevel.Lvl30) { oP[index].ingredientLevel30 = !oP[index].ingredientLevel30}
      else if (lvl == IngredientLevel.Lvl60) { oP[index].ingredientLevel60 = !oP[index].ingredientLevel60;}
      setSelectedPokemon([...oP]);
  }

  return (
    <>
      <Column>
        <MainPage context={{selectedPokemon, togglePokemon, selectPokemon, selectPokemonIngredients}}/>
        {/* <PokemonList context={{selectedPokemon, togglePokemon, selectPokemon, selectPokemonIngredients}}/> */}
      </Column>
    </>
  )
}

export default App
