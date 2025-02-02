
export type Recipe = {
    key: string,
    name: string,
    ingredients: {
        key: string,
        count: number,
    }[],
    uri: string,
}

export const enum RecipePossibility {
    Possible,
    Impossible,
    Other
}

export type Ingredient = {
    key: string,
    name: string,
    uri: string,
    active?: boolean | undefined
    count?: number | undefined
}

export const ingredients: Ingredient[] = [
    {key: "0", name: "Basalm", uri: "./ingredients/basalm.png"},
    {key: "1", name: "Bonecap", uri: "./ingredients/bonecap.png"},
    {key: "2", name: "Fire Amber", uri: "./ingredients/fireamber.png"},
    {key: "3", name: "Laculite", uri: "./ingredients/laculite.png"},
    {key: "4", name: "Worg Fang", uri: "./ingredients/worgfang.png"},
]

export const recipeTypes = [
    "Curries/Stews",
    "Salads",
    "Desserts/Drinks",
]

export const recipes : Recipe[] = [
    { key: "0", name: "Potion of Healing", ingredients: [{ key: "0", count: 1 }], uri: "potionofgreaterhealing.png"},
    { key: "1", name: "Basic Poison", ingredients: [{ key: "1", count: 1 }], uri: "basicpoison.png"},
    { key: "2", name: "Alchemist's Fire", ingredients: [{ key: "2", count: 1 }], uri: "alchemistsfire.png"},
    { key: "3", name: "Arcane Elixir", ingredients: [{ key: "3", count: 1 }], uri: "greaterelixirofarcanecultivation.png"},
    { key: "4", name: "Elixir of Bloodlust", ingredients: [{ key: "4", count: 1 }], uri: "elixirofbloodlust.png"},
]
