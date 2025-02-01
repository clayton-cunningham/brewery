import { ingredients } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { IngredientSelector } from "./IngredientSelector";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../generic/newer/LoadingSpinner";

export const IngredientSelectors = (props: {context: AppContext}) => {

    const {context} = props;
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [loadedInventory, setLoadedInventory] = useState<{ingredientId: number, count: number}[] | null>(null);

    const inventorySubmitHandler = async (ingredientId: number, count: number) => {
        if (!auth.isLoggedIn) return;
        try {
            await sendRequest(
                import.meta.env.VITE_API_URL + `/inventory/${auth.userId}/1`,
                "PATCH",
                JSON.stringify({
                    "inventory": [
                        {
                            "slot": ingredientId,
                            "ingredientId": ingredientId,
                            "count": count
                        },
                    ]
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
            );
        } catch (e) { }
    };

    useEffect(() => {
        if (!auth.isLoggedIn) {
            setLoadedInventory([])
            return;
        }
        const getInventory = async () => {
            try {
                const response = await sendRequest(
                    import.meta.env.VITE_API_URL + `/inventory/${auth.userId}/1`,
                    "GET",
                    undefined,
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + auth.token,
                    },
                );

                console.log(response)
                setLoadedInventory(response.inventory)
            } catch (e) { }
        }

        getInventory();
    }, [])

    return (
        <Column className={`selector mobile-width-90`}>
            {loadedInventory ?
                <>
                    <h2>Select ingredients to see what you can make:</h2>
                    <Row className={`selector-result-list`}>
                        <Row className={`background-container`}>
                            {ingredients.map(i => {
                                return (
                                    <div key={i.key + "_active-type-group"}>
                                        <IngredientSelector
                                            context={context}
                                            ingredient={i}
                                            toggleIngredient={context.toggleIngredient}
                                            saveHandler={inventorySubmitHandler}
                                            initCount={loadedInventory.find(lI=> lI.ingredientId == i.key)?.count}
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