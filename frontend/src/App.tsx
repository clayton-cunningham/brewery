import { Suspense } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { Auth } from './components/primary-widgets/auth/Auth'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './components/generic/newer/LoadingSpinner';
import MainNavigation from './components/navigation/MainNavigation';
import { InventoryContext } from './shared/context/inventory-context';
import { initInventory } from './shared/hooks/inventory-hook';

function App() {

  const { userId, userName, token, login, logout } = useAuth();
  const { selectedIngredients, getInventory, inventoryUpdateIngredient } = initInventory();
  
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={
          <MainPage />
        }/>
        <Route path="*" element={
          <MainPage />
        }/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={
          <MainPage />
        }/>
        <Route path="/auth" element={
          <Auth />
        }/>
        <Route path="*" element={
          <MainPage />
        }/>
      </Routes>
    )
  }

  return (
    <>
      <AuthContext.Provider value={{isLoggedIn: !!token, token: token, userId: userId, userName: userName, login: login, logout: logout}}>
        <InventoryContext.Provider value={({ingredients: selectedIngredients, inventoryUpdateIngredient, getInventory})}>
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
        </InventoryContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
