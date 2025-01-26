import { Ingredient, ingredients } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { IngredientSelector } from "./IngredientSelector";

export const IngredientSelectors = (props: {context: AppContext}) => {

    const {context} = props;

    return (
        <Column className={`selector mobile-width-90`}>
            <h2>Select ingredients to see what you can make:</h2>
            <Row className={`selector-result-list`}>
                <Row className={`background-container`}>
                    {ingredients.map(i => {
                        return (
                            <div key={i.key + "_active-type-group"}>
                                <IngredientSelector
                                    context={context}
                                    ingredient={i}
                                    mainAction={(ingredient: Ingredient) => context.toggleIngredient(ingredient)}
                                />
                            </div>
                        )
                    })}
                </Row>
            </Row>
        </Column>
    )
}