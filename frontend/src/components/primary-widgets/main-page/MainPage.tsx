import { PageSection } from "../../generic/PageSection";
import { Recipes } from "../recipe-options/Recipes";
import "./MainPage.less"
import { Column } from "../../generic/Column";
import { IngredientSelectors } from "../selectors/IngredientSelectors";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { InventoryContext } from "../../../shared/context/inventory-context";

export const MainPage = () => {

    const { userId, token } = useContext(AuthContext);
    const { getInventory } = useContext(InventoryContext)

    useEffect(() => {
        getInventory(userId, token);
      }, [token])

    return (
        <PageSection>
            <Column>
                <Column className="selectors">
                    <IngredientSelectors />
                </Column>
                <Recipes />
            </Column>
        </PageSection>
    )
}