import React, { useEffect, useState } from 'react';
import NavbarAdd from './NavbarAdd';
import { Cuisines, Diets, Difficulties } from '../types';
import { FaHome, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export default function AddItem() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [image, setImage] = useState<File | null>(null); // Definisci il tipo come File o null

  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [diets, setDiets] = useState<Diets[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulties[]>([]);
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()

  // Prendere i dati
  useEffect(() => {
    const getCuisines = async () => {
      try {
        const response = await fetch('http://localhost:8080/cuisines');
        const data = await response.json()
        setCuisines(data)
      } catch (error) {
        console.error('Errore nel recupero delle cucine:', error);
      }
    };

    const getDiets = async () => {
      try {
        const response = await fetch('http://localhost:8080/diets');
        const data = await response.json();
        setDiets(data)
      } catch (error) {
        console.error('Errore nel recupero delle diete:', error);
      }
    };

    const getDifficulties = async () => {
      try {
        const response = await fetch('http://localhost:8080/difficulties');
        const data = await response.json();
        setDifficulties(data)
      } catch (error) {
        console.error('Errore nel recupero delle difficoltà:', error);
      }
    };

    getCuisines();
    getDiets();
    getDifficulties();
  }, []);

  //Funzione per salvataggio immagine

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //funzione di submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('ingredients', ingredients.join(','));
    formData.append('instructions', instructions);
    formData.append('cuisineId', cuisineType);
    formData.append('dietId', dietaryPreference);
    formData.append('difficultyId', difficulty);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8080/recipes', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe');
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  
  return (
    <div> 
        <NavbarAdd />
        { !submitted ?
        
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">Recipe Name</label>
              <input
                id="recipeName"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                required
              />
            </div>
            <div>
            <label htmlFor="newIngredient" className="block text-sm font-medium text-gray-700">Ingredients</label>
            <div className="flex space-x-2">
              <input
                id="newIngredient"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="mt-1 p-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center py-1">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea
                id="instructions"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700">Cuisine Type</label>
              <select
                id="cuisineType"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                required
              >
                <option value="">Choose cuisine</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dietaryPreference" className="block text-sm font-medium text-gray-700">Dietary Preference</label>
              <select
                id="dietaryPreference"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                required
              >
                <option value="">Choose Preference</option>
                {diets.map(diet => (
                  <option key={diet.id} value={diet.id}>{diet.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select
                id="difficulty"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="">Choose difficulty</option>
                {difficulties.map(diff => (
                  <option key={diff.id} value={diff.id}>{diff.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
              <input
                id="image"
                type="file"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleImageChange}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
       : 
       <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">La tua ricetta è stata inviata con successo!</h2>
        <p>Grazie per aver dedicato del tempo su RecipeBoo</p>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center space-x-2 p-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            <FaHome />
            <span>Home</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 p-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
          >
            <FaUtensils />
            <span>Nuova Ricetta</span>
          </button>
        </div>
      </div>
        }
      </div>
  );
}

