import { Ingredient } from "../../../assets/resources";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";

export const IngredientSelector = (props: 
    {ingredient: Ingredient, context: AppContext,
        mainAction: (source: Ingredient) => void}) => {

    const {ingredient, context, mainAction} = props;

    var ingredientState = context.selectedIngredients.find(i => i.name == ingredient.name);

    return (
        <Column
            key={ingredient.key + "_ingredient_selector"} 
            className={"ingredient-selector " + (ingredientState?.active ? "can-use" : "cant-use")}
        >
            <div onClick={() => mainAction(ingredient)}>
                <div className="main-icon">
                    <img
                        src={ingredient.uri} 
                        className="img-m"
                    />
                </div>
            </div>
        </Column>
    )
}