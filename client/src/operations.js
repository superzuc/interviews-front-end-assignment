const axios = require('axios')

export const getRecipes = async () => {
    try {
        const response = await axios.getAdapter('http://localhost:8080/recipes');
        const recipes = response.data;
        return recipes;
    } catch (error) {
        console.error('Errore nel recupero delle ricette:', error);
        throw error;
    }
}