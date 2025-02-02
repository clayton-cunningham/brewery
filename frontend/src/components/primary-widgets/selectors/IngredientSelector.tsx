import { Ingredient } from "../../../assets/resources";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import Button from "../../form-elements/Button";
import { Row } from "../../generic/Row";
import { useContext } from "react";
import { InventoryContext } from "../../../shared/context/inventory-context";
import { AuthContext } from "../../../shared/context/auth-context";

export const IngredientSelector = (props: {ingredient: Ingredient }) => {

    const { userId, token } = useContext(AuthContext)
    const { inventoryUpdateIngredient } = useContext(InventoryContext)

    const {ingredient} = props;

    const saveChange = async (value: number) => {
        await inventoryUpdateIngredient(ingredient.key, value, userId!, token!);
    };

    const changeHandler = async (event: {target: {value: any}}) => { await saveChange(parseInt(event?.target?.value)) };
    const decrementHandler = async () => { await saveChange((ingredient.count ?? 0) - 1) };
    const incrementHandler = async () => { await saveChange((ingredient.count ?? 0) + 1) };

    return (
        <Column
            key={ingredient.key + "_ingredient_selector"} 
            className={"ingredient-selector " + (ingredient?.active ? "can-use" : "cant-use")}
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
                        value={ingredient.count ?? 0}
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