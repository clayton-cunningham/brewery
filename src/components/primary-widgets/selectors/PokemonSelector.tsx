import { BoxEntry, IngredientLevel, ingredients, pokedex, Pokemon, TypeGroup } from "../../../assets/resources";
import { Row } from "../../generic/Row";
import { AppContext } from "../../../App";
import "./Selectors.less"
import { Column } from "../../generic/Column";
import { Pill } from "../../generic/Pill";
import { HoverHighlight } from "../../generic/HoverHighlight";
import { CloseButton } from "../../generic/CloseButton";
import { formatIdForPng } from "../../../helpers/helpers";

export const PokemonSelector = (props: 
    {typeGroup: TypeGroup, context: AppContext, excludeLevel60: boolean, 
        mainAction: (source: Pokemon) => void, ingredientAction: (source: Pokemon, lvl: IngredientLevel) => void, closeAction?: () => any}) => {

    const {typeGroup, context, excludeLevel60, mainAction, ingredientAction, closeAction} = props;
    
    var dexEntry = pokedex.find(p => p.name == typeGroup.default)!;
    if (dexEntry == undefined) return null;

    var monState = context.selectedPokemon.find(oP => oP.DexNumber == dexEntry.dexNumber);

    const getIngredientPillState = (monState: BoxEntry | undefined, hasIngredient: boolean | undefined) => {
        if (monState?.Perf && hasIngredient) return "down-1";
        else return "down-0"
    }

    const getExcludePillState = (excludeLevel60: boolean) => {
        if (excludeLevel60) return "down-1";
        else return "down-0"
    }

    return (
        <Column
            key={typeGroup.key + "_berry_mon"} 
            className={"pokemon-selector " + (monState?.Perf ? "can-use" : "cant-use")}
        >
            <div onClick={() => mainAction(dexEntry)}>
                <div className="main-icon">
                    <img
                        src={formatIdForPng(dexEntry.dexNumber)} 
                        className="img-m"
                    />
                    <Row className="sub-icon-group">
                        {typeGroup.pokemon.filter(subP => subP != dexEntry.name).map(subP => {
                            var subDexEntry = pokedex.find(p => p.name == subP)!;
                            if (subDexEntry == undefined) return null;

                            return (
                                <img
                                    key={subDexEntry.dexNumber + "_sub-dex-entry"}
                                    className="img-xs"
                                    src={formatIdForPng(subDexEntry.dexNumber)}
                                />
                            )
                        })}
                    </Row>
                    {closeAction &&
                        <CloseButton action={closeAction}/>
                    }
                </div>
                <Row className="pokemon-ingredients">
                    <HoverHighlight className="img-xs">
                        <Pill vertical={true} className={"green " + getIngredientPillState(monState, true)} />
                        <img 
                            src={ingredients.find(i => i.name == dexEntry.ingredient_1)?.uri ?? "ingredients/unknown.png"}
                            className="img-xs"
                            onClick={(event) => {
                                // TODO: decide if we want clicking the first ingredient to remove the others (maybe long click?)
                                ingredientAction(dexEntry, IngredientLevel.Lvl0); 
                                event.stopPropagation();
                            }}
                        />
                    </HoverHighlight>
                    {dexEntry.ingredient_2 && dexEntry.ingredient_2 != "0" ?
                        <HoverHighlight className="img-xs">
                            <Pill vertical={true} className={"green " + getIngredientPillState(monState, monState?.ingredientLevel30)} />
                            <img 
                                src={ingredients.find(i => i.name == dexEntry.ingredient_2)?.uri}
                                className="img-xs"
                                onClick={(event) => {
                                    ingredientAction(dexEntry, IngredientLevel.Lvl30); 
                                    event.stopPropagation();
                                }}
                            />
                        </HoverHighlight>
                        :
                        <div className="img-xs"/>
                    }
                    {dexEntry.ingredient_3 && dexEntry.ingredient_3 != "0" ?
                        <HoverHighlight className="img-xs">
                            <Pill vertical={true} className={"grey " + getExcludePillState(excludeLevel60)} />
                            <Pill vertical={true} className={"green " + getIngredientPillState(monState, monState?.ingredientLevel60)} />
                            <img 
                                src={ingredients.find(i => i.name == dexEntry.ingredient_3)?.uri}
                                className={"img-xs" + (excludeLevel60 && (!monState?.Perf || !monState?.ingredientLevel60) ? " fade" : "")}
                                onClick={(event) => {
                                    ingredientAction(dexEntry, IngredientLevel.Lvl60);
                                    event.stopPropagation();
                                }}
                            />
                        </HoverHighlight>
                        :
                        <div className="img-xs"/>
                    }
                </Row>
            </div>
        </Column>
    )
}