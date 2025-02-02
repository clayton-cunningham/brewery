import { ingredients } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { IngredientSelector } from "./IngredientSelector";
import { useContext } from "react";
import LoadingSpinner from "../../generic/newer/LoadingSpinner";
import { InventoryContext } from "../../../shared/context/inventory-context";

export const IngredientSelectors = () => {

    const inventory = useContext(InventoryContext);

    return (
        <Column className={`selector mobile-width-90`}>
            {inventory.ingredients ?
                <>
                    <h2>Select ingredients to see what you can make:</h2>
                    <Row className={`selector-result-list`}>
                        <Row className={`background-container`}>
                            {ingredients.map(i => {
                                return (
                                    <div key={i.key + "_active-type-group"}>
                                        <IngredientSelector
                                            ingredient={i}
                                        />
                                    </div>
                                )
                            })}
                        </Row>
                    </Row>
                </>
                :
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            }
        </Column>
    )
}