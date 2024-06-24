export type Recipe = {
    id: string,
    name: string,
    ingredients: string[],
    instructions: string,
    cuisineId: string,
    dietId: string,
    difficultyId: string,
    image: string
}

export type Comment = {
    id: string,
    recipeId: string,
    comment: string,
    rating: number,
    date: string
}

export type Cuisines = {
    id: string,
    name: string
}

export type Difficulties = {
    id: string,
    name: string
}

export type Diets = {
    id: string,
    name: string
}