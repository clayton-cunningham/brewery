import { PageSection } from "../../generic/PageSection";
import { Recipes } from "../recipe-options/Recipes";
import { AppContext } from "../../../App";
import "./MainPage.less"
import { Column } from "../../generic/Column";
import { IngredientSelectors } from "../selectors/IngredientSelectors";

export const MainPage = (props: {context: AppContext}) => {

    const {context} = props;

    return (
        <PageSection>
            <Column>
                <Column className="selectors">
                    <IngredientSelectors 
                        context={context}
                    />
                </Column>
                <Recipes 
                    selectedIngredients={context.selectedIngredients}
                />
            </Column>
        </PageSection>
    )
}