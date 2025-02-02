import { Ingredient, ingredients, Recipe, RecipePossibility } from "../../../assets/resources";
import "./Recipes.less";
import { Row } from "../../generic/Row";
import { RowColumnAdaptive } from "../../generic/RowColumnAdaptive";
import { Column } from "../../generic/Column";
import { Pill } from "../../generic/Pill";

export const RecipeOptions = (props: {recipes: Recipe[], title: string, titleIngredients: Ingredient[], possible?: RecipePossibility, possibleIngredients: Ingredient[]}) => {

    const {title, recipes, titleIngredients, possible, possibleIngredients} = props;


    const getIngredients = (recipe: Recipe) => {

        var currIngredients: any[] = [];
        recipe.ingredients.forEach(ingredient => {
            var ingredientDetails = ingredients.find(i => i.key == ingredient.key);
            if (ingredientDetails == null) throw new Error("Ingredient not found!");
            var iCount = ingredient.count;

            if (iCount != undefined && iCount != 0) {
                currIngredients.push(
                    <Row key={ingredientDetails.name + "_ingredient-count"} className="ingredient-display">
                        {possibleIngredients.filter(i => i.key == ingredient.key).length == 0 && (
                            <Pill className="red missing-ingredient-text"/>
                        )}
                        <p className="ingredient-count">{iCount}</p>
                        <img className="img-xs" src={ingredientDetails.uri} />
                    </Row>
                );
            }
        })

        return currIngredients;
    }
    
    return (
        <div className="recipe-list">
            <Column className="recipe-list-title">
                <h3>{title}</h3>
                <Row>
                    {titleIngredients.map(i =>
                        <img key={i.name + "_ingredient-obtainable"} className="img-xs" src={i.uri} />
                    )}
                </Row>
            </Column>
            <Row className="recipe-entries">
                {recipes.map(recipe => 
                    <RowColumnAdaptive 
                        key={recipe.key + "_recipe-entry"} 
                        className={"recipe-entry" 
                            + (possible == RecipePossibility.Possible ? " possible-recipe" : "")
                            + (possible == RecipePossibility.Impossible ? " impossible-recipe" : "")}
                    >
                        <Row>
                            <div>
                                <img className="img-m" src={"./recipes/" + recipe.uri} />
                            </div>
                        </Row>
                        <p className="recipe-name">{recipe.name}</p>
                        <Row className="recipe-ingredient-list">
                            {getIngredients(recipe)}
                        </Row>
                    </RowColumnAdaptive>
                )}
            </Row>
        </div>
    )
}