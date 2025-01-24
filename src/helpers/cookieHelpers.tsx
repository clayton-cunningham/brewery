import { BoxEntry, pokemonBox } from "../assets/resources";

export const cookieToBox = (pokemon: BoxEntry, cookieState: number) => {
    var retPokemon: BoxEntry = {
        DexNumber: pokemon.DexNumber,
        Pokemon: pokemon.Pokemon,
    }
    if (cookieState >= 4) {  // 100
      cookieState -= 4;
      retPokemon.ingredientLevel60 = true;
    }
    if (cookieState >= 2) {  // 010
      cookieState -= 2;
      retPokemon.ingredientLevel30 = true;
    }
    if (cookieState >= 1) {  // 001
      cookieState -= 1;
      retPokemon.Perf = true;
    }
    return retPokemon;
}

export const getBoxCookie = () => {
    var cookie = getCookie("pokemon");

    var cookies = cookie.split(",");

    var cookiePokemon = pokemonBox.map(p => {
      var currCookie = cookies.find(c => c.split("#")[0] == p.DexNumber)?.split("#")[1];
      if (currCookie == undefined) return p;
      return cookieToBox(p, +currCookie);
    })

    // setSelectedPokemon(cookiePokemon);
    return cookiePokemon;
}

export const boxToCookie = (pokemon: BoxEntry) => {
    var cookieState = 0;
    if (pokemon.Perf) cookieState += 1;              // 001
    if (pokemon.ingredientLevel30) cookieState += 2; // 010
    if (pokemon.ingredientLevel60) cookieState += 4; // 100
    return cookieState;
}

export const setBoxCookie = (selectedPokemon: BoxEntry[]) => {
    var cookie = selectedPokemon.map(p => p.DexNumber + "#" + boxToCookie(p)).join(',');

    document.cookie = "pokemon=" + cookie;
}

export const getCookie = (name: string) => {
    const cookie = "; " + document.cookie;
    const parts = cookie.split("; " + name + "=");
    if (parts.length == 2) return parts.pop()!.split(";").shift()!;
    else return "";
}