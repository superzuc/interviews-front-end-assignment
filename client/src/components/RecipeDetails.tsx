import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Recipe, Comment } from 'src/types';
import NavbarAdd from './NavbarAdd';
import { FaStar } from 'react-icons/fa';

export default function RecipeDetails() {
    const { id } = useParams();
    const recipeId = id;

    const [recipe, setRecipe] = useState<Recipe>();
    const [comments, setComments] = useState<Comment[]>([]);

    //state for comments
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);

    //fetch data
    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:8080/recipes/${recipeId}`);
                if (!response.ok) throw new Error('Error fetching recipe');
                const recipe = await response.json();
                setRecipe(recipe);
            } catch (error) {
                console.error("Error fetching recipe", error);
            }
        };

        const getComments = async () => {
            try {
                const response = await fetch('http://localhost:8080/comments');
                if (!response.ok) throw new Error('Error fetching comments');
                const data = await response.json();
                const filteredComments = data.filter((comment: Comment) => comment.recipeId === id);
                setComments(filteredComments);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        getRecipe();
        getComments();
    }, [id]);

    //function format date of comment
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const commentData = {
            recipeId: recipeId,
            comment: newComment,
            rating: newRating,
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:8080/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (response.ok) {
                const addedComment = await response.json();
                setComments([...comments, addedComment]);
                setNewComment('');
                setNewRating(0);
            } else {
                alert('Failed to add comment');
            }
        } catch (error) {
            console.error("Error adding comment", error);
            alert('Failed to add comment');
        }
    };

    const imageBackground = {
        backgroundImage: `url(http://localhost:8080${recipe?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <NavbarAdd />
            <div className='flex flex-col p-8'>
                <div>
                    <h1 className='font-bold text-xl'>Recipe Image</h1>
                    <div style={imageBackground} className='w-full h-[500px] mt-2 rounded-xl shadow-md '></div>
                </div>

                <div className='flex flex-col mt-8'>
                    <h1 className='font-bold text-xl'>Ingredients</h1>
                    <div className='p-4'>
                        {recipe?.ingredients.map((ingredient) => (
                            <div key={ingredient}>{ingredient}</div>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col mt-8'>
                    <h1 className='font-bold text-xl'>Procedure</h1>
                    <p className='p-4 w-[40%]'>{recipe?.instructions}</p>
                </div>

                <div className='flex flex-col mt-8'>
                    <h1 className='font-bold text-xl'>User Reviews</h1>
                    <div className='flex flex-col p-4'>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className='border-b border-gray-300 py-4'>
                                    <div className='flex items-center'>
                                        {[...Array(comment.rating)].map((_, index) => (
                                            <FaStar key={index} className='text-yellow-500' />
                                        ))}
                                    </div>
                                    <p className='mt-2'>{comment.comment}</p>
                                    <p className='mt-1 text-gray-500 text-sm'>{formatDate(comment.date)}</p>
                                </div>
                            ))
                        ) : (
                            <div>No comments found.</div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col mt-8'>
                    <h1 className='font-bold text-xl'>Add a Comment</h1>
                    <form onSubmit={handleCommentSubmit} className='flex flex-col p-4'>
                        <textarea
                            className='border rounded p-2 mb-4'
                            placeholder='Write your comment here...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
                        <div className='flex items-center mb-4'>
                            <span className='mr-2'>Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer ${newRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => setNewRating(star)}
                                    aria-label={`Rating: ${star}`}
                                />
                            ))}
                        </div>
                        <button type='submit' className=' w-[30%] p-2 buttonColor text-white rounded hover:bg-red-700'>
                            Submit Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

