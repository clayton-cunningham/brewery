import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IngredientLevel, pokedex, Pokemon, TypeGroup, typeGroups } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { PokemonSelector } from "./PokemonSelector";
import { CloseButton } from "../../generic/CloseButton";
import { Column } from "../../generic/Column";
import { CloseBackground } from "../../generic/CloseBackground";

export const CustomSelector = (props: {setPokemon: Dispatch<SetStateAction<Pokemon[]>>, context: AppContext, excludeLevel60: boolean}) => {

    const {setPokemon, context, excludeLevel60} = props;
    const [activeTypeGroups, setActiveTypeGroups] = useState<TypeGroup[]>([]);
    const [showSelectorWindow, setShowSelectorWindow] = useState(false);

    useEffect(() => {
        var pokemon = pokedex.filter(p => activeTypeGroups.find(tGS => tGS.default == p.name) != undefined);
        setPokemon(pokemon);
    }, [activeTypeGroups])

    const addCustomSelection = (typeGroup: TypeGroup) => {
        if (activeTypeGroups.find(tG => tG.key == typeGroup.key) != undefined) return;
        setActiveTypeGroups(activeTypeGroups.concat(typeGroup));
    }

    const removeCustomSelection = (typeGroup: TypeGroup) => {
        const index = activeTypeGroups.findIndex(tG => tG.key == typeGroup.key);
        if (index == -1) return;
        setActiveTypeGroups(activeTypeGroups.slice(0, index).concat(activeTypeGroups.slice(index + 1, activeTypeGroups.length)));
    }

    return (
        <Row className="custom-selector">
            <Row>
                {activeTypeGroups.map(tG => {
                    return (
                        <div key={tG.key + "_custom-type-group"}>
                            <PokemonSelector
                                context={context}
                                typeGroup={tG}
                                excludeLevel60={excludeLevel60}
                                mainAction={(dexEntry: Pokemon) => {
                                    context.togglePokemon(dexEntry);
                                }}
                                ingredientAction={(dexEntry: Pokemon, ingredientLevel: IngredientLevel) => {
                                    context.selectPokemonIngredients(dexEntry, ingredientLevel);
                                }}
                                closeAction={() => {
                                    removeCustomSelection(tG);
                                }}
                            />
                        </div>
                    )
                })}
                
                <Column className={"pokemon-selector"} >
                    <div onClick={() => setShowSelectorWindow(true)}>
                        <div className="img-m custom-selector-window-open">
                            <img
                                src={"./plus.png"} 
                                className="custom-selector-window-open-img"
                            />
                        </div>
                        <Row className="pokemon-ingredients">
                            <div className="img-xs" />
                        </Row>
                    </div>
                </Column>
            </Row>
            {showSelectorWindow &&
                <div>
                    <CloseBackground
                        action={() => setShowSelectorWindow(false)}
                    />
                    <div 
                        className="custom-selector-window"
                    >
                        <Row className="custom-selector-window-inner">
                            {typeGroups.map(tG => {
                                return (
                                    <div key={tG.key + "_custom-selector-entry"}>
                                        <PokemonSelector
                                            context={context}
                                            typeGroup={tG}
                                            excludeLevel60={excludeLevel60}
                                            mainAction={(dexEntry: Pokemon) => {
                                                context.selectPokemon(dexEntry);
                                                addCustomSelection(tG);
                                                setShowSelectorWindow(false);
                                            }}
                                            ingredientAction={(dexEntry: Pokemon, ingredientLevel: IngredientLevel) => {
                                                context.selectPokemonIngredients(dexEntry, ingredientLevel);
                                                addCustomSelection(tG);
                                                setShowSelectorWindow(false);
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </Row>
                        <CloseButton
                            action={() => setShowSelectorWindow(false)}
                        />
                    </div>
                </div>
            }
        </Row>
    )
}