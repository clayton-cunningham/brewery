import { Suspense, useState } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { Ingredient, ingredients } from './assets/resources';
import { Auth } from './components/primary-widgets/auth/Auth'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './components/generic/newer/LoadingSpinner';
import MainNavigation from './components/navigation/MainNavigation';

export type AppContext = {
  selectedIngredients: Ingredient[],
  toggleIngredient: (source: Ingredient) => void,
}

function App() {

  const { userId, userName, token, login, logout } = useAuth();
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
  
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={
          <MainPage context={{selectedIngredients, toggleIngredient}}/>
        }/>
        <Route path="*" element={
          <MainPage context={{selectedIngredients, toggleIngredient}}/>
        }/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={
          <MainPage context={{selectedIngredients, toggleIngredient}}/>
        }/>
        <Route path="/auth" element={
          <Auth />
        }/>
        <Route path="*" element={
          <MainPage context={{selectedIngredients, toggleIngredient}}/>
        }/>
      </Routes>
    )
  }

  return (
    <>
      <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, userName: userName, login: login, logout: logout}}>
        <BrowserRouter>
          <Column>
            <MainNavigation />
            <main>
              <Suspense fallback={
                <div className='center'>
                  <LoadingSpinner />
                </div>
              }>
                {routes}
              </Suspense>
            </main>
          </Column>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
