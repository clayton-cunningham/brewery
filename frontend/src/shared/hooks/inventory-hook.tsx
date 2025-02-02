import { useState } from "react";
import { Ingredient, ingredients } from "../../assets/resources";
import { useHttpClient } from "./http-hook";

type InventoryResponse = {
    inventory: [
        {
            slot: number,
            count: number,
            userInventoryId: number,
            user: string,
            ingredientId: string,
        }
    ]
}

export const initInventory = () => {

    const { sendRequest } = useHttpClient();

    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[] | null>(ingredients);
    
    const inventorySubmitHandler = async (key: string, count: number, userId: string, token: string) => {
        if (!token) return;
        try {
            await sendRequest(
                import.meta.env.VITE_API_URL + `/inventory/${userId}/1`,
                "PATCH",
                JSON.stringify({
                    "inventory": [
                        {
                            "slot": parseInt(key), // This will have to be updated later, once actual slots are implemented
                            "ingredientId": key,
                            "count": count
                        },
                    ]
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            );
        } catch (e) { }
    };

    const updateIngredientLocal = (key: string, count: number) => {
        if (selectedIngredients == null) {
            return;
        }
        
        const index = selectedIngredients.findIndex(i => i.key == key);
        if (index == -1) {
            throw new Error("Ingredient not found!");
        }

        // Update the stored value
        var sI = selectedIngredients;
        sI[index].count = count;
        sI[index].active = count > 0;
        setSelectedIngredients([...sI]);
    }

    const inventoryUpdateIngredient = async (key: string, count: number, userId: string, token: string) => {
        await inventorySubmitHandler(key, count, userId, token);
        updateIngredientLocal(key, count);
    }

    const getInventory = async (userId: string, token: string) => {
        try {
            if (!token) {
                return;
            }

            const response = await sendRequest(
                import.meta.env.VITE_API_URL + `/inventory/${userId}/1`,
                "GET",
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            ) as InventoryResponse;

            let inventory = ingredients;
            response.inventory.forEach(resIng => {
                const index = inventory.findIndex(i => i.key == resIng.ingredientId);
                if (index == -1) {
                    throw new Error("Ingredient not found!");
                }
                // Update the stored value
                inventory[index].count = resIng.count;
                inventory[index].active = resIng.count > 0;
            })
            setSelectedIngredients(inventory)
        } catch (e) { }
    };

  return { selectedIngredients, inventoryUpdateIngredient, getInventory };
}