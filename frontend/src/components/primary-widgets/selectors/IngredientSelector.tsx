import { Ingredient } from "../../../assets/resources";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import Button from "../../form-elements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { Row } from "../../generic/Row";

export const IngredientSelector = (props: 
    {ingredient: Ingredient, context: AppContext,
        toggleIngredient: (source: Ingredient, active: boolean) => void
        saveHandler: (ingredientId: number, count: number) => void,
        initCount?: number | undefined
    }) => {

    const {ingredient, context, toggleIngredient, saveHandler, initCount} = props;

    const [formState, inputHandler] = useForm(
        {
            count: {
                value: initCount ?? 0,
                isValid: false
            },
        },
        false
    );

    var ingredientState = context.selectedIngredients.find(i => i.name == ingredient.name);

    const saveChange = (value: number) => {
        toggleIngredient(ingredient, value > 0);
        inputHandler("count", value, true);
        saveHandler(ingredient.key, value);
    };

    const changeHandler = (event: {target: {value: any}}) => { saveChange(event?.target?.value) };
    const decrementHandler = () => { saveChange(parseInt(formState.inputs?.count?.value) - 1) };
    const incrementHandler = () => { saveChange(parseInt(formState.inputs?.count?.value) + 1) };

    return (
        <Column
            key={ingredient.key + "_ingredient_selector"} 
            className={"ingredient-selector " + (ingredientState?.active ? "can-use" : "cant-use")}
        >
            <Row>{/* <div> onClick={() => mainAction(ingredient)}> */}
                <div className="main-icon">
                    <img
                        src={ingredient.uri} 
                        className="img-m"
                    />
                </div>
                <form>
                    <Button
                        type="button"
                        children={<>-1</>}
                        onClick={decrementHandler}
                        size="small"
                    />
                    <input
                        id="count"
                        onChange={changeHandler}
                        type="number"
                        value={formState.inputs?.count?.value}
                        className="ingredient-selector-number-input"
                    />
                    <Button
                        type="button"
                        children={<>+1</>}
                        onClick={incrementHandler}
                        size="small"
                    />
                </form>
            </Row>
        </Column>
    )
}