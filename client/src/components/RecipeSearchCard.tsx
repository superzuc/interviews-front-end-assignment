import React, { useEffect, useState } from 'react'
type Comment = {
    id: string;
    recipeId: string;
    comment: string;
    rating: number;
    date: string;
};

type Props = {
    recipeId: string,
    name: string,
    ingredients: string[],
    image: string,
    difficultyId: string,
    dietId: string,
}

export default function RecipeSearchCard({recipeId, name, ingredients, image, difficultyId, dietId}: Props) {
    const [difficulty, setDifficulty] = useState('');
    const [comment, setComments] = useState<Comment>();

    const imageBackground = {
        backgroundImage: `url(http://localhost:8080${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    useEffect(() => {
        const getDifficulties = async () => {
            try {
                const response = await fetch('http://localhost:8080/difficulties');
                const data = await response.json();

                const difficultyObject = data.find((item: { id: string; name: string }) => item.id === difficultyId);
                if (difficultyObject) {
                    setDifficulty(difficultyObject.name);
                }

            } catch (error) {
                console.error("errore nel trovare la difficoltà", error)
            }
        }

        getDifficulties();
    }, [difficultyId])

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/comments/${recipeId}`);
                const data = await response.json();

                setComments(data);
            } catch (error) {
                console.error('Errore nel recupero dei commenti:', error);
            }
        };

        getComments();
    }, [recipeId]);
  return (
    <div className='flex flex-row justify-between p-2 w-full border rounded-md mt-2 shadow-md'>
        <div className='flex flex-row'>
        <div style={imageBackground} className='h-28 w-28 rounded-md'></div>
        <div className='flex flex-col ml-4'>
            <h1 className='font-bold text-sm'>{name}</h1>
            <p className=' text-sm'>{difficulty}</p>
            <p className=' text-xs'>{ingredients[0]}, {ingredients[1]}, {ingredients[2]}</p>
        </div>
        </div>
        
        <div>
            <div className='flex flex-row items-center'>
            <div className='flex flex-col items-baseline w-56'>
                {comment?.comment && comment.rating ? 
                <div>
                    <h1 className='font-bold text-sm '>{comment?.comment}</h1>
                    <p className='font-thin text-xs'>Rated {comment?.rating} stars from users</p>
                </div> : 
                <p className='font-thin text-xs'>Not Rated yet!</p> }
                
                </div>
                {comment?.comment ?
                <div className='buttonColor p-2 text-white text-xs rounded-2xl items-center font-thin ml-4'>{comment?.rating}</div>
                 : <div></div>}
            
            </div>
            
            <button className='buttonColor pl-4 pr-4 p-2 rounded-3xl text-xs text-white mt-4 font-thin hover:scale-110 transition-all'>View Details</button>
        </div>
    </div>
  )
}
