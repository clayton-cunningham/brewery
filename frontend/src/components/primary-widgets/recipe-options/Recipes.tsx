import { useContext, useEffect, useState } from "react";
import { Ingredient, Recipe, RecipePossibility, recipes } from "../../../assets/resources";
import "./Recipes.less";
import { RecipeOptions } from "./RecipeOptions"
import { Row } from "../../generic/Row";
import { Column } from "../../generic/Column";
import { InventoryContext } from "../../../shared/context/inventory-context";

export const Recipes = () => {

    const {ingredients} = useContext(InventoryContext);
    const [column1Recipes, setColumn1Recipes] = useState<Recipe[]>([]);
    const [column4Recipes, setColumn4Recipes] = useState<Recipe[]>([]);
    const [column1Ingredients, setColumn1Ingredients] = useState<Ingredient[]>([]);
    const [column4Ingredients, setColumn4Ingredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (ingredients == null) return;
        // console.log(selectedIngredients)
        // selectedIngredients.forEach(i => {console.log(i.active)})
        // Get selected ingredients
        var possibleIngredients = ingredients.filter(i => {console.log(i);return i.active});
        // console.log(selectedIngredients)

        // Get all other ingredients
        var impossibleIngredients = ingredients.filter(i => !possibleIngredients.includes(i));

        var possibleRecipes: Recipe[] = [];
        var impossibleRecipes: Recipe[] = [];

        // Sort the recipes into each category
        recipes.forEach(recipe => {
            var missingForSelected = false;
            recipe.ingredients.forEach(ingredient => {
                // Check if an ingredient is used in the recipe
                var ingredientCount = ingredient.count;

                if (ingredientCount != undefined && ingredientCount > 0){
                    if (possibleIngredients.find(i => i.key == ingredient.key) == undefined) {
                        missingForSelected = true;
                    }
                }
            })

            if (!missingForSelected) {
                possibleRecipes.push(recipe);
            }
            else {
                impossibleRecipes.push(recipe);
            }
            
        })

        // Update all of our variables for UI
        setColumn1Recipes(possibleRecipes);
        setColumn4Recipes(impossibleRecipes);
        setColumn1Ingredients(possibleIngredients);
        setColumn4Ingredients(impossibleIngredients);
    }, [ingredients])

    return (
        <Column className="recipes-section">
            <Row className="recipes-lists">
                <RecipeOptions title="Possible Recipes"             recipes={column1Recipes} titleIngredients={column1Ingredients} possibleIngredients={column1Ingredients}
                    possible={RecipePossibility.Possible} />
                <RecipeOptions title="Impossible Recipes"           recipes={column4Recipes} titleIngredients={column4Ingredients} possibleIngredients={column1Ingredients}
                    possible={RecipePossibility.Impossible}
                />
            </Row>
        </Column>
    )
}