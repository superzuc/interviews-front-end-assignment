import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Cuisines, Diets, Recipe } from '../types';
import { FaArrowLeft } from "react-icons/fa";
import RecipeSearchCard from './RecipeSearchCard';

const axios = require('axios');

export default function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSearch, setShowSearch] = useState(false); // Stato per controllare la visibilità della barra di ricerca
    const recipesPerPage = 8;

    // Stati per i filtri
    const [nameRecipe, setNameRecipe] = useState('');
    const [cuisineName, setCuisineName] = useState('');
    const [dietaryPref, setDietaryPref] = useState('');

    // Stati per le opzioni preimpostate
    const [cuisines, setCuisines] = useState<Cuisines[]>([]);
    const [diets, setDiets] = useState<Diets[]>([]);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const response = await fetch('http://localhost:8080/recipes');
                const recipes = await response.json();
                setRecipes(recipes);
            } catch (error) {
                console.error('Errore nel recupero delle ricette:', error);
                throw error;
            }
        };
        const getCuisines = async () => {
            try {
                const response = await fetch('http://localhost:8080/cuisines');
                const cuisines = await response.json();
                setCuisines(cuisines);
            } catch (error) {
                console.error('Errore nel recupero delle cucine:', error);
                throw error;
            }
        };
        const getDiets = async () => {
            try {
                const response = await fetch('http://localhost:8080/diets');
                const diets = await response.json();
                setDiets(diets);
            } catch (error) {
                console.error('Errore nel recupero delle diete:', error);
                throw error;
            }
        };

        getRecipes();
        getCuisines();
        getDiets();
    }, []);

    // Calcola le ricette da mostrare sulla pagina corrente
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    // Funzione di filtraggio
    const filteredRecipes = recipes.filter(recipe => {
        return (
            (nameRecipe === '' || recipe.name.toLowerCase().includes(nameRecipe.toLowerCase())) &&
            (cuisineName === '' || recipe.cuisineId === cuisineName) &&
            (dietaryPref === '' || recipe.dietId === dietaryPref)
        );
    });

    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Cambia pagina
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calcola il numero totale di pagine
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRecipes.length / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Gestore del submit del form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // Resetta alla prima pagina quando si fa una nuova ricerca
    };

    // Funzione per mostrare/nascondere la barra di ricerca
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <div>
            <Navbar toggleSearch={toggleSearch} />
            <div className={`grid ${showSearch ? 'grid-cols-3' : 'grid-cols-1'} mt-4 transition-all duration-500`}>
                {showSearch && (
                    <div className='flex flex-col'>
                        <div className='flex flex-col p-8 gap-4 border-b-2 shadow-md'>
                            <FaArrowLeft size={20} onClick={toggleSearch} className="cursor-pointer" />
                            <h1 className='text-2xl font-extrabold titleFont'>Discover recipes</h1>
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <p className='text-bold'>Search by name</p>
                                <input
                                    className='border rounded-3xl p-4 w-full mt-2'
                                    type="text"
                                    placeholder='Enter recipe by name'
                                    value={nameRecipe}
                                    onChange={(e) => setNameRecipe(e.target.value)}
                                />

                                <p className='text-bold mt-4'>Choose cuisine</p>
                                <select
                                    className='border rounded-3xl p-4 w-full mt-2'
                                    value={cuisineName}
                                    onChange={(e) => setCuisineName(e.target.value)}
                                >
                                    <option value="">Choose cuisine</option>
                                    {cuisines.map(cuisine => (
                                        <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                                    ))}
                                </select>

                                <p className='text-bold mt-4'>Select dietary preference</p>
                                <select
                                    className='border rounded-3xl p-4 w-full mt-2'
                                    value={dietaryPref}
                                    onChange={(e) => setDietaryPref(e.target.value)}
                                >
                                    <option value="">Choose Preference</option>
                                    {diets.map(diet => (
                                        <option key={diet.id} value={diet.id}>{diet.name}</option>
                                    ))}
                                </select>

                                <button type="submit" className='p-2 buttonColor rounded-3xl text-white hover:scale-110 transition-all mt-4'>
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className={`${showSearch ? 'col-start-2 col-end-4' : 'col-span-1'}`}>
                    {currentRecipes.map((recipe) => (
                        <RecipeSearchCard
                            key={recipe.id}
                            recipeId={recipe.id}
                            name={recipe.name}
                            ingredients={recipe.ingredients}
                            image={recipe.image}
                            difficultyId={recipe.difficultyId}
                            dietId={recipe.dietId}
                        />
                    ))}
                    <div className='flex justify-center mt-4'>
                        <nav>
                            <ul className='flex'>
                                {pageNumbers.map(number => (
                                    <li key={number} className=''>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                paginate(number);
                                            }} 
                                            className='p-2 m-1 border rounded w-12'
                                        >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
