import { pokedex } from "../../../assets/resources";
import { Column } from "../../generic/Column";
import { Row } from "../../generic/Row";
import { PageSection } from "../../generic/PageSection";
import "./PokemonList.less"
import { AppContext } from "../../../App.tsx";
import { formatIdForPng } from "../../../helpers/helpers.tsx";

export const PokemonList = (props: {context: AppContext}) => {

    const {selectedPokemon, togglePokemon} = props.context;

    return (
        <div className="pokemon-list">
            <PageSection>
                <Column>
                    {pokedex.map(mon => {
                        
                        var monState = selectedPokemon.find(oP => oP.DexNumber == mon.dexNumber)

                        return (
                            <div key={mon.dexNumber + "_Pokemon"} onClick={() => togglePokemon(mon)}>
                                <Row>
                                    <input type="checkbox" checked={monState?.Perf} onChange={() => {}} />
                                    {/* <input type="checkbox" onChange={() => togglePokemon(mon)} checked={monState?.Perf} /> */}
                                    {/* <button onClick={() => togglePokemon(mon)}>{monState?.Perf + ""}</button> */}
                                    <img src={formatIdForPng(mon.dexNumber)} />
                                    <p>{mon.name}</p>
                                    <button>
                                        <p>{mon.ingredient_1}</p>
                                    </button>
                                    <button>
                                        <p>{mon.ingredient_2}</p>
                                    </button>
                                    <button>
                                        <p>{mon.ingredient_3}</p>
                                    </button>
                                </Row>
                            </div>
                        )
                    })}
                </Column>
            </PageSection>
        </div>
    )
}