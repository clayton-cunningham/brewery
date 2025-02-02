import { createContext } from "react";
import { Ingredient } from "../../assets/resources";

type InventoryContext = {
    ingredients: Ingredient[] | null,
    inventoryUpdateIngredient: (key: string, count: number, userId: string, token: string) => Promise<void>,
    getInventory: Function,
}

export const InventoryContext =
    createContext({
        ingredients: null,
        inventoryUpdateIngredient: async () => {},
        getInventory: async () => {}
     } as InventoryContext)
